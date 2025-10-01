import os
import pandas as pd
from sqlalchemy import create_engine



def load_data_to_db(df: pd.DataFrame, db_connection_string, table_name):
    engine = create_engine(db_connection_string)
    df.to_sql(table_name, engine, if_exists='append', index=False)



def load_cities():
    df = pd.read_csv('municipios.csv')
    df = df.drop(columns=['codigo_ibge', 'capital', 'ddd', 'fuso_horario', 'siafi_id'])
    df = df.rename(columns={'nome': 'name', 'codigo_uf':'uf_id'})
    df = df.reset_index().rename(columns={'index': 'id'})
    load_data_to_db(df, os.getenv('DATABASE_URL'), 'cities')

def load_states():
    df = pd.read_csv('estados.csv')
    df = df.drop(columns=['latitude', 'longitude', 'regiao'])
    df = df.rename(columns={'codigo_uf': 'id', 'nome': 'name'})
    load_data_to_db(df, os.getenv('DATABASE_URL'), 'states')


load_states()
load_cities()