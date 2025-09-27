# Load data from estados.csv into database using pandas

import csv
import os



import pandas as pd
from sqlalchemy import create_engine, text



def load_data_to_db(df: pd.DataFrame, db_connection_string, table_name):
    # Create a database engine
    engine = create_engine(db_connection_string)


    # Load the DataFrame into the already existing table
    df.to_sql(table_name, engine, if_exists='append', index=False)



def load_cities():
    df = pd.read_csv('municipios.csv')
    df = df.drop(columns=['codigo_ibge', 'capital', 'ddd', 'fuso_horario', 'siafi_id'])
    df = df.rename(columns={'nome': 'name', 'codigo_uf':'uf_id'})
    df = df.reset_index().rename(columns={'index': 'id'})
    load_data_to_db(df,'postgresql://candidatomm:senha@localhost:5433/projetomm', 'cities')

def load_states():
    df = pd.read_csv('estados.csv')
    df = df.drop(columns=['latitude', 'longitude', 'regiao'])
    df = df.rename(columns={'codigo_uf': 'id', 'nome': 'name'})
    load_data_to_db(df,'postgresql://candidatomm:senha@localhost:5433/projetomm', 'states')



load_cities()