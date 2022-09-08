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

if __name__ == "__main__":
    app.run()
