#This file creates 'classes' necessary for my app.

#Import necessary things from sql, and also from the connector.
from sqlalchemy import Column, Integer, String
from database import connector

class User(connector.Manager.Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String(50))
    password = Column(String(12))

