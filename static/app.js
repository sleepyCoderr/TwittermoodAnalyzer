


tweetData=d3.json("../realdonaldtrump").then(function(data){
    return data;
    });
// sentimentData=d3.json("/sentiment").then(function(data){
//     return data;
//     });
    Promise.all([tweetData,]).then(function(values){
        data=values[0];
        console.log(data)
    });


