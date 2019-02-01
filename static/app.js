
janData=d3.json("/jantweets").then(function(data){
    return data;});
febData=d3.json("/febtweets").then(function(data){
    return data;});
// marData=d3.json("/martweets").then(function(data){
//     return data;});
// aprData=d3.json("/aprtweets").then(function(data){
//     return data;});
// mayData=d3.json("/maytweets").then(function(data){
//     return data;});
// junData=d3.json("/juntweets").then(function(data){
//     return data;});
// julData=d3.json("/jultweets").then(function(data){
//     return data;});


// tweetData=d3.json("../realdonaldtrump").then(function(data){
//     return data;
//     });
// sentimentData=d3.json("/sentiment").then(function(data){
//     return data;
//     });

//-------------------- function appends the cards to the DOM---------------------------------------------------//
function cards(x){
    div=document.createElement("div");
    div.className="card-"+x;
    div.style="width: 50rem;";
    outdiv=document.createElement("div");
    h=document.createElement("h6");
    h.className="card-subtitle mb-2 text-muted";
    h.id="created_at"+x;
    outdiv.className="card-body";
    outdiv.appendChild(h);
    p1=document.createElement("p");
    p1.className="card-text";
    p1.id="full_text"+x;
    outdiv.appendChild(p1);
    div.appendChild(outdiv);
    document.getElementsByClassName("primary")[0].appendChild(div);
}
//----------------------------------------------------------------------------------------------------------//

Promise.all([janData,febData]).then(function(values){
        

      jan=values[0];
        feb=values[1];
$(function(){
        $('.btn-primary').on('click',function(){
            var x=$(this).attr('data-panelid');
            console.log("INSIDE jquery"+x)
            if(x=="jan"){
               $('.jan').toggle();
               console.log("insideif "+x)
               return createCards.dom(jan);
            }

            else if(x=="feb")
            $('.feb').toggle();
               console.log("insideif "+x)
               return createCards.dom(feb); 
        })
    })        //function creates the cards where text will be displayed
var createCards=(function (){
    return {
        dom:function(month){
        for (var i=0;i<=month.length;i++){  
        cards(i);
        document.querySelector("#full_text"+i).textContent=month[i].full_text; 
        document.querySelector('.card-'+i).style.position="relative";
        document.querySelector('.card-'+i).style.top=i*100+100+"px";
        document.querySelector('.card-'+i).style.left=300+"px";
        document.querySelector("#created_at"+i).textContent=month[i].created_at;  
        }}}
          
})();
//----------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------//

    
        // $('.feb').on('click',function(){
        //     createCards(feb);
        // })

        // $('.mar').on('click',function(){
        //     createCards(mar);
        // })
        // $('.apr').on('click',function(){
        //     createCards(apr);
        // })
        // $('.may').on('click',function(){
        //     createCards(may);
        // })
        // $('.jun').on('click',function(){
        //     createCards(jun);
        // })
        // $('.jul').on('click',function(){
        //     createCards(jul);
        // })
        // $('.aug').on('click',function(){
        //     createCards(aug);
        // })
        // $('.sept').on('click',function(){
        //     createCards(sept);
        // })
        // $('.oct').on('click',function(){
        //     createCards(oct);
        // })
        // $('.nov').on('click',function(){
        //     createCards(nov);
        // })
        // $('.dec').on('click',function(){
        //     createCards(dec);
        // })
 
    //----------------------------------------------------------------------------------------------------------//
    //----------------------------------------------------------------------------------------------------------//

        // document.getElementById('#lk').setAttribute('href','https://twitter.com/statuses/?id=' + data.id_str);


    
    });

    
    