jQuery(document).ready(function ($) {

    'use strict';


    //SMOOTH SCROLL
    smoothScroll.init({
        speed: 500, // How fast to complete the scroll in milliseconds
        easing: 'easeInOutCubic', // Easing pattern to use
        updateURL: false, // Boolean. Whether or not to update the URL with the anchor hash on scroll
        callbackBefore: function (toggle, anchor) {}, // Function to run before scrolling
        callbackAfter: function (toggle, anchor) {} // Function to run after scrolling
    });


    //COUNTDOWN TIMER
    var newYear = new Date();
    newYear = new Date(newYear.getFullYear() + 1, 1 - 1, 1);
    $('#countdown').countdown({
        until: new Date(2016, 10 - 1, 12)
    }); // enter event day

    $('#removeCountdown').toggle(
        function () {
            $(this).text('Re-attach');
            $('#defaultCountdown').countdown('destroy');
        },
        function () {
            $(this).text('Remove');
            $('#defaultCountdown').countdown({
                until: newYear
            });
        }
    );

    //MILESTONE
    $('.timer').countTo();


    //MAGNIFIC POPUP LOAD CONTENT VIA AJAX
    $('.speaker-detail').magnificPopup({
        type: 'ajax'
    });
    $('.register').magnificPopup({
        type: 'ajax'
    });

    //MAGNIFIC POPUP IMAGE
    $('.image-link').magnificPopup({
        type: 'image'
    });

    //OWLCAROUSEL SCHEDULE
    var timetable = $("#timetable");
    var days = $("#days");

    timetable.owlCarousel({
        singleItem: true,
        slideSpeed: 1000,
        navigation: false,
        pagination: false,
        afterAction: syncPosition,
        responsiveRefreshRate: 200,
    });

    days.owlCarousel({
        items: 3,
        itemsMobile: [479, 3],
        pagination: false,
        responsiveRefreshRate: 100,
        afterInit: function (el) {
            el.find(".owl-item").eq(0).addClass("synced");
        }
    });

    function syncPosition(el) {
        var current = this.currentItem;
        $("#days")
            .find(".owl-item")
            .removeClass("synced")
            .eq(current)
            .addClass("synced")
        if ($("#days").data("owlCarousel") !== undefined) {
            center(current)
        }
    }

    $("#days").on("click", ".owl-item", function (e) {
        e.preventDefault();
        var number = $(this).data("owlItem");
        timetable.trigger("owl.goTo", number);
    });

    function center(number) {
        var daysvisible = days.data("owlCarousel").owl.visibleItems;
        var num = number;
        var found = false;
        for (var i in daysvisible) {
            if (num === daysvisible[i]) {
                var found = true;
            }
        }

        if (found === false) {
            if (num > daysvisible[daysvisible.length - 1]) {
                days.trigger("owl.goTo", num - daysvisible.length + 2)
            } else {
                if (num - 1 === -1) {
                    num = 0;
                }
                days.trigger("owl.goTo", num);
            }
        } else if (num === daysvisible[daysvisible.length - 1]) {
            days.trigger("owl.goTo", daysvisible[1])
        } else if (num === daysvisible[0]) {
            days.trigger("owl.goTo", num - 1)
        }

    }

    //OWLCAROUSEL GALLERY
    var owl = $(".gallery");

    owl.owlCarousel({
        itemsCustom: [
			[0, 2],
			[450, 2],
			[600, 4],
			[700, 4],
			[1000, 4],
			[1200, 4],
			[1600, 4]
		  ],
        navigation: true,
        navigationText: ['<i class="fa fa-4x fa-chevron-circle-left"></i>', '<i class="fa fa-4x  fa-chevron-circle-right"></i>'],
    });


    //OWLCAROUSEL TESTIMONIAL
    $("#quote").owlCarousel({

        pagination: false,
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true,
        navigation: true,
        navigationText: ['<i class="fa fa-3x fa-chevron-circle-left"></i>', '<i class="fa fa-3x  fa-chevron-circle-right"></i>'],
    });


    //FIX HOVER EFFECT ON IOS DEVICES
    document.addEventListener("touchstart", function () {}, true);

});




$(window).load(function () {


    //PARALLAX BACKGROUND
    $(window).stellar({
        horizontalScrolling: false,
    });


    //PRELOADER
    $('#preload').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.


    //HEADER ANIMATION
    $(window).scroll(function () {
        if ($(".navbar").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
        }
    });

});

// CONTACT FORM FUNCTION
var contact_send = function () {

    'use strict';

    var name = $("#name").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var type = $("#type").val();

    if (name == "") {
        alert("name area is empty!");
        $("#name").focus();
    } else if (email == "") {
        alert("email address area is empty!");
        $("#email").focus();
    } else if (phone == "") {
        alert("phone number area is empty!");
        $("#phone").focus();
    } else if (type == "") {
        alert("register type isn't selected!");
        $("#type").focus();
    } else {
        $.post("contact.send.php", {
            name: name,
            email: email,
            phone: phone,
            type: type
        }, function (result) {
            if (result == "SUCCESS") {
                alert("Your contact form is sent.");
                setTimeout(function () {
                    $("#name").val("");
                    $("#email").val("");
                    $("#phone").val("");
                    $("#type").val("");
                }, 3000);
            } else {
                alert("Your contact form isn't sent. Please check fields and try again.");
            }
        });
    }

};

/* Newsletter Functions */
var newsletter_send = function () {

    'use strict';

    var email = $("#newsletter_email").val();
    if (email == "") {
        alert("Your email address is empty!");
        $("#newsletter_email").focus();
    } else {
        $.post("newsletter.send.php", {
            email: email
        }, function (result) {

            console.log(result);

            if (result == "SUCCESS") {
                alert("Thank you. Your email is added to our database.");
                setTimeout(function () {
                    $("#newsletter_email").val("");
                }, 3000);
            } else if (result == "EXIST") {
                alert("Error. Your email address is already exist our database.");
                $("#newsletter_email").focus();
            } else {
                alert("Error. Your email isn't added to our database.");
                $("#newsletter_email").focus();
            }

        });
    }

};


//GOOGLE MAP
function init_map() {
    var myOptions = {
        zoom: 14,
        center: new google.maps.LatLng(52.4158793, 16.9121377), //change the coordinates
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        styles: [{
            featureType: 'all',
            stylers: [{
                saturation: 0
            }, {
                gamma: 0.50
            }]
        }]
    };
    var locations = [
        ["<b>Conference Venue</b><br/>al. Niepodleglosci 10<br/> 61-875 Poznan", 52.4061735, 16.9183952],
        ["<b>Workshops Venue</b><br/>ul. Wojska Polskiego 28<br/> 60-637 Poznan", 52.427068, 16.904327]
    ];
    map = new google.maps.Map(document.getElementById("gmap_canvas"), myOptions);
    infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map
        });

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }

    google.maps.event.addListener(marker, "click", function () {
        infowindow.open(map, marker);
    });
}
google.maps.event.addDomListener(window, 'load', init_map);

// COUNTER

window.onload = function () {
    init()
};

var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1rVTUrcsiZLb-9FgGmZ1Yna_Yexu8E3gRkYNkhJpzc2c/pubhtml?gid=1431103246&single=true';

function init() {
    Tabletop.init({
        key: public_spreadsheet_url,
        callback: showInfo
    })
}

function showInfo(data, tabletop) {
    
    // Licznik
    var gcount = data.Licznik.elements[0]["Counter"];
    var count;
    if (gcount < 30) {
        count = +gcount + +10 + +12;
    } else if (gcount < 40) {
        count = +gcount + +10 + +6;
    } else if (gcount < 50) {
        count = +gcount + +10;
    } else if (gcount < 60) {
        count = +gcount + +5;
    } else {
        count = +gcount
    }

    $('#google-count').countTo({
        to: count
    });
    
    // Warsztaty
    console.log(data.Workshops.elements);
    var myList = data.Workshops.elements;
    
    
    function addAllColumnHeaders(myList) {
        var columnSet = [];
        var headerTr$ = $('<tr/>');

        for (var i = 0; i < myList.length; i++) {
            var rowHash = myList[i];
            for (var key in rowHash) {
                if ($.inArray(key, columnSet) == -1) {
                    columnSet.push(key);
                    headerTr$.append($('<th/>').html(key));
                }
            }
        }
        $("#workshopsTable").append(headerTr$);

        return columnSet;
    }
    
    //function buildHtmlTable() {
        var columns = addAllColumnHeaders(myList);

        for (var i = 0; i < myList.length; i++) {
            var row$ = $('<tr/>');
            for (var colIndex = 0; colIndex < columns.length; colIndex++) {
                var cellValue = myList[i][columns[colIndex]];

                if (cellValue == null) {
                    cellValue = "";
                }

                row$.append($('<td/>').html(cellValue));
            }
            $("#workshopsTable").append(row$);
        }
    //}
}

(function() {
	var mails = document.querySelectorAll('[data-mail-user][data-mail-domain]');
  
  Array.prototype.forEach.call(mails, function(el)
  {
  	var user    = el.dataset.mailUser;
    var domain  = el.dataset.mailDomain;
    var pattern =  user + '@' + domain;
    
		el.textContent = pattern;

    if(el.getAttribute('href'))
    	el.setAttribute('href', 'mailto:' + pattern);	
	});
}());

//program

$("div.action").click (function(){
    var $this = $(this);
    var target = $this.data('content');
    $('div.action').not($this).each(function(){
       var $other = $(this);
       var otherTarget = $other.data('content');
       $(otherTarget).hide();        
    });
    
    $(target).animate({height: "toggle"}, 30);
    
});