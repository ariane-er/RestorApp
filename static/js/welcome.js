window.onload = init;

//At the beginning, I want to hide the forms and only show the sign Up and log In Buttons.
//The function init contains the handling of those clicks.

function init() {
    document.getElementById("logInApplet").style.display="none";
    document.getElementById("signUpApplet").style.display="none";

    //We get the buttons 'signUpButton' and 'logInButton', as well as the 'back' buttons.

    var signUpButton = document.getElementById("signUpButton");
    var logInButton = document.getElementById("logInButton");
    var backLogIn = document.getElementById("backLogIn");
    var backSignUp = document.getElementById("backSignUp");

    //We call the functions that will handle these buttons.

    logInButton.onclick = handleLogInButton;
    signUpButton.onclick = handleSignUpButton;
    backLogIn.onclick = handleBackLogIn;
    backSignUp.onclick = handleBackSignUp;

    //AJAX to handle the submission of the login data.

    $('#logInForm').submit(function(e) {

        var url = '/processLogIn'

        e.preventDefault();

        $.ajax({
                type : 'POST',
                url : '/processLogIn', //We send the AJAX to this url.
                data : {
                    logInUsername : $('#logInUsername').val(),  //Get the values from the DOM.
                    logInPassword : $('#logInPassword').val()},
                success: window.location.href = '/applet' //If everything it's okay, let's go here.
                })
                .done(function(data) {
                    if (data.error) { //if it returns an error,
                        document.getElementById("logInPassword").value=""; //let's clean up the password
                        alert(data.error); //and alert about the error.
                        }
                    else if (data.success) { //if it returns a success,
                        window.location.href = (data.success)}}) //let's redirect.
                ;});

    //AJAX to handle the submission of the signup data.

    $('#signUpForm').submit(function(e) {

        var url = '/processSignUp'

        e.preventDefault();

        $.ajax({
                type : 'POST',
                url : '/processSignUp',
                data : {
                    signUpUsername : $('#signUpUsername').val(),   //Get the values from the DOM.
                    signUpPassword : $('#signUpPassword').val(),
                    signUpConPassword : $('#signUpConPassword').val()}

                })
                .done(function(data) {
                    if (data.error) {
                        document.getElementById("signUpPassword").value="";     //Let's clear up the password and conpassword
                        document.getElementById("signUpConPassword").value="";  //fields so that the user can reenter them.
                        alert("The passwords don't match."); //Alert
                        }
                    else if (data.usernameexists) {
                        alert("Username already exists. Please choose a different username.");
                        document.getElementById("signUpPassword").value="";     //Let's clear up the password and conpassword
                        document.getElementById("signUpConPassword").value="";
                        document.getElementById("signUpUsername").value="";
                        }
                    else if (data.success)
                        window.location.href = (data.success)}) //If it's okay, let's do this.
                ;});


    }

//These functions handle the buttons. They hide the big buttons and show the login
//and the sign up applets.

function handleLogInButton() {
    document.getElementById("logInApplet").style.display="block";
    document.getElementById("mainButtons").style.display="none";}

function handleSignUpButton() {
    document.getElementById("mainButtons").style.display="none";
    document.getElementById("signUpApplet").style.display="block";}

function handleBackLogIn() {
    document.getElementById("mainButtons").style.display="block";
    document.getElementById("logInApplet").style.display="none";}

function handleBackSignUp() {
    document.getElementById("mainButtons").style.display="block";
    document.getElementById("signUpApplet").style.display="none";}

