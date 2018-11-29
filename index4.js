var complaintsRef = dataRef.ref("complaints");
    
$("#back").on("click", function(event) {
    event.preventDefault();
  
    complaintsRef.on("value", function(snapshot) {
        location.href = "index.html";
   });
 });


$("#submit").on("click", function(event) {
    event.preventDefault();
    

    // get input values from index.html
    var name = $("#employee-name-input").val();
    var date = moment()._d;
    var comment = $("#comment-input").val();
    // var category = $("#category-input").val();
    // var resolved = $("#resolution-input").val();
    var roomNumber = $("#roomnumber-input").val();
    var priority = $("#priority-input").val();
    var type = $("#type-input").val();

    // puts input values into an object
    var complaints = {
        name: name,
        date: date.toUTCString(),
        comment: comment,
        roomNumber: roomNumber,
        priority: priority,
        type: type
    };


    // push the object to Firebase
    complaintsRef.push(complaints);
    location.href = "index.html";


  });


  $( "#priority-input" ).change(function() {
    event.preventDefault();
    if ($(this).val() === "Urgent") {
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=g06SMRYEUnHX7eXChQkxF6Ukkeov2Dgp&q=" + "hurry" + "&limit=" + 10 + "&offset=0&" + "Y" + "=Y&lang=en";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            gifArray = Object.values(response.data);
            animateURLArray = [];
            for (var i=0; i < 10; i++) {
                animateURLArray.push(gifArray[i].images.fixed_width.url);
            }
        
            var gifDiv = $("#trump");
            
                var pageDiv = $("<div>");
                var image = $("<img>").attr("src", animateURLArray[2]);
                image.addClass("gif");
         
                pageDiv.append(image);
                gifDiv.html(pageDiv);
              
        });

    }
    
  });  



 $("#back").on("click", function(event) {
    event.preventDefault();
    location.href = "index.html";

 });