$(function(){
  let form = $('#movie-search');
  form.submit(function(e){
    e.preventDefault();
    $.ajax({
      url: 'https://www.omdbapi.com/?',
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
        htmlString += `
                    <div class="col-xs-12 col-md-4 text-center">
                      <div class="col-xs-12">
                        <img src=${moviePoster} data-id="${movie['imdbID']}"/>
                      </div>
                      <div class="col-xs-12">${movie["Title"]}</div>
                      <div class="col-xs-12">${movie["Year"]}</div>
                    </div>`;
      });
    }

    container.append(htmlString);
  }

  $('#movies').on('click', 'img', function(e){
    e.preventDefault();

     let id = $(e.target).data('id');

    $.ajax({
      url: `https://www.omdbapi.com/?`,
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
    htmlString += `<div class="col-md-4 col-xs-12 text-center">
       <img src=${moviePoster} />
     </div>
     <div class="col-md-4 col-xs-12">
       <div class="col-xs-12"><h2><strong>${data["Title"]}</strong></h2></div>

       <div class="col-xs-12"><strong>Year: </strong>${data["Year"]}</div>
       <div class="col-xs-12"><strong>Released: </strong>${data["Released"]}</div>
       <div class="col-xs-12"><strong>Runtime: </strong>${data["Runtime"]}</div>
       <div class="col-xs-12"><strong>Genre: </strong>${data["Genre"]}</div>
       <div class="col-xs-12"><strong>Director: </strong>${data["Director"]}</div>
       <div class="col-xs-12"><strong>Writer: </strong>${data["Writer"]}</div>
       <div class="col-xs-12"><strong>Actors: </strong>${data["Actors"]}</div>
       <div class="col-xs-12"><strong>Plot: </strong>${data["Plot"]}</div>
       <div class="col-xs-12"><strong>Language: </strong>${data["Language"]}</div>
       <div class="col-xs-12"><strong>Country: </strong>${data["Country"]}</div>
       <div class="col-xs-12"><strong>Awards: </strong>${data["Awards"]}</div>
     </div>
     <div class="col-md-4 col-xs-12">
       <h2>Create a Review</h2>
       <form id="rating-form" action="/reviews" method="POST">
         <input type="hidden" name="authenticity_token" value=${window._token} />
         <input type="hidden" name="imdbid" value=${data["imdbID"]} />
         <textarea name= "review[comment]" class="form-control" placeholder="Your review in 140 characters"/>
         <br />
         <input type="submit" class="btn btn-success pull-right" />
       </form>
     </div>`
    container.append(htmlString);
}
});
