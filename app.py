from pymongo import MongoClient
from flask_cors import CORS, cross_origin
from flask import Flask, render_template
from flask import jsonify, request
import json
from bson import json_util, ObjectId
from bson.json_util import loads, dumps
from flask_pymongo import PyMongo
import os
import urllib
import requests

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

    new_trip = {
        'date': request.args["date"],
        'title': request.args["title"]
    }

    new_trip_places = []
    for place in result_list:
        url = "https://api.mapbox.com/geocoding/v5/mapbox.places/{}.json?access_token=pk.eyJ1IjoiamVzc2ljYWxpYW5nIiwiYSI6ImNrY2I3N25wazFpOGEzMHF0dHY3aHNkOWUifQ.ItSK1BDpYydbUVyDPvdj6A".format(urllib.parse.quote_plus(place[0]))
        response = requests.get(url)

        json_response = response.json()

        if not json_response["features"]:
            place_object = {
                'location': 'ERROR: Location was invalid or not found.',
                'coordinates': 'invalid',
                'url': place[1]
            }
        else:
            place_object = {
                'location': json_response["features"][0]["place_name"],
                'coordinates': json_response["features"][0]["center"],
                'url': place[1]
            }

        new_trip_places.append(place_object)

    new_trip['places'] = new_trip_places

    users.update_one(
        { 'username' : request.args["username"] },
        { '$push': {
            "trips" : new_trip
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

    updated_trip = {
        'date': request.args["date"],
        'title': request.args["title"]
    }

    updated_places = []

    for place in updated_trip_places:
        if isinstance(place, list):
            url = "https://api.mapbox.com/geocoding/v5/mapbox.places/{}.json?access_token=pk.eyJ1IjoiamVzc2ljYWxpYW5nIiwiYSI6ImNrY2I3N25wazFpOGEzMHF0dHY3aHNkOWUifQ.ItSK1BDpYydbUVyDPvdj6A".format(urllib.parse.quote_plus(place[0]))
            response = requests.get(url)
            json_response = response.json()
            print(json_response)
            if (json_response["message"] == 'Not Found'):
                place_object = {
                    'location': 'ERROR: Location was invalid or not found.',
                    'coordinates': 'invalid',
                    'url': place[1]
                }
            elif not json_response["features"]:
                place_object = {
                    'location': 'ERROR: Location was invalid or not found.',
                    'coordinates': 'invalid',
                    'url': place[1]
                }
            else:
                place_object = {
                    'location': json_response["features"][0]["place_name"],
                    'coordinates': json_response["features"][0]["center"],
                    'url': place[1]
                }

            updated_places.append(place_object)
        elif place != user_trips[int(request.args["index"])]:
            url = "https://api.mapbox.com/geocoding/v5/mapbox.places/{}.json?access_token=pk.eyJ1IjoiamVzc2ljYWxpYW5nIiwiYSI6ImNrY2I3N25wazFpOGEzMHF0dHY3aHNkOWUifQ.ItSK1BDpYydbUVyDPvdj6A".format(urllib.parse.quote_plus(place['location']))
            response = requests.get(url)
            json_response = response.json()

            if not json_response["features"]:
                place_object = {
                    'location': 'ERROR: Location was invalid or not found.',
                    'coordinates': 'invalid',
                    'url': place['url']
                }
            else:
                place_object = {
                    'location': json_response["features"][0]["place_name"],
                    'coordinates': json_response["features"][0]["center"],
                    'url': place['url']
                }

            updated_places.append(place_object)
        else:
            updated_places.append(place)

    updated_trip['places'] = updated_places

    user_trips[int(request.args["index"])] = updated_trip

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