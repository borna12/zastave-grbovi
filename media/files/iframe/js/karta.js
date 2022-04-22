
var json = (function () {
  var json = null;
  $.ajax({
    'async': false,
    'global': false,
    'url': 'js/podatci.json',
    'dataType': "json",
    'success': function (data) {
      json = data;
    }
  });
  return json;
})();


var map = AmCharts.makeChart("mapdiv", {
  type: "map",
  theme: "dark",
  projection: "mercator",
  panEventsEnabled: true,
  backgroundColor : "#EDEDFA",
  backgroundAlpha: 1,
  zoomControl: {
    zoomControlEnabled: true,
    panControlEnabled: false,
    minZoomLevel: 0.25,
    gridHeight: 100,
    gridAlpha: 0.1,
    gridBackgroundAlpha: 0,
    gridColor: "#FFFFFF",
    draggerAlpha: 1,
    buttonCornerRadius: 2,
    panStepSize: 6
  },
  mouseWheelZoomEnabled: true,
  dataProvider: {
    map: "worldHigh",
    getAreasFromMap: true,
    areas: json,
  },
  areasSettings: {
    autoZoom: true,
    color: "#B4B4B7",
    colorSolid: "#84ADE9",
    selectedColor: "#84ADE9",
    outlineColor: "#666666",
    rollOverColor: "#9EC2F7",
    rollOverOutlineColor: "#000000"
  },

});
$(".ammapDescriptionWindow").show

/* map.addListener("clickMapObject", function(event){
    alert(event.mapObject.title) 
 });*/
function zamijena(e) {
  if($(e).children("span").text()=="+"){$(e).children("span").text("‒")}
  else{$(e).children("span").text("+")}
}

function hamburger(x) {
  x.classList.toggle("change");
}



$(document).ready(function () {

  $('#hambi').load("meni.html");
  
  // Portfolio hover color change using ANIMATE method with plug-in script on index.html
  $("#portfolioItem").hover(function () {
    $("#portfolio").animate({ backgroundColor: "hsla(360, 100%, 100%, 0.33)" }, "slow");
  }, function () {
    $("#portfolio").animate({ backgroundColor: "hsla(360, 100%, 100%, 0);" }, "slow");
    console.log("hovered Portfolio");
  });

  // Codepen hover color change using ANIMATE method with plug-in script on index.html
  $("#codeItem").hover(function () {
    $("#codepen").animate({ backgroundColor: "hsla(360, 100%, 100%, 0.33)" }, "slow");
  }, function () {
    $("#codepen").animate({ backgroundColor: "hsla(360, 100%, 100%, 0);" }, "slow");
    console.log("hovered Codepen");
  });

  // nav hover color change using CSS method
  $("nav ul li a").hover(function () {
    $(this).css({ "background-color": "white", "color": "hsla(11, 100%, 4%, 1)", "font-weight": "bold" });
  }, function () {
    $(this).css({ "background-color": "hsla(11, 100%, 4%, 1)", "font-weight": "normal" });
    console.log("nav hover");
  });

  // .hamburger hover color change
  $(".hamburger, .homepageHamburger").hover(function () {
    $(this).css({ "font-weight": "bold", "border-color": "hsla(11, 100%, 4%, 1)" });
  }, function () {
    $(this).css({ "background-color": "hsla(360, 100%, 100%, 0)", "font-weight": "normal", "border-color": "white" });
  });

  // hamburger dropdown toggle
  var hamburgerToggle = 0;
  $(".hamburger, .homepageHamburger").click(function () {
    if (hamburgerToggle == 0) {
      $("nav").animate({ width: "250px" }, 500);
      hamburgerToggle = 1;
    } else if (hamburgerToggle == 1) {
      $("nav").animate({ width: "0" }, 500);
      hamburgerToggle = 0;
    };
  });

  // box-shadow: inset 0 0 20px hsla(11, 100%, 4%, 1);
  $(".shopItem").hover(function () {
    $(this).find("a").toggleClass("shopItemToggled");
    console.log("shopItem box-shadow, toggleClass");
  });
  $(".shopItem a").click(function () {
    event.preventDefault();
    console.log("shopItem clicked");
  });

  // toggle page
  var hrefFull;
  var hrefName;

  $("nav ul li a").click(function (event) {
    event.preventDefault();
    hrefFull = event.target.href;
    hrefName = hrefFull.substr(hrefFull.indexOf("#") + 0);
    console.log(hrefName);

    // hide nav
    $("nav").animate({ width: "0" }, 500);
    hamburgerToggle = 0;

    //show page/div clicked
    $(hrefName).fadeIn(2000);
  }); // end toggle page

}); //close document.ready