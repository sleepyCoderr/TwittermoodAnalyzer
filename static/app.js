
tweetData=d3.json("../realdonaldtrump.json").then(function(data){
    return data;
    });
// sentimentData=d3.json("/sentiment").then(function(data){
//     return data;
//     });
    Promise.all([tweetData]).then(function(values){
        data=values[0];
        console.log(data[2100])
        // data2=values[1];
    });


