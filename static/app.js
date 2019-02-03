
janData=d3.json("/jantweets").then(function(data){
    return data;});
febData=d3.json("/febtweets").then(function(data){
    return data;});
marData=d3.json("/martweets").then(function(data){
    return data;});
aprData=d3.json("/aprtweets").then(function(data){
    return data;});
mayData=d3.json("/maytweets").then(function(data){
    return data;});
junData=d3.json("/juntweets").then(function(data){
    return data;});
julData=d3.json("/jultweets").then(function(data){
    return data;});
augData=d3.json("/augtweets").then(function(data){
    return data;});
septData=d3.json("/septtweets").then(function(data){
    return data;});
octData=d3.json("/octtweets").then(function(data){
    return data;});
novData=d3.json("/novtweets").then(function(data){
    return data;});
decData=d3.json("/dectweets").then(function(data){
    return data;});


// tweetData=d3.json("../realdonaldtrump").then(function(data){
//     return data;
//     });
// sentimentData=d3.json("/sentiment").then(function(data){
//     return data;
//     });

//-------------------- function appends the cards to the DOM---------------------------------------------------//
//----------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------//


function cards(x){
    div=document.createElement("div");
    div.className="card-"+x;
    div.style="width:40rem;";
    div.style="border-style:solid";
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
    document.getElementsByClassName("display-cards")[0].appendChild(div);
}

//----------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------//

Promise.all([janData,febData,marData,aprData,mayData,junData,julData,augData,septData,octData,novData,decData])
    .then(function(values){
        jan=values[0];
        feb=values[1];
        mar=values[2];
        apr=values[3];
        may=values[4];
        jul=values[5];
        jun=values[6];
        aug=values[7];
        sept=values[8];
        oct=values[9];
        nov=values[10];
        dec=values[11];
  

        //listens for button click
$(function(){    
  
        $('.btn-primary').on('click',function(){
            //gets the id of the clicked button
            var x=$(this).attr('data-panelid');
    //         toggledMonth(x);  
            
            
    //    function toggledMonth(vm){
    // $(".".concat(`${vm}`)).toggle();
    //         console.log(vm +" toggleMonth")
    //         return createCards.dom(jan)
    //         }
            if(x=="jan"){
               $('.jan').toggle();
               return createCards.dom(jan);
            }

            else if(x=="feb"){
            $('.feb').toggle();
               return createCards.dom(feb); 
            }


            else if(x=="mar"){
            $('.mar').toggle();
                return createCards.dom(mar); 
            }
            
        })
    })       //function creates the cards where text will be displayed
var createCards=(function (){
    return {
        dom:function(month){
        for (var i=0;i<=month.length;i++){  
        cards(i);
        console.log("i"+i, month.length)
        document.querySelector("#full_text"+i).textContent=month[i].full_text; 
        document.querySelector('.card-'+i).style.position="relative";
        document.querySelector('.card-'+i).style.top=i*100+100+"px";
        document.querySelector('.card-'+i).style.left=300+"px";
        document.querySelector("#created_at"+i).textContent=month[i].created_at;  
        }}}
          
})();
//----------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------//


// document.getElementById('#lk').setAttribute('href','https://twitter.com/statuses/?id=' + data.id_str);


    
    });

    
    