       

document.querySelector(".box").style.display="none";

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
    var myHilitor = new Hilitor("#full_text"+x);
    var val=document.getElementById('word').value;
    myHilitor.apply(String(val))
   

};

$(function(){ 


              //----------word search-----------------//
              
              $('form#word-search').on('submit',function(){
                var that=$(this),
                  url = that.attr('action'),
                  type=that.attr('method'),
                  data={};
                  document.querySelector(".box").style.display="block";

                  $([document.documentElement, document.body]).animate({
                    scrollTop: $("#box-display-2").offset().top
                },2000);


                  
                  that.find('[name]').each(function(index,value){
                    var that=$(this),
                    name=that.attr('name'),
                    value=that.val()
                    data[name]=value;
                  });
                  $.ajax({
                      dataType:'json',
                      url:url,
                      type:type,
                      data:data,
                      success: function(response){
                        if($('.display-cards').length){
                            $(".display-cards").remove();
                            newDiv=document.createElement("div");
                            newDiv.className="display-cards";
                            document.getElementById("box-display-2").appendChild(newDiv);
                        }
                        else{
                            newDiv=document.createElement("div");
                            newDiv.className="display-cards";
                            document.getElementById("box-display-2").appendChild(newDiv);
                        }
                          for (i=0;i<response.length;i++){ 
                            
                            document.getElementById("results-count").textContent=response.length+(" results found");
                              return createCards.dom(response)
                            };
                     }
        
                  });  
                  return false;
                      });                  
                      

});           



var createCards=(function (){
    return {
        dom:function(month){

        for (var i=0;i<=month.length-1;i++){  
        cards(i);
        document.querySelector("#full_text"+i).textContent=month[i].full_text; 
        document.querySelector('.card-'+i).style.position="relative";
        document.querySelector('.card-'+i).style.top=i*100+100+"px";
        document.querySelector('.card-'+i).style.left=50+"px";
        document.querySelector("#created_at"+i).textContent=month[i].created_at; 
        
     
        }}}
          
})();
