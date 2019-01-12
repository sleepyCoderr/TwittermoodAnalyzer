


tweetData=d3.json("/response").then(function(data){
    return data;
    });
sentimentData=d3.json("/sentiment").then(function(data){
    return data;
    });
    Promise.all([tweetData,sentimentData]).then(function(values){
        data=values[0];
        data2=values[1];
        console.log(data2)
        
        console.log(data)
    });


