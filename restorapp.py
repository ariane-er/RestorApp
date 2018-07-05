# Import necessary things.
from flask import Flask, render_template, request, Response, session, jsonify, redirect, url_for
from flask_cors import CORS, cross_origin
from model import entities
from database import connector
import json
from sqlalchemy import and_
from sqlalchemy.sql.expression import func
import xml

# Initializes app.
app = Flask(__name__, static_url_path="/static", static_folder='static')
# I'll create an object from the manager class from the connector file,
# which will in turn create a database called 'db'.
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
db = connector.Manager()

# Create cache
cache = {}

# Create a database engine.
engine = db.create_engine()

@app.route('/', methods=['GET', 'POST'])
def hello_world():
    return render_template('welcome.html')

@app.route('/static/<content>')
def static_content(content):
    return render_template(content)

@app.route('/users', methods=['GET'])  #checkout the actual users.
def get_users():
    key = 'getUsers'

    if key not in cache.keys():
        #Si no está en la cache, lo buscaremos en la database.
        session = db.get_session(engine) #Abre una sesion en la db
        dbResponse = session.query(entities.User) #Busca todos los usuarios.
        #Y además, lo agregaremos al cache.
        cache[key] = dbResponse
        print("From DB")
    else:
        #Si está, imprimimos que esa información viene del cache.
        print("From Cache")

    users = cache[key]
    #Creamos una lista de usuarios que viene del cache.
    response = []
    #Creamos una lista a la cual anexaremos la respuesta con json

    for user in users:
        response.append(user)
    return Response(json.dumps(response, cls=connector.AlchemyEncoder), mimetype='application/json')

@app.route('/setUsers')
def set_users():
    user1 = entities.User(username='ari', password='hola123')
    user2 = entities.User(username='oink',  password='bye123')
    session = db.get_session(engine)
    session.add(user1)
    session.add(user2)
    session.commit()

@app.route('/setRestaurants')
def setRestaurants():
    restaurant1 = entities.Restaurant(fromuserid='1', name='Madam Tusan', stars=4, latitude=-12.129521, longitude=-77.022222, tags="Chinese", description="Great Chinese food!", pricerange=35, takeaway=1, delivery=0, eatin=1, kidfriendly=1, vegetarian=1, favourite=1, phone="11111")
    restaurant2 = entities.Restaurant(fromuserid='1', name='Tanta', stars=4, latitude=-12.130137, longitude=-77.024524, tags="Traditional Peruvian", description="Signature Peruvian dishes by Gastón Acurio.", pricerange=40, takeaway=1, delivery=0, eatin=1, kidfriendly=1, vegetarian=1, favourite=0, phone="555555")
    session = db.get_session(engine)
    session.add(restaurant1)
    session.add(restaurant2)
    session.commit()

@app.route('/restaurants', methods=['GET'])  #checkout the actual users.
def get_restaurants():
    key = 'getRestaurants'

    if key not in cache.keys():
        #Si no está en la cache, lo buscaremos en la database.
        session = db.get_session(engine) #Abre una sesion en la db
        dbResponse = session.query(entities.Restaurant) #Busca todos los restaurantes.
        #Y además, lo agregaremos al cache.
        cache[key] = dbResponse
        print("From DB")
    else:
        #Si está, imprimimos que esa información viene del cache.
        print("From Cache")

    restaurants = cache[key]
    #Creamos una lista de usuarios que viene del cache.
    response = []
    #Creamos una lista a la cual anexaremos la respuesta con json

    for restaurant in restaurants:
        response.append(restaurant)
    return Response(json.dumps(response, cls=connector.AlchemyEncoder), mimetype='application/json')

@app.route('/processLogIn', methods=['GET', 'POST'])
@cross_origin()
def processLogin():
    print("We're here.")

    logInUsername = request.form['logInUsername']
    logInPassword = request.form['logInPassword']

    sessiondb = db.get_session(engine)

    users = sessiondb.query(entities.User)
    print(users)

    for user in users:
        if user.username == logInUsername and user.password == logInPassword:
            session['logged'] = user.userid;
            if request.headers.get("User-Agent")=="android":
                return jsonify({'success' : True})
            else:
                return jsonify({'success' : '/applet'})
        else:
            if request.headers.get("User-Agent")=="android":
                return jsonify({'success' : False})
            else:
                return jsonify({'error': 'Login failed. Try again.'})

@app.route('/processSignUp', methods=['GET', 'POST'])
def processSignUp():

    #Let's get the data from AJAX.
    signUpUsername = request.form['signUpUsername']
    signUpPassword = request.form['signUpPassword']
    signUpConPassword = request.form['signUpConPassword']

    #We need to check that the user doesn't exist already.

    session = db.get_session(engine)

    usernameList=[] #We create a list for all the usernames.

    for user in session.query(entities.User): #We append all of the usernames to that
        usernameList.append(user.username) #list, because we'll use it later.

    if signUpUsername not in usernameList: #Here, we use our username list to check if the username already exists.
        if signUpPassword == signUpConPassword: #If the username doesn't exist, we proceed to check if the passwords match.
            session = db.get_session(engine)
            newuser = entities.User(username=signUpUsername, password=signUpPassword)
            session.add(newuser)
            session.commit()
            print("User added successfully.")
            session['logged'] = newuser.userid;
            if request.headers.get("User-Agent")=="android":
                return jsonify({'status': 1}) #signup successful
            else:
                return jsonify({'success': '/applet'})
        else:
            if request.headers.get("User-Agent")=="android":
                return jsonify({'status': 2})  #passwords don't match
            else:
                return jsonify({'error': 'Passwords do not match.'})
    else:
        if request.headers.get("User-Agent")=="android":
            return jsonify({'status': 3}) #username exists
        else:
            return jsonify({'usernameexists': 'Username already exists'})

@app.route('/newRestaurant', methods=['GET','POST'])
def newRestaurant():

    #Get the data from AJAX.
    newRName = request.form['newRName']
    newRDescription = request.form['newRDescription']
    newRTakeaway = request.form['newRTakeaway']
    newREatin = request.form['newREatin']
    newRDelivery = request.form['newRDelivery']
    newRKidfriendly = request.form['newRKidfriendly']
    newRVegetarian = request.form['newRVegetarian']
    newRFavourite = request.form['newRFavourite']
    newRLatitude = request.form['newRLatitude']
    newRLongitude = request.form['newRLongitude']

    #Let's check if it doesn't exist already.
    session = db.get_session(engine)

    #We create a list of coordinates and populate them with the coordinates from
    #the database.
    listOfCoordinates = []

    for restaurant in session.query(entities.Restaurant):
        coordinates = (restaurant.latitude, restaurant.longitude)
        listOfCoordinates.append(coordinates)

    newRCoordinates = (newRLatitude, newRLongitude)

    #Let's check if it's not here:
    if newRCoordinates not in listOfCoordinates:
        session = db.get_session(engine)
        newRestData = entities.Restaurant(name=newRName, latitude=newRLatitude, longitude=newRLongitude, description=newRDescription, takeaway=newRTakeaway, delivery=newRDelivery, eatin=newREatin, kidfriendly=newRKidfriendly, vegetarian=newRVegetarian, favourite=newRFavourite)
        session.add(newRestData)
        session.commit()
        print("Restaurant added successfully.")

@app.route('/applet')
def applet():
    return render_template('applet.html')

@app.route('/current', methods = ['GET'])
def current():
    sessiondb = db.get_session(engine)
    loggedUser = sessiondb.query(entities.User).filter(entities.User.userid == session['logged']).first()
    loggedUserJson = json.dumps(loggedUser, cls=connector.AlchemyEncoder)
    print(loggedUserJson)
    return Response(loggedUserJson, status=200, mimetype='application/json')

#This makes the app actually run:
if __name__ == '__main__':
    app.secret_key=".."
    app.run(debug=True)
