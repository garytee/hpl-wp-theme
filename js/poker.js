jQuery(document).ready(function($) {
    $('#BGLogo').addClass('animate__animated animate__fadeOut animate__slow animate__delay-0s');

});

setTimeout(() => {
    document.getElementById('BGLogo').style.display = 'none';
}, 2000);
setTimeout(() => {
    document.getElementById('BGLogo2').style.display = 'none';
}, 5000);
setTimeout(() => {
    document.getElementById('Connecting').style.display = 'none';
}, 2000);
jQuery(document).ready(function($) {
    hotkeys('f1', function(event, handler){
// Prevent the default refresh event under WINDOWS system
event.preventDefault() 
var simulateMouseEvent = function(element, eventName, coordX, coordY) {
    element.dispatchEvent(new MouseEvent(eventName, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: coordX,
        clientY: coordY,
        button: 0
    }));
};
var theButton = document.querySelector('.tablecontent .commandbtn1 button');
var box = theButton.getBoundingClientRect(),
coordX = box.left + (box.right - box.left) / 2,
coordY = box.top + (box.bottom - box.top) / 2;
simulateMouseEvent (theButton, "mousedown", coordX, coordY);
simulateMouseEvent (theButton, "mouseup", coordX, coordY);
simulateMouseEvent (theButton, "click", coordX, coordY);
});
    hotkeys('f2', function(event, handler){
// Prevent the default refresh event under WINDOWS system
event.preventDefault() 
var simulateMouseEvent = function(element, eventName, coordX, coordY) {
    element.dispatchEvent(new MouseEvent(eventName, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: coordX,
        clientY: coordY,
        button: 0
    }));
};
var theButton = document.querySelector('.tablecontent .commandbtn2 button');
var box = theButton.getBoundingClientRect(),
coordX = box.left + (box.right - box.left) / 2,
coordY = box.top + (box.bottom - box.top) / 2;
simulateMouseEvent (theButton, "mousedown", coordX, coordY);
simulateMouseEvent (theButton, "mouseup", coordX, coordY);
simulateMouseEvent (theButton, "click", coordX, coordY);
});
    hotkeys('f3', function(event, handler){
// Prevent the default refresh event under WINDOWS system
event.preventDefault() 
var simulateMouseEvent = function(element, eventName, coordX, coordY) {
    element.dispatchEvent(new MouseEvent(eventName, {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: coordX,
        clientY: coordY,
        button: 0
    }));
};
var theButton = document.querySelector('.tablecontent .commandbtn3 button');
var box = theButton.getBoundingClientRect(),
coordX = box.left + (box.right - box.left) / 2,
coordY = box.top + (box.bottom - box.top) / 2;
simulateMouseEvent (theButton, "mousedown", coordX, coordY);
simulateMouseEvent (theButton, "mouseup", coordX, coordY);
simulateMouseEvent (theButton, "click", coordX, coordY);
});
});
jQuery(document).ready(function($) {
    setTimeout(() => {
$( "#BGLogo" ).wrap( "<div class='hidelogo'></div>" );
$( "#Lobby .header" ).before( "<div class='main-menu'></div>" );
$( "#top_div" ).after( "<div class='logo'><a href='https://www.huronpokerleague.com/ranking_script.php' target='_blank'><img class='animate__animated animate__bounceInDown animate__slow animate__delay-0s' src='https://cdn.huronpokerleague.com/wp-content/uploads/2020/06/06115221/HPL_Logo_V2_resized.png'></a></div>" );




$( "#bottom_div" ).after( "<div id='iostooltip' class='animate__animated animate__pulse animate__slow animate__repeat-10'><div class='ios-prompt'><p>To install on your iPhone/iPad press <img src='https://cdn.huronpokerleague.com/wp-content/uploads/2020/07/27160347/share.svg' style='display: inline-block; margin-top: 4px; margin-bottom: -4px; height: 20px; width: auto;'> and then Add to Home Screen.</p></div><div class='tooltip__arrow'></div><div id='x-out'><button onclick='myFunction()'><i class='fal fa-times'></i></button></div></div>" );
$( "#bottom_div" ).after( "<div id='banner'></div>" );

$( "#top_div" ).before( "<input type='range' id='myRange' value='20'>" );

}, 2000);
    if ($(window).width() < 1367) {
        setTimeout(() => {
            $("#Lobby .menu_bold:eq(0)").detach().appendTo('.main-menu');
            $("#Lobby .menu_bold:eq(1)").detach().appendTo('.main-menu');
            $("#Lobby .menu_bold:eq(2)").detach().appendTo('.main-menu');
            $("#Lobby .menu_bold:eq(3)").detach().appendTo('.main-menu');
            $("#Lobby .menu_bold:eq(4)").detach().appendTo('.main-menu');
        }, 4000);
    }
    else {
        setTimeout(() => {
            $("#Lobby .menu_bold:eq(0)").detach().appendTo('.main-menu');
            $("#Lobby .menu_bold:eq(1)").detach().appendTo('.main-menu');
            $("#Lobby .menu_bold:eq(2)").detach().appendTo('.main-menu');
            $("#Lobby .menu_bold:eq(3)").detach().appendTo('.main-menu');
        }, 4000);
    }
});
jQuery(document).ready(function($) {
    if( $('.tabs ul li').css('font-weight') == 'bold' ) {
     console.log('It equal bold');
 } else {
     console.log('It did not equal bold');
 }
});
function myFunction() {
// alert("I am an alert box!");
// document.getElementById('x-out').style.display = 'none';
document.getElementById('iostooltip').style.display = 'none';
}
$(document).ready(function() {
    setTimeout(function() {
      var volumerange = document.getElementById("myRange").value;
      console.log(volumerange / 100);
  }, 2000);
});
$(document).ready(function() {
    var previous = null;
    var current = null;
    setInterval(function() {
        $.getJSON("https://huronpokerleague.com/callback/logins.php", function(json) {
            current = JSON.stringify(json);            
            if (previous && current && previous !== current) {
                console.log('NEW LOGIN');
                var a1 = JSON.parse(current);
                console.log(a1[a1.length-1]);
                var displayResources = $("#banner");
                displayResources.text("Loading data from JSON source...");
                var lastitem = a1[a1.length-1];
                var winner = lastitem['player'];
                var loser = lastitem['session'];
                var output =
                "<div class='notification' data-splitting>"
                output +=
                "<div class='row_1'>" +
                "</div>" +
                "<div class='row_2'>" +
                "<div class='name'>" +
                winner +
                "</div>Logged In" +
                "<div class='action'>" +
                "!</div></div></div>";
                output += "</div>";
                displayResources.html(output);
                var header = $('.notification');
                header.addClass('show');
                setTimeout(function() {
                    header.removeClass('show');
                }, 4000);
                Splitting({ by: "chars" });    
            }
            previous = current;
        });                       
    }, 1000); 
});
$(document).ready(function() {
    var previous = null;
    var current = null;
    setInterval(function() {
        $.getJSON("https://huronpokerleague.com/callback/test2.php", function(json) {
            current = JSON.stringify(json);            
            if (previous && current && previous !== current) {
                current = JSON.stringify(json);  
                var catalog = JSON.parse(current);
                var my = {};
                var dup = [];
                $.each(catalog, function(index, value) {
                    if(!!!my[value.time]) {
                        my[value.time] = [];
                    }
                    my[value.time].push(value.loser);    
                });
                $.each(my, function(index, value) {
                    if(value.length > 1) {
                        $.each(my[index], function(i, val) {
                           dup.push(val);
                       });
                    }      
                });
                console.log('DOUBLE KNOCKOUT!');
                console.log(dup);
                console.log('KNOCKOUT!');
                var a1 = JSON.parse(current);
                console.log(a1[a1.length-1]);
                var displayResources = $("#banner");
                displayResources.text("Loading data from JSON source...");
                var lastitem = a1[a1.length-1];
                var winner = lastitem['winner'];
                var loser = lastitem['loser'];
                var output =
                "<audio id='sound0' src='https://www.myinstants.com/media/sounds/you-lose.mp3' type='audio/mpeg'></audio>" +
                "<audio id='sound1' src='https://www.myinstants.com/media/sounds/beck-loser.mp3' type='audio/mpeg'></audio>" + 
                "<audio id='sound2' src='https://www.myinstants.com/media/sounds/getinloser.mp3' type='audio/mpeg'></audio>" +
                "<audio id='sound3' src='https://www.myinstants.com/media/sounds/my-movie_22.mp3' type='audio/mpeg'></audio>" +
                "<div class='notification' data-splitting>"
                output +=
                "<div class='ko_gif'>" +
                "<img src='https://huronpokerleague.com/wp-content/themes/hpl/images/ko.gif' alt='ko_gif'>" +
                "</div>" +
                "<div class='name'>" +
                winner +
                "</div>KO'd" +
                "<div class='action'>" +
                loser +
                "!</div></div>";
                output += "</div>";
                displayResources.html(output);
                var header = $('.notification');
                header.addClass('show');
                setTimeout(function() {
                    header.removeClass('show');
                }, 4000);
                Splitting({ by: "chars" });
                var pattern = [],
                tone;
                pattern.push(Math.floor(Math.random() * 4));
                tone = "#sound" + pattern[0];
                var x = document.getElementById("myRange").value;
                $(tone)[0].volume = x / 100;
  //$(tone).trigger('play');  //uncomment to play
  //$(tone).get(0).play();    //uncomment to play
  $(tone)[0].play();          //comment to turn off
}
previous = current;
});                       
    }, 1000); 
});
$(document).ready(function() {
    var previous = null;
    var current = null;
    setInterval(function() {
        $.getJSON("https://huronpokerleague.com/callback/tourneystart.php", function(json) {
            current = JSON.stringify(json);            
            if (previous && current && previous !== current) {
                console.log('Tournament Started AFTER Page Load');
                var a1 = JSON.parse(current);
                var lastitem = a1[a1.length-1];
                var time = lastitem['time'];
                var tourneystarttime = moment(time).toDate();
                console.log("Tourney started at:", tourneystarttime);
                var blinds1 = moment(tourneystarttime).add(2, 'm').toDate();
                console.log("Blinds raise at:", blinds1);
                var currenttime = moment().toDate();
                console.log("The time is currently:", currenttime);
                var blinds1start = moment(tourneystarttime).add(55, 'm').toDate();
                var blinds1end = moment(blinds1start).add(1, 's').toDate();
                var blinds2start = moment(tourneystarttime).add(85, 'm').toDate();
                var blinds2end = moment(blinds2start).add(1, 's').toDate();
                var blinds3start = moment(tourneystarttime).add(115, 'm').toDate();
                var blinds3end = moment(blinds3start).add(1, 's').toDate();
                var blinds4start = moment(tourneystarttime).add(145, 'm').toDate();
                var blinds4end = moment(blinds4start).add(1, 's').toDate();
                var blinds5start = moment(tourneystarttime).add(175, 'm').toDate();
                var blinds5end = moment(blinds5start).add(1, 's').toDate();
                var blinds6start = moment(tourneystarttime).add(205, 'm').toDate();
                var blinds6end = moment(blinds6start).add(1, 's').toDate();
                var blinds7start = moment(tourneystarttime).add(265, 'm').toDate();
                var blinds7end = moment(blinds7start).add(1, 's').toDate();
                var blinds8start = moment(tourneystarttime).add(295, 'm').toDate();
                var blinds8end = moment(blinds8start).add(1, 's').toDate();
                var blinds9start = moment(tourneystarttime).add(325, 'm').toDate();
                var blinds9end = moment(blinds9start).add(1, 's').toDate();
                var blinds10start = moment(tourneystarttime).add(355, 'm').toDate();
                var blinds10end = moment(blinds10start).add(1, 's').toDate();
                var blinds11start = moment(tourneystarttime).add(385, 'm').toDate();
                var blinds11end = moment(blinds11start).add(1, 's').toDate();
                if (
                    moment(currenttime).isBetween(blinds1start, blinds1end) 
                    || moment(currenttime).isBetween(blinds2start, blinds2end)
                    || moment(currenttime).isBetween(blinds3start, blinds3end)
                    || moment(currenttime).isBetween(blinds4start, blinds4end)
                    || moment(currenttime).isBetween(blinds5start, blinds5end)
                    || moment(currenttime).isBetween(blinds6start, blinds6end)
                    || moment(currenttime).isBetween(blinds7start, blinds7end)
                    || moment(currenttime).isBetween(blinds8start, blinds8end)
                    || moment(currenttime).isBetween(blinds9start, blinds9end)
                    || moment(currenttime).isBetween(blinds10start, blinds10end)
                    || moment(currenttime).isBetween(blinds11start, blinds11end)
                    ) 
                {
                  console.log('is between blind1')
                  var displayResources = $("#banner");
                  displayResources.text("Loading data from JSON source...");
                  var output =
                  "<audio id='sound0' src='https://www.myinstants.com/media/sounds/mario-atrasado.mp3' type='audio/mpeg'></audio>" +
                  "<audio id='sound1' src='https://www.myinstants.com/media/sounds/mario-atrasado.mp3' type='audio/mpeg'></audio>" + 
                  "<audio id='sound2' src='https://www.myinstants.com/media/sounds/mario-atrasado.mp3' type='audio/mpeg'></audio>" +
                  "<audio id='sound3' src='https://www.myinstants.com/media/sounds/mario-atrasado.mp3' type='audio/mpeg'></audio>" +
                  "<div class='notification' data-splitting>"
                  output +=
                  "<div class='row_1'>" +
                  "<img src='https://huronpokerleague.com/wp-content/themes/hpl/images/blinds.gif' alt='ko_gif'>" +
                  "</div>" +
                  "<div class='row_2'>" +
                  "<div class='name'>" +
                  "</div>Blinds go up in 5 Mins" +
                  "<div class='action'>" +
                  "!</div></div></div>";
                  output += "</div>";
                  displayResources.html(output);
                  var header = $('.notification');
                  header.addClass('show');
                  setTimeout(function() {
                    header.removeClass('show');
                }, 4000);
                  Splitting({ by: "chars" });
                  var pattern = [],
                  tone;
                  pattern.push(Math.floor(Math.random() * 4));
                  tone = "#sound" + pattern[0];
                  var x = document.getElementById("myRange").value;
                $(tone)[0].volume = x / 100;
  $(tone)[0].play();          //comment to turn off
} 
} else {
    console.log('Tournament Started BEFORE Page Load');
    previous = current;
    var a1 = JSON.parse(current);
    var lastitem = a1[a1.length-1];
    var time = lastitem['time'];
    var tourneystarttime = moment(time).toDate();
    console.log("Tourney started at:", tourneystarttime);
    var blinds1 = moment(tourneystarttime).add(55, 'm').toDate();
    console.log("Blinds raise at:", blinds1);
    var currenttime = moment().toDate();
    console.log("The time is currently:", currenttime);
    var blinds1start = moment(tourneystarttime).add(55, 'm').toDate();
    var blinds1end = moment(blinds1start).add(1, 's').toDate();
    var blinds2start = moment(tourneystarttime).add(85, 'm').toDate();
    var blinds2end = moment(blinds2start).add(1, 's').toDate();
    var blinds3start = moment(tourneystarttime).add(115, 'm').toDate();
    var blinds3end = moment(blinds3start).add(1, 's').toDate();
    var blinds4start = moment(tourneystarttime).add(145, 'm').toDate();
    var blinds4end = moment(blinds4start).add(1, 's').toDate();
    var blinds5start = moment(tourneystarttime).add(175, 'm').toDate();
    var blinds5end = moment(blinds5start).add(1, 's').toDate();
    var blinds6start = moment(tourneystarttime).add(205, 'm').toDate();
    var blinds6end = moment(blinds6start).add(1, 's').toDate();
    var blinds7start = moment(tourneystarttime).add(265, 'm').toDate();
    var blinds7end = moment(blinds7start).add(1, 's').toDate();
    var blinds8start = moment(tourneystarttime).add(295, 'm').toDate();
    var blinds8end = moment(blinds8start).add(1, 's').toDate();
    var blinds9start = moment(tourneystarttime).add(325, 'm').toDate();
    var blinds9end = moment(blinds9start).add(1, 's').toDate();
    var blinds10start = moment(tourneystarttime).add(355, 'm').toDate();
    var blinds10end = moment(blinds10start).add(1, 's').toDate();
    var blinds11start = moment(tourneystarttime).add(385, 'm').toDate();
    var blinds11end = moment(blinds11start).add(1, 's').toDate();
    if (
        moment(currenttime).isBetween(blinds1start, blinds1end) 
        || moment(currenttime).isBetween(blinds2start, blinds2end)
        || moment(currenttime).isBetween(blinds3start, blinds3end)
        || moment(currenttime).isBetween(blinds4start, blinds4end)
        || moment(currenttime).isBetween(blinds5start, blinds5end)
        || moment(currenttime).isBetween(blinds6start, blinds6end)
        || moment(currenttime).isBetween(blinds7start, blinds7end)
        || moment(currenttime).isBetween(blinds8start, blinds8end)
        || moment(currenttime).isBetween(blinds9start, blinds9end)
        || moment(currenttime).isBetween(blinds10start, blinds10end)
        || moment(currenttime).isBetween(blinds11start, blinds11end)
        ) 
    {
      console.log('is between blind1')
      var displayResources = $("#banner");
      displayResources.text("Loading data from JSON source...");
      var output =
      "<audio id='sound0' src='https://www.myinstants.com/media/sounds/mario-atrasado.mp3' type='audio/mpeg'></audio>" +
      "<audio id='sound1' src='https://www.myinstants.com/media/sounds/mario-atrasado.mp3' type='audio/mpeg'></audio>" + 
      "<audio id='sound2' src='https://www.myinstants.com/media/sounds/mario-atrasado.mp3' type='audio/mpeg'></audio>" +
      "<audio id='sound3' src='https://www.myinstants.com/media/sounds/mario-atrasado.mp3' type='audio/mpeg'></audio>" +
      "<div class='notification' data-splitting>"
      output +=
      "<div class='row_1'>" +
      "<img src='https://huronpokerleague.com/wp-content/themes/hpl/images/blinds.gif' alt='ko_gif'>" +
      "</div>" +
      "<div class='row_2'>" +
      "<div class='name'>" +
      "</div>Blinds go up in 5 Mins" +
      "<div class='action'>" +
      "!</div></div></div>";
      output += "</div>";
      displayResources.html(output);
      var header = $('.notification');
      header.addClass('show');
      setTimeout(function() {
        header.removeClass('show');
    }, 4000);
      Splitting({ by: "chars" });
      var pattern = [],
      tone;
      pattern.push(Math.floor(Math.random() * 4));
      tone = "#sound" + pattern[0];
      var x = document.getElementById("myRange").value;
                $(tone)[0].volume = x / 100;
  $(tone)[0].play();          //comment to turn off
} 
}
});                       
}, 1000); 
});






jQuery(document).ready(function($) {

function wheel($div, deltaY) {
    var step = 100;
    var pos = $div.scrollTop();
    var nextPos = pos + (step * (-deltaY))
    console.log("DelatY: " + deltaY + ", Step: " + step + ", nextPos: " + nextPos);
    $div.scrollTop(nextPos);
}

$('.grid_data div').bind('mousewheel', function (event, delta, deltaX, deltaY) {
    if (delta > -2 && delta < 2) {
        wheel($(this), deltaY);
        event.preventDefault();
    }
    console.log(delta);
});



function myFunction() {
  var elmnt = document.getElementsByClassName("scroll_games div");
  var y = elmnt.scrollHeight;
  var x = elmnt.scrollWidth;
  document.getElementById("bottom_div").innerHTML = "Height: " + y + "px<br>Width: " + x + "px";
}





});