
$(function(){
  $.ajax({
    url: 'http://www.omdbapi.com/?',
    data: {"s": "superman"}
  })
  .done(function(data){
    let htmlString = "";

    data["Search"].forEach(function(movie){
      htmlString += `<p>${movie["Title"]}</p>`;
    });
    
    $("#movies").append(htmlString);
  });
})