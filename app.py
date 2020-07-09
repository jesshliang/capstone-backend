from flask import Flask, render_template
from flask import jsonify
import json
from bson import json_util, ObjectId
from bson.json_util import loads, dumps
from flask_pymongo import PyMongo
from pymongo import MongoClient

import os

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
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

    # @app.route('/users', methods=['GET'])
    # def get_all_users():
    #     users = db.testTwo
    #     output = []
    #     for u in users.find():
    #         output.append({'name': u['name']})
    #     return jsonify(output)

    if __name__ == '__main__':
        app.run()

    return app