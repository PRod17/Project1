var config = {
    apiKey: "AIzaSyAjOckR80NCLOYl1Pb3M1EPwz1TnRBS0AY",
    authDomain: "project-25482.firebaseapp.com",
    databaseURL: "https://project-25482.firebaseio.com",
    projectId: "project-25482",
    storageBucket: "project-25482.appspot.com",
    messagingSenderId: "776832260377"
};
firebase.initializeApp(config);
var database = firebase.database();
var totalGuest = 0;
$("#submit-button").on("click", function (event) {
    event.preventDefault();
    var guestEmail = $("#guest-email").val().trim();
    var guestName = $("#guest-name").val().trim();
    var groupSize = $("#group-size").val();
    var guestMessage = $("#guest-message").val().trim();
    $("#email-warning").text("");
    $("#name-warning").text("");
    $("#size-warning").text("");
    if (validateEmail(guestEmail) && guestName.length > 2 && groupSize > 0) {
        database.ref("/rsvp").push({
            email: guestEmail,
            name: guestName,
            size: groupSize,
            message: guestMessage
        });
        $("#guest-email").val("");
        $("#guest-name").val("");
        $("#group-size").val("");
        $("#guest-message").val("");

        $("#submitSuccess").append($("<h5>").text("Successfully Submitted.").addClass("text-success"));
        setTimeout(function () { $("#submitSuccess").empty(); }, 5000);
    } else {
        $("#email-warning").text("");
        $("#name-warning").text("");
        $("#size-warning").text("");
        if (!validateEmail(guestEmail)) {
            $("#email-warning").text("Invalid Email.");
        }
        if (guestName.length < 3) {
            $("#name-warning").text("Should be more than 2 characters.");
        }
        if (groupSize < 1) {
            $("#size-warning").text("Should be at least 1.");
        }
    }
});
database.ref("/rsvp").on("child_added", function (childSnapshot) {
    totalGuest = totalGuest + parseInt(childSnapshot.val().size);
    var newTableItem = $("<tr>");
    // var tableGuestEmail = $("<td>");
    // tableGuestEmail.text(childSnapshot.val().email);
    var tableGuestName = $("<td>");
    tableGuestName.text(childSnapshot.val().name);
    var tableNumberAttendees = $("<td>");
    tableNumberAttendees.text(childSnapshot.val().size);
    var tableMessage = $("<td>");
    tableMessage.text(childSnapshot.val().message);
    newTableItem.append(tableGuestName);
    // newTableItem.append(tableGuestEmail);
    newTableItem.append(tableNumberAttendees);
    newTableItem.append(tableMessage);
    $("#table-body").append(newTableItem);
    $("#totalGuest").text("Total Number of Guests: " + totalGuest);

}, function (errorObject) {
    // In case of error this will print the error
    console.log("The read failed: " + errorObject.code);
})
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
var countDownDate = new Date("March 23, 2019 14:30:25").getTime();
var x = setInterval(function () {
    // console.log(countDownDate)
    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;
    // console.log(distance)
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    // console.log(days)
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    // console.log("hours", hours)
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    // var countDown = 
    // Display the result in the element with id="demo"
    $("#demo").text(days + "d " + hours + "h " + minutes + "m ")

    // If the count down is finished, write some text 
    if (distance < 0) {
        clearInterval(x);
        $("#demo").text("Days Left" + days)
    }
}, 1000);


