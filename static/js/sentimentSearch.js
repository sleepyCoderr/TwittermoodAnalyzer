       


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
    p2=document.createElement("p")
    p1.className="card-text";
    p2.className="polarity-value";
    p1.id="full_text"+x;
    outdiv.appendChild(p1);
    div.appendChild(outdiv);
    document.getElementsByClassName("display-cards")[0].appendChild(div); 

   

};



$(function(){ 
var outputSpan=$('#polarity');
var sliderElement=$("#slider")
   
        sliderElement.slider({
            range:true,
            step:0.1,
            min:-1,
            max:1,
            slide:function(event,ui){
                outputSpan.html(ui.values[0]+'<->'+ui.values[1])
            } ,
        stop:function(event,ui){
            x=$('#txtmin').val(ui.values[0]);
            y=$('#txtmax').val(ui.values[1]);      
           $("#nq").on('click',function(){;

$.ajax({

        cache: false,
    url:'http://127.0.0.1:5000/sentimentSearch/'+x.val()+"/"+y.val(),
    type:'get',
     dataType:"json",
    success:function(data){
        if($('.display-cards').length){
            $('.display-cards').remove();
            newDiv=document.createElement("div");
            newDiv.className="display-cards";
            document.getElementById("bx").appendChild(newDiv);
        }
        else{
            newDiv=document.createElement("div");
            newDiv.className="display-cards";
            document.getElementById("bx").appendChild(newDiv);
        }
        for (i=0;i<data.length;i++){ 
            // document.getElementById("results-count").textContent=data.length+(" results found");
              return createCards.dom(data)
            };
    // createCards.dom(data)
} 


});

})   
        }
    
    });


            
   
outputSpan.html(sliderElement.slider('values',0)+' <-> '+sliderElement.slider('values',1))

});
              
              
                      

         
document.querySelector(".box").style.display="none";
document.querySelector("#note-2").style.display="block";




var createCards=(function (){
    return {
        dom:function(month){
        document.querySelector(".box").style.display="block";
        document.querySelector("#note-2").style.display="none";


        for (var i=0;i<=month.length-1;i++){  
        cards(i);
        document.querySelector("#full_text"+i).textContent=month[i]._id.full_text; 
        document.querySelector('.card-'+i).style.position="relative";
        document.querySelector('.card-'+i).style.top=i*100+100+"px";
        document.querySelector('.card-'+i).style.left=10+"px";
        document.querySelector("#created_at"+i).textContent=month[i]._id.created_at;
 
        
     
        }}}
          
})();
