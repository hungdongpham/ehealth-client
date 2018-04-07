function fireInTheHole(e) {
  e.preventDefault();
  console.log("Boom Boom Boom");
  $.ajax({
    url: "http://localhost:4000/medical_record",
    data: {
      format: "json"
    },
    dataType: "json",
    error: function(error) {
      console.log(error);
    },
    success: function(data) {
      summaryData = data;
      getMetaInfo().then(function() {
        initMap();
      });
    },
    type: "GET"
  });
}













// //Sumary data for 64 provinces
// var summaryData = [];
// //Meta info
// var metaInfo = {};

// const GENERAL = "general";
// const SYNDROME = "syndrome";
// const PATHOGEN = "pathogen";
// const INFINITE = 9999999;
// const BLANK = "blank";
// const ALL = "all";

// // web service
// const WSURL = config.WSURL;
// // const WSURL = "https://ddmapws.localtunnel.me/"

// var curMode = null;
// var selSyndrome = null;
// var selPathogen = null;
// var selProvince = null;

// var src = config.baseURL + "images/provincesenglish.geojson";

// var generalColors = [
//   { color: "#dbdbdb", min: 0, max: 0 },
//   { color: "#00D600", min: 1, max: 50 },
//   { color: "#00AD00", min: 51, max: 500 },
//   { color: "#008400", min: 501, max: 1000 },
//   { color: "#005C00", min: 1001, max: INFINITE }
// ];
// var syndromeColors = [
//   { color: "#dbdbdb", min: 0, max: 0 },
//   { color: "#078ca3", min: 1, max: 50 },
//   { color: "#06788c", min: 51, max: 500 },
//   { color: "#04505d", min: 501, max: 1000 },
//   { color: "#02282e", min: 1001, max: INFINITE }
// ];
// var pathogenColors = [
//   { color: "#dbdbdb", min: 0, max: 0 },
//   { color: "#bb2308", min: 1, max: 50 },
//   { color: "#a31e07", min: 51, max: 500 },
//   { color: "#751605", min: 501, max: 1000 },
//   { color: "#460d03", min: 1001, max: INFINITE }
// ];
// var map;



// function createPolygon(province, id) {
//   google.maps.event.addListener(province, "mouseover", function() {
//     this.setOptions({
//       fillOpacity: 1
//     });
//   });
//   google.maps.event.addListener(province, "mouseout", function() {
//     this.setOptions({
//       fillOpacity: 0.4
//     });
//   });
//   google.maps.event.addListener(province, "click", function() {
//     //Set value of a province
//     $(".province-name").text(this.data[0]);
//     $(".sum-sample").text(this.data[1]);
//     $(".rotavirus-num").text(this.data[4]);
//     $(".norovirus-2-num").text(this.data[5]);
//     $(".norovirus-1-num").text(this.data[6]);
//     $(".aichivirus-num").text(this.data[7]);
//     $(".adenovirus-num").text(this.data[8]);
//     $(".sapovirus-num").text(this.data[9]);
//     $(".astrovirus-num").text(this.data[10]);

//     $(".ul-info").show();
//   });
// }

// function getColorFromSampleCount(sampleCount, type) {
//   var color = "gray";
//   var colors = [];

//   switch (type) {
//     case SYNDROME:
//       colors = syndromeColors;
//       break;
//     case PATHOGEN:
//       colors = pathogenColors;
//       break;
//     case GENERAL:
//       colors = generalColors;
//       break;
//   }

//   $.each(colors, function(i, item) {
//     if (sampleCount >= item.min && sampleCount <= item.max) {
//       return (color = item.color);
//     }
//   });

//   return color;
// }

// function removeColorsTable(type) {
//   var ulName = null;
//   switch (type) {
//     case SYNDROME:
//       ulName = ".syndrome-colors";
//       break;
//     case PATHOGEN:
//       ulName = ".pathogen-colors";
//       break;
//     case GENERAL:
//       ulName = ".general-colors";
//       break;
//   }

//   $(ulName).empty();
// }

// function generateColorsTable(type) {
//   var colorsTable = [];
//   var ulName = null;
//   var label = type + " annotation";
//   switch (type) {
//     case SYNDROME:
//       colorsTable = syndromeColors;
//       ulName = ".syndrome-colors";
//       break;
//     case PATHOGEN:
//       colorsTable = pathogenColors;
//       ulName = ".pathogen-colors";
//       break;
//     case GENERAL:
//       colorsTable = generalColors;
//       ulName = ".general-colors";
//       break;
//   }

//   $(ulName).empty();
//   $(ulName).prepend(
//     '<span class="' +
//       type +
//       "-annotation-label annotation-label" +
//       '">' +
//       label +
//       "</span"
//   );
//   $.each(colorsTable, function(i, item) {
//     if (i == 0) {
//       $(ulName).append(
//         '<li><div class="map-gradient" style="background-color:' +
//           item.color +
//           '"></div>' +
//           item.min +
//           "</li>"
//       );
//     } else if (i == colorsTable.length - 1) {
//       $(ulName).append(
//         '<li><div class="map-gradient" style="background-color:' +
//           item.color +
//           '"></div>' +
//           item.min +
//           " - " +
//           " ∞ " +
//           "</li>"
//       );
//     } else {
//       $(ulName).append(
//         '<li><div class="map-gradient" style="background-color:' +
//           item.color +
//           '"></div>' +
//           item.min +
//           " - " +
//           item.max +
//           "</li>"
//       );
//     }
//   });
// }


// function initMap() {
//   google.maps.visualRefresh = true;
//   var isMobile =
//     navigator.userAgent.toLowerCase().indexOf("android") > -1 ||
//     navigator.userAgent.match(
//       /(iPod|iPhone|iPad|BlackBerry|Windows Phone|iemobile)/
//     );
//   if (isMobile) {
//     var viewport = document.querySelector("meta[name=viewport]");
//     viewport.setAttribute("content", "initial-scale=1.0, user-scalable=no");
//   }
//   var myOptions = {
//     center: new google.maps.LatLng(14.858021513748703, 110.05196343994135),
//     zoom: 5,
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//   };

//   var mapDiv = document.getElementById("googft-mapCanvas");
//   mapDiv.style.width = isMobile ? "100%" : "100%";
//   mapDiv.style.height = isMobile ? "100%" : "500px";
//   map = new google.maps.Map(
//     document.getElementById("googft-mapCanvas"),
//     myOptions
//   );

//   map.data.loadGeoJson(src);

//   refreshMap();
//   generateColorsTable(GENERAL);
//   curMode = GENERAL;

//   // When the user clicks, set 'isSelected', changing the color of the letters.
//   map.data.addListener("click", function(event) {
//     // feature = each node in geoJson
//     map.data.forEach(function(feature) {
//       feature.setProperty("isSelected", false);
//     });

//     event.feature.setProperty("isSelected", true);

//     //Set combobox with selected province
//     $(".province-combobox").val(event.feature.getProperty("Name"));

//     showInfo(
//       event.feature.getProperty("data"),
//       event.feature.getProperty("ID")
//     );
//   });

//   // When the user hovers, tempt them to click by outlining the letters.
//   // Call revertStyle() to remove all overrides. This will use the style rules
//   // defined in the function passed to setStyle()
//   map.data.addListener("mouseover", function(event) {
//     map.data.revertStyle();
//     map.data.overrideStyle(event.feature, {
//       strokeWeight: 3
//     });
//   });

//   map.data.addListener("mouseout", function(event) {
//     map.data.revertStyle();
//   });
// }

// function showInfo(data, proID) {
//   $(".info-wrapper").empty();

//   var temp = '<div class="info-area"></div>';

//   if (data && data.count != 0) {
//     //Append count of samples
//     temp = $(temp).append(
//       '<div class="sum-info"><span class="glyphicon glyphicon-briefcase"></span> Sum of Samples: <span class="sum-sample"><b>' +
//         data.count +
//         "</b></span></div>"
//     );

//     var details = '<div class="info-details"></div>';
//     if (curMode == GENERAL) {
//       $.each(data.syndromes, function(i, syndrome) {
//         var syndromeList = createSyndromeInfo(syndrome);
//         details = $(details).append(syndromeList);
//       });
//     }

//     if (curMode == SYNDROME) {
//       var syndromeTemp = createSyndromeInfo(data);
//       details = $(details).append(syndromeTemp);
//     }

//     if (curMode == PATHOGEN) {
//       // var pathogenTemp = createPathogenInfo(data);
//       // details =  $(pathogenTemp).append(syndromeTemp);
//       var syndromeTemp = createSyndromeInfo(data);
//       details = $(details).append(syndromeTemp);
//     }

//     temp = $(temp).append(details);

//     //Add the link to detail page
//     temp = $(temp).append(
//       '<a class="go-detail" href="/detail?pr=' +
//         proID +
//         '">View detail map <span class="glyphicon glyphicon-chevron-right"></span></a>'
//     );
//   } else {
//     temp = createNoInfo();
//   }

//   $(".info-wrapper").append(temp);
// }

// function createNoInfo() {
//   return (
//     '<div class="panel panel-default panel-no-info"><div class="panel-heading">' +
//     "Info" +
//     '</div><div class="panel-body">' +
//     "No data to display." +
//     "</div></div>"
//   );
// }

// function createSyndromeInfo(syndrome) {
//   var syndromeList = '<div class="panel panel-info"></div>';
//   syndromeList = $(syndromeList).append(
//     '<div class="panel-heading">' +
//       syndrome.name +
//       '<span class="badge badge-default badge-pill rotavirus-num">' +
//       syndrome.count +
//       "</span></div>"
//   );

//   var pathogenArr = "";
//   $.each(syndrome.pathogens, function(j, pathogen) {
//     var onePathogen = createPathogenInfo(pathogen);

//     pathogenArr = pathogenArr + onePathogen;
//   });

//   syndromeList = $(syndromeList).append(
//     '<div class="panel-body"><ul class="list-group">' +
//       pathogenArr +
//       "</ul></div>"
//   );

//   return syndromeList;
// }

// function createPathogenInfo(pathogen) {
//   var onePathogen =
//     '<li class="list-group-item list-group-item-danger">' +
//     pathogen.name +
//     '<span class="badge badge-default badge-pill rotavirus-num">' +
//     pathogen.count +
//     "</span></li>";

//   return onePathogen;
// }

// function refreshMap(syndromeName, pathogenName) {
//   // Color each letter green. Change the color when the isSelected property
//   // is set to true.
//   map.data.setStyle(function(feature) {
//     var color = generalColors[0].color;
//     if (syndromeName) {
//       if (pathogenName) {
//         color = pathogenColors[0].color;
//       } else {
//         color = syndromeColors[0].color;
//       }
//     }
//     var border = "gray";
//     var strokeBorder = 1;
//     var data = null;

//     $.each(summaryData, function(i, province) {
//       if (feature.getProperty("Name") == province.name) {
//         if (!syndromeName && !pathogenName) {
//           //For general be selected
//           data = province;
//           color = getColorFromSampleCount(province.count, GENERAL);
//         } else {
//           $.each(province.syndromes, function(i, syndrome) {
//             if (syndrome.name == syndromeName) {
//               //For syndrome be selected
//               data = syndrome;
//               color = getColorFromSampleCount(syndrome.count, SYNDROME);

//               $.each(syndrome.pathogens, function(i, pathogen) {
//                 if (pathogen.name == pathogenName) {
//                   //For pathogen be selected
//                   //data = pathogen;
//                   color = getColorFromSampleCount(pathogen.count, PATHOGEN);
//                 }
//               });
//             }
//           });
//         }
//       }
//     });

//     feature.setProperty("data", data);

//     if (feature.getProperty("isSelected")) {
//       color = "mediumblue";
//       strokeBorder = 4;
//     }

//     return {
//       strokeColor: border,
//       fillColor: color,
//       fillOpacity: 0.4,
//       strokeWeight: strokeBorder
//     };
//   });
// }


// function getMetaInfo() {
//   var dfd = $.Deferred();
//   $.ajax({
//     url: WSURL + "meta",
//     data: {
//       format: "json"
//     },
//     dataType: "json",
//     error: function(error) {
//       console.log(error);
//     },
//     success: function(data) {
//       metaInfo = data;

//       $(".syndrome-selection").append(
//         '<input type="radio" name="syndrome" checked="checked" value="' +
//           ALL +
//           '">' +
//           "All" +
//           "<br>"
//       );
//       $.each(data.syndromes, function(i, item) {
//         $(".syndrome-selection").append(
//           '<input type="radio" name="syndrome" value="' +
//             item.name +
//             '">' +
//             item.name +
//             "<br>"
//         );
//       });

//       $(".province-combobox").append(
//         '<option value="blank">----------</option>'
//       );
//       $.each(data.cities, function(i, item) {
//         $(".province-combobox").append(
//           '<option value="' + item.name + '">' + item.name + "</option>"
//         );
//       });
//       $("input[type=radio][name=syndrome]").change(function() {
//         //get pathogens for combobox
//         var syndromeName = this.value;
//         var pathogens = [];
//         $.each(metaInfo.syndromes, function(i, syndrome) {
//           if (syndrome.name == syndromeName) {
//             pathogens = syndrome.pathogens;
//           }
//         });

//         $(".pathogen-combobox").empty();
//         $(".pathogen-combobox").append(
//           '<option value="blank">----------</option>'
//         );
//         $.each(pathogens, function(i, pathogen) {
//           $(".pathogen-combobox").append(
//             '<option value="' +
//               pathogen.name +
//               '">' +
//               pathogen.name +
//               "</option>"
//           );
//         });

//         if (syndromeName == ALL) {
//           //update the map with general info
//           selSyndrome = null;
//           selPathogen = null;
//           refreshMap(selSyndrome, selPathogen);

//           //generate color table
//           generateColorsTable(GENERAL);
//           removeColorsTable(PATHOGEN);
//           removeColorsTable(SYNDROME);
//           curMode = GENERAL;
//         } else {
//           //update the map following syndrome
//           selSyndrome = syndromeName;
//           selPathogen = null;
//           refreshMap(selSyndrome, selPathogen);

//           //Generate color table
//           if (selSyndrome) {
//             removeColorsTable(GENERAL);
//           }
//           removeColorsTable(PATHOGEN);
//           generateColorsTable(SYNDROME);
//           curMode = SYNDROME;
//         }
//       });

//       dfd.resolve();
//     },
//     type: "GET"
//   });
//   return dfd.promise();
// }

function getSummaryData() {
  $.ajax({
    url: WSURL + "summary",
    data: {
      format: "json"
    },
    dataType: "json",
    error: function(error) {
      console.log(error);
    },
    success: function(data) {
      summaryData = data;
      getMetaInfo().then(function() {
        initMap();
      });
    },
    type: "GET"
  });
}


// $(document).ready(function() {
//   $(".import-btn").on("click", function() {
//     $("#myModal").modal("show");
//   });

//   $(".pathogen-combobox").change(function() {
//     var pathogenName = $(this).val();
//     if (pathogenName == BLANK) {
//       selPathogen = null;
//       removeColorsTable(PATHOGEN);
//       generateColorsTable(SYNDROME);
//       curMode = SYNDROME;
//     } else {
//       selPathogen = pathogenName;

//       //Load pathogen colors
//       generateColorsTable(PATHOGEN);
//       curMode = PATHOGEN;
//     }

//     //Load map
//     refreshMap(selSyndrome, selPathogen);
//   });

//   $(".province-combobox").change(function() {
//     map.data.forEach(function(feature) {
//       if (feature.getProperty("Name") == $(".province-combobox").val()) {
//         feature.setProperty("isSelected", true);
//         showInfo(feature.getProperty("data"), feature.getProperty("ID"));
//       } else {
//         feature.setProperty("isSelected", false);
//       }
//     });
//   });

// });
