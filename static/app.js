
tweetData=d3.json("../realdonaldtrump.json").then(function(data){
    return tweetData;});

// tweetData=d3.json("../realdonaldtrump").then(function(data){
//     return data;
//     });
// sentimentData=d3.json("/sentiment").then(function(data){
//     return data;
//     });
    Promise.all([tweetData]).then(function(values){
        data=values[0];
        console.log(data )});
        // data2=values[1];
    
    // Promise.all([tweetData,]).then(function(values){
    //     data=values[0];
    //     console.log(data)
    // });

    
    