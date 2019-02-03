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
tweet=mongo.db.tweets

def retrieveTweets(month):
    results=tweet.find({"created_at_parts.Month":f"{month}"}).sort("created_at_parts.Day",1)
    return dumps(results) 

@app.route("/")
def home_page():
    return render_template("index.html")

@app.route("/jantweets")
def jan():
    results=tweet.find({"created_at_parts.Month":"Jan"}).sort("created_at_parts.Day",1)
    return dumps(results) 
    # return retrieveTweets("Jan")

@app.route("/febtweets")
def feb():
    return retrieveTweets("Feb")

@app.route("/martweets")
def mar():
    return retrieveTweets("Mar")


@app.route("/aprtweets")
def apr():
    return retrieveTweets("Apr")

    
@app.route("/maytweets")
def may():
    return retrieveTweets("May")

    
@app.route("/juntweets")
def jun():
    return retrieveTweets("Jun")


@app.route("/jultweets")
def jul():
    return retrieveTweets("Jul")

    
@app.route("/augtweets")
def aug():
    return retrieveTweets("Aug")

    
@app.route("/septtweets")
def sept():
    return retrieveTweets("Sep")

    
@app.route("/octtweets")
def oct():
    return retrieveTweets("Oct")


@app.route("/novtweets")
def nov():
    return retrieveTweets("Nov")


@app.route("/dectweets")
def dec():
    return retrieveTweets("Dec")
