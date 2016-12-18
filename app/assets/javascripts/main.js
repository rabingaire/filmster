$(function(){
  let form = $('#movie-search');
  form.submit(function(e){
    e.preventDefault();
    $.ajax({
      url: 'http://www.omdbapi.com/?',
      data: form.serialize()
    })
    .done(function(data){
      displayMovies(data);
    });
  });

  function displayMovies(data){
    let container = $("#movies");
    let htmlString = "";

    container.empty();

    if (data["Response"] == "False") {
      htmlString = `<div class="alert alert-danger text-center" role="alert">${data["Error"]}</div>`
    } else {
      data["Search"].forEach(function(movie){
        let moviePoster = movie["Poster"] == "N/A" ? "/assets/poster.jpg" : movie["Poster"];
        htmlString += `<div class="col-xs-12 col-md-4">
                      <img src=${moviePoster} data-id="${movie['imdbID']}"/>
                      <p>${movie["Title"]}</p>
                      <p>${movie["Year"]}</p>
                    </div>`;
      });
    }

    container.append(htmlString);
  }

  $('#movies').on('click', 'img', function(e){
    e.preventDefault();

     let id = $(e.target).data('id');

    $.ajax({
      url: `http://www.omdbapi.com/?`,
      data: {i: id}
    })
    .done(function(data){
      displayMovie(data);
    })
  });

  function displayMovie(data){
    let container = $("#movies")
    let htmlString = "";
    container.empty();

    let moviePoster = data["Poster"] == "N/A" ? "/assets/poster.jpg" : data["Poster"]
    htmlString += `<div class="col-md-4 col-xs-12"></div>
     <div class="col-md-4 col-xs-12">
       <img style="width:100px" src=${moviePoster} />
       <p>Title :  ${data["Title"]}</p>
       <p>Year:  ${data["Year"]}</p>
       <p> ${data["Plot"]}</p>
       <p>Released : ${data["Released"]}</p>
       <p>Runtime : ${data["Runtime"]}</p>
       <p>Genre : ${data["Genre"]}</p>
       <p>Director : ${data["Director"]}</p>
       <p>Writter : ${data["Writer"]}</p>
       <p>Actors : ${data["Actors"]}</p>
       <p>Language : ${data["Language"]}</p>
       <p>Country : ${data["Country"]}</p>
       <p>Awards : ${data["Awards"]}</p>
       <form id="rating-form" action="/reviews" method="POST">
         <input type="hidden" name="authenticity_token" value=${window._token} />
         <input type="hidden" name="imdbid" value=${data["imdbID"]} />
         <textarea name= "review[comment]" class="form-control" placeholder="Your review in 140 characters"/>
         <br />
         <input type="submit" class="btn btn-success pull-right" />
       </form>
     </div>
     <div class="col-md-4 col-xs-12"></div>`
    container.append(htmlString);
}
});
