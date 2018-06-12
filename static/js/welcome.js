window.onload = init;

//At the beginning, I want to hide the forms and only show the sign Up and log In Buttons.
//The function init contains the handling of those clicks.

function init() {
    document.getElementById("logInApplet").style.display="none";
    document.getElementById("signUpApplet").style.display="none";

    var signUpButton = document.getElementById("signUpButton")
    var logInButton = document.getElementById("logInButton")

    logInButton.onclick = handleLogInButton;

    $('#logInForm').submit(function(e) {

        var url = '/processLogIn'

        e.preventDefault();

        $.ajax({
                type : 'POST',
                url : '/processLogIn',
                data : {
                    logInUsername : $('#logInUsername').val(),
                    logInPassword : $('#logInPassword').val()},
                success: window.location.href = '/applet'
                });});
    }

function handleLogInButton() {
    document.getElementById("logInApplet").style.display="block";
    document.getElementById("mainButtons").style.display="none";}

//
//$(document).ready(function() {
//
//	$('logInForm').on('submit', function(event) {
//
//	    event.preventDefault();
//
//		$.ajax({
//			data : {
//				logInUsername : $('#logInUsername').val(),
//				logInPassword : $('#logInPassword').val()
//			},
//			type : 'POST',
//			url : 'http://10.0.2.2:5000/processLogIn'
//		})
//		.done(function(data) {
//
//			alert("It's working");
//
//		});
//
//
//
//	});
//
//});
