 
//-------------------- function that creates the cards and appends the cards to the DOM for---------------------------------------------------//
//----------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------//


function cards(x){
    div=document.createElement("div");
    div.className="card-"+x;
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
//listens for button click
$(document).ready(function(){
    $("#nq").click(function(){
        location.reload(true);
    });
});

// function reloadPage(){
//     location.reload(true);
// }
$(function(){
    
var results=[];
    $.getJSON("/latest",function(data){
        //latest tweet

document.querySelector('#content').textContent=data[0].full_text;
document.querySelector("#latest-created-tweet").textContent=data[0].created_at;
    });
        $('.btn17').on('click',function(){
            
            var y=2017;
            var x=$(this).attr('data-panelid');

        $.ajax({

            cache: false,
        url:'http://127.0.0.1:5000/'+x+"/"+y,
        type:'get',
         dataType:"json",
        success:function(data){
            $.each(data,function(i,data){
                results.push(data);
                $('.latest-tweet').hide()
            });
        createCards.dom(results)} 
    
    
    });
    
    });

    $('.btn18').on('click',function(){
        //gets the id of the clicked button
        var x=$(this).attr('data-panelid');
        var y=2018;
        console.log(x)
    $.ajax({

        cache: false,
    url:'http://127.0.0.1:5000/'+x+"/"+y,
    type:'get',
    // data:{month: x,
    //         year:y},
    dataType:"json",
    success:function(data){
            
        $.each(data,function(i,data){
            results.push(data);
            $('.latest-tweet').hide()
        });
    createCards.dom(results)} });
});

$('.btn19').on('click',function(){
    //gets the id of the clicked button
    var x=$(this).attr('data-panelid');
    var y=2019;
$.ajax({

    cache: false,
url:'http://127.0.0.1:5000/'+x+"/"+y,
type:'get',

dataType:"json",
success:function(data){
        
    $.each(data,function(i,data){
        results.push(data);
        $('.latest-tweet').hide()
    });
createCards.dom(results)} });
console.log(results)
});

    // });      
        $(".menu-slide-1").hover(function() {
            $("#d-down-1").slideToggle(300);
        });
      
        $(".menu-slide-2").hover(function() {
            $("#d-down-2").slideToggle(300);
        });

        $(".menu-slide-3").hover(function() {
            $("#d-down-3").slideToggle(300);
        });




    });


document.querySelector(".box").style.display="none";


    //function creates the cards where text will be displayed
var createCards=(function (){
    return {
        dom:function(month){
        document.querySelector(".box").style.display="block";
        for (var i=0;i<=month.length-1;i++){ 
        cards(i);
        document.querySelector("#full_text"+i).textContent=month[i]._id.full_text; 
        document.querySelector('.card-'+i).style.position="relative";
        document.querySelector('.card-'+i).style.top=i*100+100+"px";
        document.querySelector('.card-'+i).style.left=10+"px";
        document.querySelector("#created_at"+i).textContent=month[i]._id.created_at;
        }}}      
})();
//----------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------//


// document.getElementById('#lk').setAttribute('href','https://twitter.com/statuses/?id=' + data.id_str);
// document.querySelector(".latest-tweet")=month[i].full_text; 


    
    // });

    
