$(document).ready(function() {
  // Initial array of emotions
  var emotions = [
    "excited",
    "scared",
    "confused",
    "exhausted",
    "concerned",
    "enraged",
    "angry",
    "hungry",
    "thirsty",
    "tired",
    "befuddled",
    "constipated",
    "ecstatic",
    "evil"
  ];

  // displayEmotionInfo function re-renders the HTML to display the appropriate content
  function displayEmotionInfo() {
    var emotions = $(this).attr("data-name");
    var api = "LbWDM01pOQWptRVlBWG0rW9S64Ua1n6Z";
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      emotions +
      "&api_key=" +
      api +
      "&limit=25";

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);

      for (i = 0; i < response.data.length; i++) {
        // Creating a div to hold the emotion
        var emotionDiv = $("<div class='emotion'>");

        // Storing the title data
        var title = response.data[i].title;

        // Creating an element to have the rating displayed
        var pTwo = $("<p>").text("Title: " + title);

        // Displaying the rating
        emotionDiv.append(pTwo);

        // Storing the rating data
        var rating = response.data[i].rating;

        // Creating an element to have the rating displayed
        var pOne = $("<p>").text("Rating: " + rating);

        // Displaying the rating
        emotionDiv.append(pOne);

        // Retrieving the URL for the image
        var imgURL = response.data[i].images.original_still.url;

        // Creating an element to hold the image
        var image = $("<img>").attr("src", imgURL);

        // Appending the image
        emotionDiv.append(image);
        emotionDiv.append("<hr>");
        emotionDiv.addClass("gif");

        // Putting the entire movie above the previous movies
        $("#gif-view").prepend(emotionDiv);
      }
    });
  }

  // Function for displaying emotion data
  function renderButtons() {
    // Deleting the emotions prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of emotions
    for (var i = 0; i < emotions.length; i++) {
      // Then dynamicaly generating buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of emotion-btn to our button
      a.addClass("emotion-btn");
      // Adding a data-attribute
      a.attr("data-name", emotions[i]);
      // Providing the initial button text
      a.text(emotions[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }

  // This function handles events where an emotion button is clicked
  $("#add-gif").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var emotion = $("#gif-input")
      .val()
      .trim();

    // Adding movie from the textbox to our array
    emotions.push(emotion);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

  // function that allows stopping and starting of gifs
  function controlGif() {
    // ######
    // ######
    // ######
    // ######
    // ######
  }

  // Adding a click event listener to all elements with a class of "emotion-btn"
  $(document).on("click", ".emotion-btn", displayEmotionInfo);

  // Adding a click event listener to all buttons "emotion-btn"
  $(document).on("click", ".gif", controlGif);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();
});
