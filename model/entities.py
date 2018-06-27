#This file creates 'classes' necessary for my app.

#Import necessary things from sql, and also from the connector.
from sqlalchemy import Column, Integer, String, Sequence, Float, Boolean, DateTime, ForeignKey
from database import connector
from sqlalchemy.orm import relationship


class User(connector.Manager.Base):
    __tablename__ = 'users'
    userid = Column(Integer, Sequence('user_id_seq'), primary_key=True)
    username = Column(String(50))
    password = Column(String(12))

class Restaurant(connector.Manager.Base):
    __tablename__ = 'restaurants'
    restaurantid = Column(Integer, Sequence('restaurant_id_seq'), primary_key=True)
    fromuserid = Column(Integer, ForeignKey('users.userid'))
    name = Column(String(70))
    stars = Column(Float)
    latitude = Column(Float)
    longitude = Column(Float)
    tags = Column(String(5000))
    description = Column(String(2000))
    pricerange = Column(Integer)
    takeaway = Column(Boolean)
    delivery = Column(Boolean)
    eatin = Column(Boolean)
    kidfriendly = Column(Boolean)
    vegetarian = Column(Boolean)
    favourite = Column(Boolean)
    phone = Column(String(20))
    openinghs = Column(DateTime(timezone=True))
    closinghs = Column(DateTime(timezone=True))
    fromuser = relationship(User, foreign_keys=[fromuserid])


def encodeTags(array):
    #This function encodes our tags into a string, separated by a comma.
    string = ",".join(array)
    return string

def decodeTags(string):
    #This one will separate tags from string, into an array.
    array = string.split(',')
    return array
