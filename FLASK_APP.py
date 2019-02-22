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
import time
from textblob import TextBlob
import datetime
from pytz import timezone
import pytz
import bson
from bson.objectid import ObjectId
from bson import json_util



app = Flask(__name__)
app.config["MONGO_URI"] = ("mongodb+srv://momoyay:Pixel%2A91055@cluster0-zlicd.mongodb.net/tweetsdb")
mongo = PyMongo(app)
tweet=mongo.db.tweets

consumer=oauth.Consumer(key=twitter_credentials.CONSUMER_KEY,secret=twitter_credentials.CONSUMER_SECRET)
access_token=oauth.Token(key=twitter_credentials.ACCESS_TOKEN,secret=twitter_credentials.ACCESS_TOKEN_SECRET)
client=oauth.Client(consumer,access_token)

url="https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=realDonaldTrump&count=1&tweet_mode=extended"
response,data=client.request(url)
results=json.loads(data);
id=results[0]["id_str"]
tweet.insert_many(results)

def insert_tweets():
        created_at=tweet.find({"id_str":id})
        for twts in created_at:
                date=datetime.datetime.strptime(twts["created_at"],'%a %b %d %H:%M:%S +0000 %Y').replace(tzinfo=pytz.UTC)
                ts = time.strftime('%Y-%m-%d %H:%M:%S', time.strptime(twts['created_at'],'%a %b %d %H:%M:%S +0000 %Y'))
                dict_one={"Month":date.strftime("%b"),"Weekday":date.strftime("%a"),"Day":int(date.strftime("%d")),"Year":date.year}
                tweet_id=twts["_id"]
                tstamp=datetime.datetime.strptime(ts, "%Y-%m-%d %H:%M:%S").timestamp()
                insert_calendar_format(tweet_id,ts[0:10])
                insert_time_stamp(tweet_id,tstamp)
                insertupdate(tweet_id,dict_one)





        
        
def insertupdate(id_t,tweet_date):
        try:
                tweet.update_one({"_id":ObjectId(f"{id_t}")},{"$set":{"created_at_parts":tweet_date}})
        except Exception as e:
                print(e)


def retrieveTweets(month):
    results=tweet.find({"created_at_parts.Month":f"{month}"}).sort("created_at_parts.timestamp",pymongo.ASCENDING)
    return dumps(results) 


#inserts timestamp into documents
def insert_time_stamp(id_t,time_stamp):
    try:
        tweet.update_one({"_id":ObjectId(f"{id_t}")},{"$set":{"created_at_parts.timestamp":int(time_stamp)}})
    except Exception as e:
        print(e)
        
# insert a calendar format date into documents
def insert_calendar_format(id_t,calendar):
    try:
        tweet.update_one({"_id":ObjectId(f"{id_t}")},{"$set":{"created_at_parts.date":calendar}})
    except Exception as e:
        print(e)
        
#insert polarity value into documents
def insert_polarity(id_t,val_pol):    
    try:
        tweet.update_one({"_id":ObjectId(f"{id_t}")},{"$set":{"polarity":val_pol}})
    except Exception as e:
        print(e)
        
        
#insert subjective value into documents
def insert_subjectivity(id_t,val_subj):
    try:
        tweet.update_one({"_id":ObjectId(f"{id_t}")},{"$set":{"subjectivity":val_subj}})
    except Exception as e:
        print(e)

#----------------------------------------------routes-----------------------------------------------------------#
@app.route("/")
def home_page():
    print(client)
    return render_template("index.html")
@app.route("/about")
def about_page():
        return render_template("about.html")
#inserts new tweets into database and applies all the necessary functions
@app.route("/latest")
def latest_tweet():
    return data;

@app.route("/test")
def test():
        results=tweets.find({}, { "sort": { "_id": -1 }, "limit": 1 });
        return dumps(results)
@app.route("/search")
def search_page():
    return render_template("search.html")

@app.route("/wordSearch")
def word_search_page():
    return render_template("wordSearch.html")
@app.route("/sentimentSearch")
def sentiment_search_page():
    return render_template("sentimentSearch.html")

@app.route("/<string:month>/<int:year>")
def month(month,year):  
    # x= request.args.get('month', None)
    # y= request.args.get('year', None)

    results=tweet.aggregate([{"$match":{"created_at_parts.Month":month,"created_at_parts.Year":year}},{"$sort":{"created_at_parts.timestamp":-1}},{"$group":{"_id":{"created_at":"$created_at","full_text":"$full_text"}}}])
    return dumps(results)


@app.route("/search",methods=["GET","POST"])
def process_date():
    if request.method =="POST":
        from_date=request.form['from']
        to_date=request.form['to']

        if from_date and to_date:
            # date_search=tweet.find({"created_at_parts.date":{"$gte":from_date,"$lte":to_date}}).sort("created_at_parts.timestamp",pymongo.ASCENDING)
            date_search=tweet.aggregate([{"$match":{"created_at_parts.date":{"$gte":from_date,"$lte":to_date}}},
            {"$sort":{"created_at_parts.timestamp":-1}},
            {"$group":{"_id":{"created_at":"$created_at","full_text":"$full_text"}}}])
            return dumps(date_search)



@app.route("/wordSearch",methods=["GET","POST"])
def process_word():
    if request.method =="POST":
        word_search=request.form['search']
        # word_search_results=tweet.find({"$text":{"$search":word_search}}).sort("created_at_parts.timestamp",pymongo.ASCENDING)
        results=tweet.aggregate([{"$match":{"$text":{"$search":word_search}}},
        {"$sort":{"created_at_parts.timestamp":-1}},
        {"$group":{"_id":{"year":"$created_at_parts.Year", "month":"$created_at_parts.Month","created_at":"$created_at","full_text":"$full_text","year":"$created_at_parts.Year","month":"$created_at_parts.Month"}}}])
        return(dumps(results))

# @app.route("/sentimentSearch/<float:mn>/<float:mx>")
# def polarity(mn,mx):
#         pol=tweet.aggregate([{"$match":{"polarity":{"$gte":mn,"$lte":mx}}}]);
#         return dumps(pol)

@app.route("/sentimentSearch/<string:mn>/<string:mx>")
def polarity(mn,mx):
        mn = float(mn)
        mx = float(mx)
        # pol=tweet.aggregate([{"$match":{"polarity":{"$gte":mn,"$lte":mx}}}]);
        pol=tweet.aggregate([{"$match":{"polarity":{"$gte":mn,"$lte":mx}}},{"$sort":{"created_at_parts.timestamp":-1}},{"$group":{"_id":{"created_at":"$created_at","full_text":"$full_text","polarity":"$polarity"}}}])
        return dumps(pol)


    # x= request.args.get('month', None)
    # y= request.args.get('year', None)

#     results=tweet.aggregate([{"$match":{polarity:{"$gte":min,"$lte":max}}},{"$sort":{"created_at_parts.timestamp":-1}},{"$group":{"_id":{"created_at":"$created_at","full_text":"$full_text"}}}])


insert_tweets();




app.config['ENV'] = 'development'
app.config['DEBUG'] = True
app.config['TESTING'] = True