var animals = ["bird", "bear", "cat", "lion"];


    function displayGifs(){
    	var animalname = $(this).attr("data-name");
    	console.log(animalname);
    	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=1UkZ50Vs79VhcoFW7q76skIAYzFyjlFo&q=" +animalname+ "&limit=25&offset=0&rating=G&lang=en";

    	console.log(queryURL);//here is correct

    	$.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      for (var i=0; i<response.data.length; i++){
          var img = $('<img>'); //<img>
          img.attr('src', response.data[i].images.fixed_height_still.url);
          img.addClass("gifs");
          img.attr("data-state","still");
          img.attr("data-still",response.data[i].images.fixed_height_still.url);
          img.attr("data-animate",response.data[i].images.fixed_height.url);

          $('#images').append(img);
      }

    });

    }

    	function renderButtons() {
        // Deletes the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#aniTags").empty();
        // Loops through the array of movies
        for (var i = 0; i < animals.length; i++) {
          // Then dynamicaly generates buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adds a class to our button
          a.addClass("animal");
          // Added a data-attribute
          a.attr("data-name",animals[i]);
          // Provided the initial button text
          a.text(animals[i]);
          // Added the button to the buttons-view div
          $("#aniTags").append(a);
        }
      }

       $("#add").on("click", function(event) {
        event.preventDefault();
        //Q:Why there is another var animal??????
        var animal = $("#name-input").val().trim();
        
        animals.push(animal);
    
        renderButtons();
      });
      // Adding click event listeners to all elements with a class of "movie"
      $(document).on("click", ".animal", displayGifs);
      // Calling the renderButtons function to display the intial buttons
      renderButtons();

//----animation
     $(document).on("click", ".gifs", function(){
	var state = $(this).attr('data-state');
		if ( state == 'still'){
			//attr the animating url
                $(this).attr('src', $(this).attr('data-animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).attr('data-still'));
                $(this).attr('data-state', 'still');


            };
});
