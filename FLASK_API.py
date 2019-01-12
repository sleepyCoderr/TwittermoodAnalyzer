from flask import Flask, jsonify,render_template
import twitter_credentials
import oauth2 as oauth
import json
from textblob import TextBlob
import pandas as pd
import numpy as np


app = Flask(__name__)


consumer=oauth.Consumer(key=twitter_credentials.CONSUMER_KEY,secret=twitter_credentials.CONSUMER_SECRET)
access_token=oauth.Token(key=twitter_credentials.ACCESS_TOKEN,secret=twitter_credentials.ACCESS_TOKEN_SECRET)
client=oauth.Client(consumer,access_token)

url="https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=realDonaldTrump&count=10&tweet_mode=extended"

response,data=client.request(url)
tweets=json.loads(data)
# @app.rotute("/")
# class screen_Name:
#     def enter_name(self,name):
#         name=input()
#         self.name=name;
#         return self.name

@app.route("/")
def index():
    """Return the homepage."""
    return render_template('index.html')

@app.route('/response', methods=['GET'])
def get_tasks():
    return jsonify(tweets);

@app.route('/sentiment',methods=['GET'])
def get_sentiment():
    df = pd.DataFrame(data=[tweet['full_text'] for tweet in tweets], columns=['Tweets'])
    df['sentiment'] = np.array([TextBlob(tweet['full_text']).sentiment.polarity for tweet in tweets])
    df_json=df.to_json(orient="records")
    return df_json;



if __name__ == '__main__':
    app.run(debug=True)