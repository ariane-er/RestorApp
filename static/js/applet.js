window.onload = init;

function init() { //We'll get geolocation and initialize buttons.
    var acc = document.getElementsByClassName("accordion");
    var i; //Counter

    for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}

    document.getElementById("listView").style.display ="none";
    document.getElementById("backgroundMapContainer").style.display="block";

    var mapTabButton = document.getElementById("mapTabButton");
    var listTabButton = document.getElementById("listTabButton");

    mapTabButton.onclick = handleMapTabButton;
    listTabButton.onclick = handleListTabButton;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showMap);
    } else {
        alert("Oops, no geolocation support")};


    var currentUser;
    $.getJSON('/current', function(data){
        currentUser = data['username']
        var appendable = "Welcome, " + currentUser + "!"
        $('#usernameContainer').append(appendable);});



    }

var map;
var clickedLat;
var clickedLng;

function showMap(position) {
    var googleLatLong = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var mapOptions = {
        disableDoubleClickZoom: true,
        zoom: 15,
        center: googleLatLong,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#e7d5ba"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#615439"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#e7d5ba"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#e7d5ba"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#eee4d4"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#eee4d4"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#eee4d4"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.natural.terrain",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "saturation": "0"
            }
        ]
    },
    {
        "featureType": "landscape.natural.terrain",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#eee4d4"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#fcefd2"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#fcefd2"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#fcefd2"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "hue": "#ffb000"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#fcefd2"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#7dacbc"
            },
            {
                "visibility": "on"
            }
        ]
    }
]}; //We can style the map by setting it up in the options.
    var mapDiv = document.getElementById("backgroundMap")
    map = new google.maps.Map(mapDiv, mapOptions);

    var buttonString;

    $.getJSON('/restaurants', function(data){
        console.log(data[0].name + "  " + data[0].restaurantid);
        $.each(data, function(id, info){
            console.log(info.name);
            coordinates = new google.maps.LatLng(info.latitude, info.longitude);
            //let's prepare the content of the infoWindow
            iwContent = "<h3>" + info.name + "</h3>" + info.description +"<br><br><button onclick='showInfo(" + info.restaurantid + ")'>More about " + info.name + "...</button>";
            addMarker(map, coordinates, info.name, iwContent); //call the addMarker function
            var listView = document.getElementById("listView")
            buttonString = '<button type="button" class="restaurantRow" onclick= "showInfo(' + info.restaurantid + ')"> <b>' + info.name + '</b><br>' + info.description + '</button><br>';
            $(buttonString).appendTo('#listView'); //add the buttons to the list view tab.
            });
        });

    //Let's add a listener for a right-click on the map.
    google.maps.event.addListener(map, "dblclick", function(event) {
        clickedLat = event.latLng.lat();
        clickedLng = event.latLng.lng();
        console.log(clickedLat, clickedLng);

        //AJAX to handle submission of a new restaurant.
        $('#newRestaurantForm').submit(function(e) {
            e.preventDefault();

            $.ajax({
                    type : 'POST',
                    url : '/newRestaurant',
                    dataType : "json",
                    data : {
                        newRName : $('#newRName').val(),
                        newRDescription : $('#newRDescription').val(),
                        newRTakeaway : $('#takeaway').prop('checked'),
                        newREatin : $('#eatin').prop('checked'),
                        newRDelivery : $('#delivery').prop('checked'),
                        newRKidfriendly : $('#kidfriendly').prop('checked'),
                        newRVegetarian : $('#vegetarian').prop('checked'),
                        newRFavourite : $('#favourite').prop('checked')},
                        newRLatitude : clickedLat,
                        newRLongitude : clickedLng,
                    })
                    .done (function(data) {
                        console.log(data);
                        if (data.error) {
                            alert(data.error);
                        } else if (data.success) {
                            alert(data.success);
                        }
                    });
                });

        var regModal = document.getElementById("myModal");
        var span = document.getElementsByClassName("close")[0];

        regModal.style.display = "block";

        span.onclick = function() {
            regModal.style.display = "none";
            }

        window.onclick = function(event) {
            if (event.target == regModal) {
                regModal.style.display = "none";
                }
            }

        });
    }

function handleListTabButton() {
    document.getElementById("backgroundMapContainer").style.display = "none";
    document.getElementById("listView").style.display = "block";
    document.getElementById("restaurantView").style.display ="none";
    $("#restaurantView").empty();

};

function handleMapTabButton() {
    document.getElementById("backgroundMapContainer").style.display = "block";
    document.getElementById("listView").style.display = "none";
    document.getElementById("restaurantView").style.display ="none";
    $("#restaurantView").empty();
};

function addMarker (map, latlong, title, content) {
    var markerOptions = {
        position: latlong,
        map: map,
        title: title,
        clickable: true
        };
    var marker = new google.maps.Marker(markerOptions);
    var infoWindowOptions = {
        content: content,
        position: latlong
        };
    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    google.maps.event.addListener(marker, "click", function() {
        infoWindow.open(map);
        }); //This is a listener for the 'click' event.
        //When the marker is clicked, an infoWindow will open on the map.
}

function showInfo(restaurantid) {
    document.getElementById("backgroundMapContainer").style.display = "none";
    document.getElementById("listView").style.display = "none";
    document.getElementById("restaurantView").style.display ="block";

    //Let's prepare the Restaurant view!
    var restaurantView = document.getElementById("restaurantView");

    $.getJSON('/restaurants', function(data){ //Fill the variables with the restaurant that was clicked
        var rName = data[(restaurantid-1)].name;
        var rDescription = data[(restaurantid-1)].description;
        var rStars = data[(restaurantid-1)].stars;
        var rLatitude = data[(restaurantid-1)].latitude;
        var rLongitude = data[(restaurantid-1)].longitude;
        var rTags = data[(restaurantid-1)].tags;
        var rPriceRange = data[(restaurantid-1)].pricerange;
        var rTakeaway = data[(restaurantid-1)].takeaway;
        var rDelivery = data[(restaurantid-1)].delivery;
        var rEatin = data[(restaurantid-1)].eatin;
        var rKidFriendly = data[(restaurantid-1)].kidfriendly;
        var rVegetarian = data[(restaurantid-1)].vegetarian;
        var rFavourite = data[(restaurantid-1)].favourite;
        var rPhone = data[(restaurantid-1)].phone;
        var rOpeningHs = data[(restaurantid-1)].openinghs;
        var rClosingHs = data[(restaurantid-1)].closinghs;

        var rvContent = "<h2>" + rName + "</h2>" +
                          "<p>" + rDescription + "</p>";

        if (rTakeaway == true) {
            rvContent += "<p>Takeaway: YES!</p>";
        } else {
            rvContent += "<p>Takeaway: Nope.</p>"}

        if (rDelivery == true) {
            rvContent += "<p>Delivery: YES!</p>";
        } else {
            rvContent += "<p>Delivery: Nope.</p>"}

        if (rEatin == true) {
            rvContent += "<p>Eat-in: YES!</p>";
        } else {
            rvContent += "<p>Eat-in: Nope.</p>"}

        if (rKidFriendly == true) {
            rvContent += "<p>Kid-Friendly: YES!</p>";
        } else {
            rvContent += "<p>Kid-Friendly: Nope.</p>"}

        if (rVegetarian == true) {
            rvContent += "<p>Vegetarian: YES!</p>";
        } else {
            rvContent += "<p>Vegetarian: Nope.</p>"}


        $(rvContent).appendTo('#restaurantView');

        });

    };
