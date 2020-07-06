from flask import Flask, render_template
from flask import jsonify
import json
from bson import json_util
from flask_pymongo import PyMongo
from pymongo import MongoClient

app = Flask(__name__)
app.debug = True # so development server autoupdates with changes

client = MongoClient('mongodb://127.0.0.1:27017')
db = client.test
collection = db.testTwo

@app.route('/')
def index():
	items = list(db.collection.find())
	return json.dumps(items, default=json_util.default)

@app.route('/users', methods=['GET'])
def get_all_users():
	users = db.testTwo
	output = []
	for u in users.find():
		output.append({'name': u['name']})
	return jsonify(output)

if __name__ == '__main__':
	app.run()