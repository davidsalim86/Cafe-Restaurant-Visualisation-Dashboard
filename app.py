import pandas as pd
import numpy as np

from flask import Flask, jsonify, render_template
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from pandas_geojson import to_geojson
from flask_sqlalchemy import SQLAlchemy

#################################################
# Database Setup
#################################################
# engine = create_engine('postgresql://postgres:David$1986@localhost:5432/Melbourne_Business_db')
engine = create_engine("sqlite:///sqlite3/melbournebusinessdatabase.db")

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

db = SQLAlchemy(app)

#################################################
# Flask Routes
#################################################
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/analysis")
def analysis():
    return render_template("analysis.html")

@app.route("/map")
def map():
    return render_template("map.html")

@app.route("/table")
def table():
    return render_template("table.html")

# data for map
@app.route("/api/melbournebusinessdatamap")
def melbournebusinessdatamap():
    database_df = pd.read_sql("Select y_coordinate, x_coordinate, census_year, trading_name, number_of_seats from melbourne_business",engine)
    geo_json = to_geojson(df=database_df, lat='y_coordinate', lon='x_coordinate',properties=["census_year", "trading_name", "number_of_seats"])
    return geo_json

# data for number of establishment 
@app.route("/api/total_esta/<year>")
def total_esta(year):
    database_df = pd.read_sql(f"Select trading_name from melbourne_business where census_year ={year}",engine)
    num_esta = str(database_df['trading_name'].nunique())
    return num_esta

# data for number of seat outdoor 
@app.route("/api/total_outdoor/<year>")
def total_outdoor(year):
    database_df = pd.read_sql(f"Select seating_type, number_of_seats from melbourne_business where census_year ={year}",engine)
    database_df['number_of_seats'] = database_df['number_of_seats'].astype('int')
    num_outdoor = str(database_df.loc[database_df['seating_type'] == 'Seats - Outdoor','number_of_seats'].sum())
    return num_outdoor

# data for number of seat indoor 
@app.route("/api/total_indoor/<year>")
def total_indoor(year):
    database_df = pd.read_sql(f"Select seating_type, number_of_seats from melbourne_business where census_year ={year}",engine)
    database_df['number_of_seats'] = database_df['number_of_seats'].astype('int')
    num_indoor = str(database_df.loc[database_df['seating_type'] == 'Seats - Indoor','number_of_seats'].sum())
    return num_indoor

# data for number of seats per industry
@app.route("/api/seats_per_industry/<year>")
def seats_per_industry(year):
    database_df = pd.read_sql(f"Select industry_anzsic4_description, number_of_seats from melbourne_business where census_year ={year}",engine)
    database_df['number_of_seats'] = database_df['number_of_seats'].astype('int')
    not_top7 = database_df.groupby('industry_anzsic4_description').sum().sort_values('number_of_seats',ascending = False).index[7:]
    database_df = database_df.replace(not_top7, 'Other')
    gp_df= database_df.groupby('industry_anzsic4_description',as_index=False).sum().sort_values('number_of_seats')
    seats_JSON = gp_df.to_json(orient = 'records')
    return seats_JSON

# data for number of seats per area
@app.route("/api/seats_per_area/<year>")
def seats_per_area(year):
    database_df = pd.read_sql(f"Select clue_small_area, number_of_seats from melbourne_business where census_year ={year}",engine)
    database_df['number_of_seats'] = database_df['number_of_seats'].astype('int')
    not_top7 = database_df.groupby('clue_small_area').sum().sort_values('number_of_seats',ascending = False).index[7:]
    database_df = database_df.replace(not_top7, 'Other')
    gpA_df = database_df.groupby('clue_small_area', as_index=False).sum().sort_values('number_of_seats')
    seats2_JSON = gpA_df.to_json(orient = 'records')
    return seats2_JSON

# data for number of establishment per area
@app.route("/api/est_per_area/<year>")
def est_per_area(year):
    database_df = pd.read_sql(f"Select clue_small_area, trading_name from melbourne_business where census_year ={year}",engine)
    not_top7 = database_df.groupby('clue_small_area').count().sort_values('trading_name',ascending = False).index[7:]
    database_df = database_df.replace(not_top7, 'Other')
    database_df.drop_duplicates(subset=['trading_name'])
    gpB_df = database_df.groupby('clue_small_area', as_index=False).count()
    gpB_df =gpB_df [["clue_small_area", "trading_name"]].sort_values('trading_name')
    seats3_JSON = gpB_df.to_json(orient = 'records')
    return seats3_JSON

# get number of seats per area for analysis table
@app.route("/api/seats_per_area/<year1>/<year2>")
def seats_areas(year1, year2):
    database_df = pd.read_sql(f"Select clue_small_area, number_of_seats from melbourne_business where census_year ={year1}",engine)
    database_df['number_of_seats'] = database_df['number_of_seats'].astype('int')
    not_top6 = database_df.groupby('clue_small_area').sum().sort_values('number_of_seats',ascending = False).index[6:]
    database_df = database_df.replace(not_top6, 'Other')
    year1_df = database_df.groupby('clue_small_area', as_index=False).sum().sort_values('number_of_seats', ascending= False)
    
    database_df2 = pd.read_sql(f"Select clue_small_area, number_of_seats from melbourne_business where census_year ={year2}",engine)
    database_df2['number_of_seats'] = database_df2['number_of_seats'].astype('int')
    not_top6_2 = database_df2.groupby('clue_small_area').sum().sort_values('number_of_seats',ascending = False).index[6:]
    database_df2 = database_df2.replace(not_top6_2, 'Other')
    year2_df = database_df2.groupby('clue_small_area', as_index=False).sum().sort_values('number_of_seats', ascending= False)
    
    year1_df["number_of_seats2"] = year2_df["number_of_seats"]
    year1_df["change"] = year1_df["number_of_seats"]-year1_df["number_of_seats2"]
    year1_df["percent_change"] =( year1_df["change"]/ year1_df["number_of_seats"]).map("{:.2%}".format)
    seats4_JSON = year1_df.to_json(orient = 'records')
    return seats4_JSON

# data for number of seats by year
@app.route("/api/seats_by_year")
def seats_by_year():
    database_df = pd.read_sql("Select census_year, number_of_seats from melbourne_business",engine)
    database_df['number_of_seats'] = database_df['number_of_seats'].astype('int')
    census_data = database_df.groupby("census_year",as_index=False)
    seating_by_year = pd.DataFrame(census_data ["number_of_seats"].sum())
    seats5_JSON = seating_by_year.to_json(orient = 'records')
    return seats5_JSON

# data for table
@app.route("/api/melbournebusinessdatatable/<year>")
def melbournebusinessdatatable(year):
    database_df = pd.read_sql(f"Select census_year, clue_small_area, industry_anzsic4_description, number_of_seats, seating_type, trading_name from melbourne_business where census_year ={year}",engine)
    data_json = database_df.to_json(orient = 'records')
    return data_json

if __name__ == "__main__":
    app.run()