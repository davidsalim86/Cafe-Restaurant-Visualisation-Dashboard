-- create melbourne_business table
CREATE TABLE melbourne_business (
census_year INTEGER NOT NULL,
clue_small_area VARCHAR(100) NOT NULL,
trading_name VARCHAR(100) NOT NULL,
industry_anzsic4_description VARCHAR(100) NOT NULL,
seating_type VARCHAR(100) NOT NULL,
number_of_seats INTEGER NOT NULL,
x_coordinate DEC,
y_coordinate DEC
)