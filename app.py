from pymongo import MongoClient
from flask_cors import CORS, cross_origin
from flask import Flask, render_template
from flask import jsonify, request
import json
from bson import json_util, ObjectId
from bson.json_util import loads, dumps
from flask_pymongo import PyMongo
import os

app = Flask(__name__, static_folder='./build', static_url_path='/')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config.from_mapping(
    SECRET_KEY='dev',
    DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
)
app.debug = True # so development server autoupdates with changes

client = MongoClient("mongodb+srv://jessicursliang:M4YMYcAPSTONEWORK@capstone.liwyt.mongodb.net/capstone?retryWrites=true&w=majority")
db = client.capstone
users = db.users

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/user', methods=['GET'])
def find_one_user():
    find_user = users.find_one({ 'username' : request.args["username"] })
    return dumps(find_user)

@app.route('/users', methods=['POST'])
@cross_origin()
def add_new_user():
    find_user = users.find_one({ 'username' : request.args["username"] })

    if find_user:
        return dumps(find_user)
    else:
        user_id = users.insert({
            "username" : request.args["username"],
            "trips" : []
        })
        new_user = users.find_one( { "_id": user_id })
        return dumps(new_user)

@app.route('/trips', methods=['POST', 'GET'])
@cross_origin()
def add_new_trip():
    def convert(ele):
        return json.loads(ele)

    new_places = request.args.getlist('places[]')
    result = map(convert, new_places)
    result_list = list(result)

    new_trip_id = users.update_one(
        { 'username' : request.args["username"] },
        { '$push': {
            "trips" : 
                {
                    'date': request.args["date"],
                    'title': request.args["title"],
                    'places': result_list
                }
            }
        }
    )
    
    find_user = users.find_one({ 'username' : request.args["username"] })
    return dumps(find_user)

@app.route('/trips', methods=["DELETE"])
def delete_trip():
    incoming = json.loads(request.data)
    print(incoming)

    user_trips = users.find_one({ "username" : incoming["username"] })["trips"]
    del user_trips[incoming["key"]]

    users.update_one(
        { 'username' : incoming["username"] },
        { '$set' : { 
            "trips" : user_trips 
            }
        }
    )

    find_user = users.find_one({ 'username' : incoming["username"] })
    return dumps(find_user)

@app.route('/trips', methods=["PATCH"])
def edit_trip():
    def convert(ele):
        return json.loads(ele)

    incoming_places = request.args.getlist('places[]')
    result = map(convert, incoming_places)
    updated_trip_places = list(result) # incoming list of places of specific trip 

    user_trips = users.find_one({ "username" : request.args["username"] })["trips"] # current list of ALL trips
    user_trips[int(request.args["index"])]["places"] = updated_trip_places # replace places of selected trip
    user_trips[int(request.args["index"])]["title"] = request.args["title"]
    user_trips[int(request.args["index"])]["date"] = request.args["date"]

    users.update_one(
        { 'username' : request.args["username"] },
        { '$set' : { 
            "trips" : user_trips 
            }
        }
    )
    
    find_user = users.find_one({ 'username' : request.args["username"] })
    return dumps(find_user)

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))