var complaintsRef = dataRef.ref("complaints");


$(document).ready(function() {



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


  });
  
complaintsRef.on("child_added", function(snapshot) {
    // debugger;

    // var typeChosen = _.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });



    var tableBody = $("#table-body");
    var tableRow = $("<tr>");
    tableRow.attr("class", "lol")
    var tableName = $("<td>").text(snapshot.val().name);
    var tableComment = $("<td>").text("comment");
    var tableRoomNumber = $("<th>").text(snapshot.val().roomNumber);
    var tableDate = $("<td>").text(snapshot.val().date);
    var complaintLink = $("<td>");
    var a = $("<a>")
    a.attr("href", "index3.html?complaint-id=" + snapshot.key).text("More Details");
    complaintLink.append(a);
    tableRoomNumber.attr("scope", "row");
    var tablePriority = $("<td>").text(snapshot.val().priority);
    var tableType = $("<td>").text(snapshot.val().type);
    
    console.log(snapshot.val().type);

    tableBody.append(tableRow).append(tableRoomNumber).append(tableName).append(tableDate).append(complaintLink).append(tablePriority).append(tableType);

});



$( "#type-input" ).change(function() {
    event.preventDefault();
    var type = $(this).val();
    $("#table-body1").show();

    complaintsRef.on("value", function(snapshot) {
        // debugger;
    
        // var typeChosen = _.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
        
        console.log(snapshot.val());
        var arrayLol = _.pairs(snapshot.val());
        console.log(arrayLol);
        var typeChosen = _.filter(arrayLol, function(num){ return num[1].priority === type; });
        console.log(typeChosen[0][0]);
        var tableBody = $("#table-body")
        tableBody.hide();
        var tableBody1 = $("#table-body1").empty();



        for (i=0; i<typeChosen.length; i++) {

            
            var tableRow = $("<tr>");
            tableRow.attr("class", "lol")
            var tableName = $("<td>").text(typeChosen[i][1].name);
            var tableComment = $("<td>").text("comment");
            var tableRoomNumber = $("<th>").text(typeChosen[i][1].roomNumber);
            var tableDate = $("<td>").text(typeChosen[i][1].date);
            var complaintLink = $("<td>");
            var a = $("<a>")
            a.attr("href", "index3.html?complaint-id=" + typeChosen[i][0]).text("More Details");
            complaintLink.append(a);
            tableRoomNumber.attr("scope", "row");
            var tablePriority = $("<td>").text(typeChosen[i][1].priority);
            var tableType = $("<td>").text(typeChosen[i][1].type);

            tableBody1.append(tableRow).append(tableRoomNumber).append(tableName).append(tableDate).append(complaintLink).append(tablePriority).append(tableType);


        }

    });
    


  });


  $("#reset1").on("click", function(event) {
    event.preventDefault();
    $("#table-body1").hide();
    $("#table-body").show();

  });









var queryURL = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?zip=90095,us&APIkey=5f04c7bb7018ef79c5ef0a0924d8ddb6";   
$.ajax({
    url: queryURL,
    method: "GET"
})
.then(function(data) {
    var favDiv = $("<div class='imageContainer card'>");

    //get weather info
    var getWeather = data.weather[0].main;
    var getTemp = 1.8*(data.main.temp - 273.15) + 32;
    var roundTemp = Math.round(getTemp);

    $("#weather").text(" " + getWeather + ", Temp: " + roundTemp + String.fromCharCode(176));


})

$("#create").on("click", function(event) {
    event.preventDefault();
  
    location.href = "index4.html";

 });

});

