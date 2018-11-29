var complaintsRef = dataRef.ref("complaints");

var complaintId = window.location.search.split('=')[1];

function listInfo() {
    $("#complaint").empty();
    //append attributes to compaint section
    var commentDisplay = $("<p>").text("Problem: " + complaintComment);
    var dueDateDisplay = $("<p>").text("Due Date: " + complaintDueDate);

    $("#complaint").append(commentDisplay).append(dueDateDisplay);
}

complaintsRef.on("value", function(snapshot) {

    //function so that when value occurs they don't keep appending
    function listInfo() {
        $("#complaint").empty();
        //append attributes to compaint section
        var commentDisplay = $("<p>").text("Problem: " + complaintComment);
        var dueDateDisplay = $("<p>").text("Due Date: " + complaintDueDate);
    
        $("#complaint").append(commentDisplay).append(dueDateDisplay);
    }

    $("#detailedHeading").text("Room: " + snapshot.val()[complaintId].roomNumber);

    // create variables based on firebase object attributes
    var complaintComment = snapshot.val()[complaintId].comment;
    var complaintDueDate = moment(snapshot.val()[complaintId].date).add(2,"days").format("MMM D YY, h:mm a");
    var complaintType = snapshot.val()[complaintId].type;

    //append attributes to compaint section
    listInfo();

    //pull top 5 places api in area in respect to type
    var corsProxy = "https://cors-anywhere.herokuapp.com/"
    var queryURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=34.059307,-118.4456441&radius=3000&type="
    + complaintType + "&key=AIzaSyBg67m4cRaN6Y8oX2xd6oGK22rYDPOpQMg"; 

    console.log(queryURL);

    $.ajax({
        url: corsProxy + queryURL,
        method: "GET"
    })
    .then(function(data) {

        //rename data results
        var results = data.results;
        console.log(results);

        //iterate through 5 of the closest places
        for (var i = 0; i < 5 ; i++) {

            //create div to house a places properties
            var placesDiv = $("<div class='imageContainer card'>");
            var placesName = results[i].name;
            var placesRating;
            if (results[i].hasOwnProperty("rating")) {
                placesRating = results[i].rating;
            } else {
                placesRating = "N/A"
            }

            // make sure there's an opening hours property in JSON 
            var placesOpen;
            if (results[i].hasOwnProperty("opening_hours")) {
                placesOpen = results[i].opening_hours.open_now;
            } else {
                placesOpen = "N/A";
            };

            // make sure there's an locations property in JSON 
            var placesLocation;
            if (results[i].hasOwnProperty("vicinity")) {
                placesLocation = results[i].vicinity;
            } else {
                placesLocation = "N/A";
            };                
 
            //create paragraphs with info
            var nameDisplay = $("<p>").text("Name: " + placesName);
            var ratingDisplay = $("<p>").text("Rating: " + placesRating); 
            var openDisplay = $("<p>").text("Open Now?: " + placesOpen); 
            var addressDisplay = $("<p>").text("Address: " + placesLocation);           

            //append name display
            placesDiv.append(nameDisplay);
            
            //append open display
            placesDiv.append(openDisplay);

            //append rating display
            placesDiv.append(ratingDisplay);

            //append address display
            placesDiv.append(addressDisplay);

            //display div of places properties
            $("#placesContainer").append(placesDiv);
        }

    });

    $("#resolved").on("click", function(event) {
      event.preventDefault();
    
      complaintsRef.on("value", function(snapshot) {

          console.log(snapshot.val()[complaintId]);
          complaintsRef.child(complaintId).remove();
          location.href = "index.html";
     });

   });

   $("#back").on("click", function(event) {
    event.preventDefault();
    location.href = "index.html";

 });
 
});
