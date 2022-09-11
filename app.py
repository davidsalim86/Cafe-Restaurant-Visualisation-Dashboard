import pandas as pd
import numpy as np

from flask import Flask, jsonify, render_template
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from pandas_geojson import to_geojson



#################################################
# Database Setup
#################################################
# engine = create_engine('postgresql://postgres:David$1986@localhost:5432/Melbourne_Business_db')
engine = create_engine("sqlite:///sqlite3/melbournebusinessdatabase.db")

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/map")
def map():
    return render_template("map.html")

@app.route("/table")
def table():
    return render_template("table.html")

@app.route("/api/melbournebusinessdata")
def melbournebusinessdata():
    database_df = pd.read_sql("Select * from melbourne_business",engine)
    geo_json = to_geojson(df=database_df, lat='y_coordinate', lon='x_coordinate',properties=["census_year", "clue_small_area", 
                "trading_name", "industry_anzsic4_description", "seating_type", "number_of_seats"])
    return geo_json

@app.route("/api/businessyear")
def businessyear():
    database_df = pd.read_sql("Select * from melbourne_business where census_year = 2010",engine)
    database_df = database_df.iloc[: , 1:]
    index_json = database_df.to_json(orient = 'records')
    return index_json

# function which returns total number of unique addresses as a string 
@app.route("/api/total_esta/<year>")
def total_esta(year):
    database_df = pd.read_sql(f"Select * from melbourne_business where census_year ={year}",engine)
    database_df = database_df.iloc[: , 1:]
    num_esta = str(database_df['trading_name'].nunique())
    return num_esta

@app.route("/api/total_outdoor/<year>")
def total_outdoor(year):
    database_df = pd.read_sql(f"Select * from melbourne_business where census_year ={year}",engine)
    database_df = database_df.iloc[: , 1:]
    database_df['number_of_seats'] = database_df['number_of_seats'].astype('int')
    num_outdoor = str(database_df.loc[database_df['seating_type'] == 'Seats - Outdoor','number_of_seats'].sum())
    return num_outdoor

@app.route("/api/total_indoor/<year>")
def total_indoor(year):
    database_df = pd.read_sql(f"Select * from melbourne_business where census_year ={year}",engine)
    database_df = database_df.iloc[: , 1:]
    database_df['number_of_seats'] = database_df['number_of_seats'].astype('int')
    num_indoor = str(database_df.loc[database_df['seating_type'] == 'Seats - Indoor','number_of_seats'].sum())
    return num_indoor

# get number of seats per industry
@app.route("/api/seats_per_industry/<year>")
def seats_per_industry(year):
    database_df = pd.read_sql(f"Select * from melbourne_business where census_year ={year}",engine)
    database_df['number_of_seats'] = database_df['number_of_seats'].astype('int')
    not_top5 = database_df.groupby('industry_anzsic4_description').sum().sort_values('number_of_seats',ascending = False).index[5:]
    database_df = database_df.replace(not_top5, 'Other')
    gp_df= database_df.groupby('industry_anzsic4_description',as_index=False).sum().sort_values('number_of_seats')
    seats_JSON = gp_df.to_json(orient = 'records')
    return seats_JSON

# get number of seats per area
@app.route("/api/seats_per_area/<year>")
def seats_per_area(year):
    database_df = pd.read_sql(f"Select * from melbourne_business where census_year ={year}",engine)
    database_df['number_of_seats'] = database_df['number_of_seats'].astype('int')
    not_top10 = database_df.groupby('clue_small_area').sum().sort_values('number_of_seats',ascending = False).index[10:]
    database_df = database_df.replace(not_top10, 'Other')
    gpA_df = database_df.groupby('clue_small_area', as_index=False).sum().sort_values('number_of_seats')
    seats_JSON = gpA_df.to_json(orient = 'records')
    return seats_JSON

# get number of est per area
@app.route("/api/est_per_area/<year>")
def est_per_area(year):
    database_df = pd.read_sql(f"Select * from melbourne_business where census_year ={year}",engine)
    not_top10 = database_df.groupby('clue_small_area').count().sort_values('trading_name',ascending = False).index[10:]
    database_df = database_df.replace(not_top10, 'Other')
    database_df.drop_duplicates(subset=['trading_name'])
    gpB_df = database_df.groupby('clue_small_area', as_index=False).count()
    gpB_df =gpB_df [["clue_small_area", "trading_name"]].sort_values('trading_name')
    seats_JSON = gpB_df.to_json(orient = 'records')
    return seats_JSON

if __name__ == "__main__":
    app.run()
