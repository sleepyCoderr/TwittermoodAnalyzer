from flask_pymongo import PyMongo
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect,
    url_for)
import json
import pymongo
from bson.json_util import dumps
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
import twitter_credentials
import oauth2 as oauth


app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/tweetsdb"
mongo = PyMongo(app)
tweet=mongo.db.tweets

consumer=oauth.Consumer(key=twitter_credentials.CONSUMER_KEY,secret=twitter_credentials.CONSUMER_SECRET)
access_token=oauth.Token(key=twitter_credentials.ACCESS_TOKEN,secret=twitter_credentials.ACCESS_TOKEN_SECRET)
client=oauth.Client(consumer,access_token)

url="https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=realDonaldTrump&count=1&tweet_mode=extended"
response,data=client.request(url)

def retrieveTweets(month):
    results=tweet.find({"created_at_parts.Month":f"{month}"}).sort("created_at_parts.timestamp",pymongo.ASCENDING)
    return dumps(results) 



@app.route("/")
def home_page():
    print(client)
    return render_template("index.html")

@app.route("/latest")
def latest_tweet():
    return data;


@app.route("/search")
def search_page():
    return render_template("search.html")

@app.route("/wordSearch")
def word_search_page():
    return render_template("wordSearch.html")


@app.route("/jantweets")
def jan():

    return retrieveTweets("Jan")

# @app.route("/febtweets")
# def feb():
#     return retrieveTweets("Feb")

# @app.route("/martweets")
# def mar():
#     return retrieveTweets("Mar")


# @app.route("/aprtweets")
# def apr():
#     return retrieveTweets("Apr")

    
# @app.route("/maytweets")
# def may():
#     return retrieveTweets("May")

    
# @app.route("/juntweets")
# def jun():
#     return retrieveTweets("Jun")


# @app.route("/jultweets")
# def jul():
#     return retrieveTweets("Jul")

    
# @app.route("/augtweets")
# def aug():
#     return retrieveTweets("Aug")

    
# @app.route("/septtweets")
# def sept():
#     return retrieveTweets("Sep")

    
# @app.route("/octtweets")
# def oct():
#     return retrieveTweets("Oct")


# @app.route("/novtweets")
# def nov():
#     return retrieveTweets("Nov")


# @app.route("/dectweets")
# def dec():
#     return retrieveTweets("Dec")


@app.route("/search",methods=["GET","POST"])
def process_date():
    if request.method =="POST":
        from_date=request.form['from']
        to_date=request.form['to']

        if from_date and to_date:
            date_search=tweet.find({"created_at_parts.date":{"$gte":from_date,"$lte":to_date}}).sort("created_at_parts.timestamp",pymongo.ASCENDING)
            return dumps(date_search)



@app.route("/wordSearch",methods=["GET","POST"])
def process_word():
    if request.method =="POST":
        word_search=request.form['search']
        word_search_results=tweet.find({"$text":{"$search":word_search}}).sort("created_at_parts.timestamp",pymongo.ASCENDING)
        return(dumps(word_search_results))




app.config['ENV'] = 'development'
app.config['DEBUG'] = True
app.config['TESTING'] = True