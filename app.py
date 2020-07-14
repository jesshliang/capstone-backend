from flask_cors import CORS, cross_origin
from flask import Flask, render_template
from flask import jsonify, request
import json
from bson import json_util, ObjectId
from bson.json_util import loads, dumps
from flask_pymongo import PyMongo
from pymongo import MongoClient


import os

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    cors = CORS(app)
    app.config['CORS_HEADERS'] = 'Content-Type'
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )
    app.debug = True # so development server autoupdates with changes

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    client = MongoClient('mongodb://127.0.0.1:27017')
    db = client.capstone
    users = db.users

    @app.route('/', methods=['GET'])
    def index():
        all_users = users.find()
        return dumps(all_users)

    @app.route('/user', methods=['GET'])
    def find_one_user():
        find_user = users.find_one({ 'username' : request.args["username"] })
        return dumps(find_user)

    @app.route('/', methods=['POST'])
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
        print(request)
        new_trip_id = users.update_one(
            { 'username' : request.args["username"] },
            { '$push': {
                "trips" : 
                    {
                        'date': request.args["date"],
                        'title': request.args["title"],
                        'places': [ json.loads(request.args['places[]']) ]
                    }
                }
            }
        )
        
        find_user = users.find_one({ 'username' : request.args["username"] })
        print(request.is_json)
        return dumps(find_user)
        # return request.is_json

    if __name__ == '__main__':
        app.run()

    return app