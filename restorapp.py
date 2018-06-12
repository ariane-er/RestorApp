# Import necessary things.
from flask import Flask, render_template, request, Response, session, jsonify, redirect, url_for
from flask_cors import CORS, cross_origin
from model import entities
from database import connector
import json
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

@app.route('/setUsers')
def set_users():
    user1 = entities.User(id=1, username='ari', password='hola123')
    user2 = entities.User(id=2, username='oink',  password='bye123')
    session = db.get_session(engine)
    session.add(user1)
    session.add(user2)
    session.commit()

@app.route('/signUp')
def sign_up():
    return render_template('signup.html')

@app.route('/processLogIn', methods=['GET', 'POST'])
@cross_origin()
def processLogin():
    print("We're here.")

    logInUsername = request.form['logInUsername']
    logInPassword = request.form['logInPassword']

    print(logInUsername, "  , ", logInPassword)

    session = db.get_session(engine)
    users = session.query(entities.User) #Abro mi db y creo una lista con mis usuarios.

    #Ahora, voy a recorrer mi lista de usuarios, y chequear si coincide con lo del form.
    for user in users:
        if user.username == logInUsername and user.password == logInPassword:
            print("Successful authentication.")
            return redirect(url_for('applet'))

@app.route('/applet')
def applet():
    return render_template('applet.html')

#This makes the app actually run:
if __name__ == '__main__':
    app.run(debug=True)
