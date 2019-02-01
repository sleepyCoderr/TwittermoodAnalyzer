from flask_pymongo import PyMongo
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
import json
from bson.json_util import dumps

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/tweetsdb"
mongo = PyMongo(app)


@app.route("/")
def home_page():
    return render_template("index.html")


@app.route("/jantweets")
def jan():
    tweet=mongo.db.tweets
    results=tweet.find({"created_at_parts.Month":"Jan"})
    return dumps(results)

@app.route("/febtweets")
def feb():
    tweet=mongo.db.tweets
    results=tweet.find({"created_at_parts.Month":"Feb"})
    return dumps(results)