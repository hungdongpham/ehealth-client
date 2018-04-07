//Sumary data for 64 provinces
var summaryData = [];
//Meta info
var metaInfo = {};
//Province info
var provinceData = {};
var gmarkers = [];

const GENERAL = "general";
const SYNDROME = "syndrome";
const PATHOGEN = "pathogen";
const INFINITE = 9999999;
const BLANK = "blank";
const ALL = "all";
const HEATMAP = "heatmap";
const MARKERS = "markers";

// web service
const  WSURL = config.WSURL;
// const WSURL = "https://ddmapws.localtunnel.me/"

var curMode = null;
var selSyndrome = null;
var selPathogen = null;
var selProvince = null;

var selProvinceId = null;
var selTypeMap = HEATMAP;
var host = null;

var generalColors = [
  { color: "#dbdbdb", min: 0, max: 0 },
  { color: "#00D600", min: 1, max: 50 },
  { color: "#00AD00", min: 51, max: 500 },
  { color: "#008400", min: 501, max: 1000 },
  { color: "#005C00", min: 1001, max: INFINITE }
];
var syndromeColors = [
  { color: "#dbdbdb", min: 0, max: 0 },
  { color: "#078ca3", min: 1, max: 50 },
  { color: "#06788c", min: 51, max: 500 },
  { color: "#04505d", min: 501, max: 1000 },
  { color: "#02282e", min: 1001, max: INFINITE }
];
var pathogenColors = [
  { color: "#dbdbdb", min: 0, max: 0 },
  { color: "#bb2308", min: 1, max: 50 },
  { color: "#a31e07", min: 51, max: 500 },
  { color: "#751605", min: 501, max: 1000 },
  { color: "#460d03", min: 1001, max: INFINITE }
];
var map, heatmap;

var src = config.baseURL + "images/provincesenglish.geojson";

var PATHOGENS = {
  Adenovirus: "Adenovirus",
  Aichivirus: "Aichivirus",
  Astrovirus: "Astrovirus",
  Bocavirus: "Bocavirus",
  Brucella: "Brucella",
  Chikungunya: "Chikungunya",
  Coronavirus1_2: "Coronavirus 1-2",
  Enterovirus: "Enterovirus",
  Flu_A: "Flu A",
  Flu_B: "Flu B",
  H_influenzae_typeB: "H. influenzae type B",
  Hepatitis_A: "Hepatitis A (ELISA)",
  Hepatitis_B: "Hepatitis B",
  Hepatitis_C: "Hepatitis C",
  Hepatitis_D: "Hepatitis D",
  Hepatitis_E: "Hepatitis E (ELISA)",
  Herpes_simplex_virus: "Herpes simplex virus",
  JEV: "JEV",
  Leptospira: "Leptospira",
  Leptospirosis: "Leptospirosis (PCR)",
  Metapneumovirus: "Metapneumovirus",
  MurineTyphus: "Murine Typhus (PCR)",
  N_meningitis: "N. meningitis",
  Norovirus_1: "Norovirus-1",
  Norovirus_2: "Norovirus-2",
  Orientia_tsutsugamushi: "Orientia tsutsugamushi",
  Para_influenza_virus_1: "Para influenza virus 1",
  Para_influenza_virus_2: "Para influenza virus 2",
  Para_influenza_virus_3: "Para influenza virus 3",
  Para_influenza_virus_4: "Para influenza virus 4",
  Parechovirus: "Parechovirus",
  Plasmodium: "Plasmodium",
  RSV: "RSV",
  Rhinovirus: "Rhinovirus",
  Rickettsia_spp: "Rickettsia spp",
  Rickettsia_typhi: "Rickettsia typhi",
  Rotavirus: "Rotavirus",
  S_pneumonia: "S. pneumonia",
  S_suis: "S. suis",
  Sapovirus: "Sapovirus",
  Scrub_Typhus: "Scrub Typhus (PCR)",
  VaricellaZostervirus: "Varicella Zoster virus",
  Zikavirus: "Zika virus"
};

var getUrlMarker = function(Pathogen) {
  if (Pathogen) {
    var mapping = {};
    mapping[PATHOGENS.Adenovirus] = { url: '/images/markers/MapMarker_Ball_Right_Azure.png' };
    mapping[PATHOGENS.Aichivirus] = { url: '/images/markers/MapMarker_Ball_Right_Black.png' };
    mapping[PATHOGENS.Astrovirus] = { url: '/images/markers/MapMarker_Ball_Right_Blue.png' };
    mapping[PATHOGENS.Bocavirus] = { url: '/images/markers/MapMarker_Ball_Right_Chartreuse.png' };
    mapping[PATHOGENS.Brucella] = { url: '/images/markers/MapMarker_Ball_Right_Green.png' };
    mapping[PATHOGENS.Chikungunya] = { url: '/images/markers/MapMarker_Ball_Right_Grey.png' };
    mapping[PATHOGENS.Coronavirus1_2] = { url: '/images/markers/MapMarker_Ball_Right_Orange.png' };
    mapping[PATHOGENS.Enterovirus] = { url: '/images/markers/MapMarker_Ball_Right_Pink.png' };
    mapping[PATHOGENS.Flu_A] = { url: '/images/markers/MapMarker_Ball_Right_Red.png' };
    mapping[PATHOGENS.Flu_B] = { url: '/images/markers/MapMarker_Ball_Right_Violet.png' };
    mapping[PATHOGENS.H_influenzae_typeB] = { url: '/images/markers/MapMarker_PushPin_Left_Violet.png' };
    mapping[PATHOGENS.Hepatitis_A] = { url: '/images/markers/MapMarker_Ball_Right_Yellow.png' };
    mapping[PATHOGENS.Hepatitis_B] = { url: '/images/markers/MapMarker_Flag1_Right_Azure.png' };
    mapping[PATHOGENS.Hepatitis_C] = { url: '/images/markers/MapMarker_Flag1_Right_Blue.png' };
    mapping[PATHOGENS.Hepatitis_D] = { url: '/images/markers/MapMarker_Flag1_Right_Chartreuse.png' };
    mapping[PATHOGENS.Hepatitis_E] = { url: '/images/markers/MapMarker_Flag1_Right_Green.png' };
    mapping[PATHOGENS.Herpes_simplex_virus] = { url: '/images/markers/MapMarker_Flag1_Right_Grey.png' };
    mapping[PATHOGENS.JEV] = { url: '/images/markers/MapMarker_Flag1_Right_Orange.png' };
    mapping[PATHOGENS.Leptospira] = { url: '/images/markers/MapMarker_Flag1_Right_Pink.png' };
    mapping[PATHOGENS.Leptospirosis] = { url: '/images/markers/MapMarker_Flag1_Right_Red.png' };
    mapping[PATHOGENS.Metapneumovirus] = { url: '/images/markers/MapMarker_Flag1_Right_Violet.png' };
    mapping[PATHOGENS.MurineTyphus] = { url: '/images/markers/MapMarker_PushPin_Left_Yellow.png' };
    mapping[PATHOGENS.N_meningitis] = { url: '/images/markers/MapMarker_Flag1_Right_Yellow.png' };
    mapping[PATHOGENS.Norovirus_1] = { url: '/images/markers/MapMarker_Flag4_Left_Azure.png' };
    mapping[PATHOGENS.Norovirus_2] = { url: '/images/markers/MapMarker_Flag4_Left_Black.png' };
    mapping[PATHOGENS.Orientia_tsutsugamushi] = { url: '/images/markers/MapMarker_Flag4_Left_Blue.png' };
    mapping[PATHOGENS.Para_influenza_virus_1] = { url: '/images/markers/MapMarker_Flag4_Left_Chartreuse.png' };
    mapping[PATHOGENS.Para_influenza_virus_2] = { url: '/images/markers/MapMarker_Flag4_Left_Green.png' };
    mapping[PATHOGENS.Para_influenza_virus_3] = { url: '/images/markers/MapMarker_Flag4_Left_Grey.png' };
    mapping[PATHOGENS.Para_influenza_virus_4] = { url: '/images/markers/MapMarker_Flag4_Left_Orange.png' };
    mapping[PATHOGENS.Parechovirus] = { url: '/images/markers/MapMarker_Flag4_Left_Pink.png' };
    mapping[PATHOGENS.Plasmodium] = { url: '/images/markers/MapMarker_Flag4_Left_Red.png' };
    mapping[PATHOGENS.RSV] = { url: '/images/markers/MapMarker_Flag4_Left_White.png' };
    mapping[PATHOGENS.Rhinovirus] = { url: '/images/markers/MapMarker_Flag4_Left_Yellow.png' };
    mapping[PATHOGENS.Rickettsia_spp] = { url: '/images/markers/MapMarker_PushPin_Left_Azure.png' };
    mapping[PATHOGENS.Rickettsia_typhi] = { url: '/images/markers/MapMarker_PushPin_Left_Black.png' };
    mapping[PATHOGENS.Rotavirus] = { url: '/images/markers/MapMarker_PushPin_Left_Blue.png' };
    mapping[PATHOGENS.S_pneumonia] = { url: '/images/markers/MapMarker_PushPin_Left_Chartreuse.png' };
    mapping[PATHOGENS.S_suis] = { url: '/images/markers/MapMarker_PushPin_Left_Green.png' };
    mapping[PATHOGENS.Sapovirus] = { url: '/images/markers/MapMarker_PushPin_Left_Grey.png' };
    mapping[PATHOGENS.Scrub_Typhus] = { url: '/images/markers/MapMarker_PushPin_Left_Orange.png' };
    mapping[PATHOGENS.VaricellaZostervirus] = { url: '/images/markers/MapMarker_PushPin_Left_Pink.png' };
    mapping[PATHOGENS.Zikavirus] = { url: '/images/markers/MapMarker_PushPin_Left_Red.png' };

    return mapping[Pathogen];
  }
  return null;
};

function createPolygon(province, id) {
  google.maps.event.addListener(province, "mouseover", function() {
    this.setOptions({
      fillOpacity: 1
    });
  });
  google.maps.event.addListener(province, "mouseout", function() {
    this.setOptions({
      fillOpacity: 0.4
    });
  });
  google.maps.event.addListener(province, "click", function() {
    //Set value of a province
    $(".province-name").text(this.data[0]);
    $(".sum-sample").text(this.data[1]);
    $(".rotavirus-num").text(this.data[4]);
    $(".norovirus-2-num").text(this.data[5]);
    $(".norovirus-1-num").text(this.data[6]);
    $(".aichivirus-num").text(this.data[7]);
    $(".adenovirus-num").text(this.data[8]);
    $(".sapovirus-num").text(this.data[9]);
    $(".astrovirus-num").text(this.data[10]);

    $(".ul-info").show();
  });
}

function getColorFromSampleCount(sampleCount, type) {
  var color = "gray";
  var colors = [];

  switch (type) {
    case SYNDROME:
      colors = syndromeColors;
      break;
    case PATHOGEN:
      colors = pathogenColors;
      break;
    case GENERAL:
      colors = generalColors;
      break;
  }

  $.each(colors, function(i, item) {
    if (sampleCount >= item.min && sampleCount <= item.max) {
      return (color = item.color);
    }
  });

  return color;
}

function removeColorsTable(type) {
  var ulName = null;
  switch (type) {
    case SYNDROME:
      ulName = ".syndrome-colors";
      break;
    case PATHOGEN:
      ulName = ".pathogen-colors";
      break;
    case GENERAL:
      ulName = ".general-colors";
      break;
  }

  $(ulName).empty();
}

function generateColorsTable(type) {
  var colorsTable = [];
  var ulName = null;
  var label = type + " annotation";
  switch (type) {
    case SYNDROME:
      colorsTable = syndromeColors;
      ulName = ".syndrome-colors";
      break;
    case PATHOGEN:
      colorsTable = pathogenColors;
      ulName = ".pathogen-colors";
      break;
    case GENERAL:
      colorsTable = generalColors;
      ulName = ".general-colors";
      break;
  }

  $(ulName).empty();
  $(ulName).prepend(
    '<span class="' +
      type +
      "-annotation-label annotation-label" +
      '">' +
      label +
      "</span"
  );
  $.each(colorsTable, function(i, item) {
    if (i == 0) {
      $(ulName).append(
        '<li><div class="map-gradient" style="background-color:' +
          item.color +
          '"></div>' +
          item.min +
          "</li>"
      );
    } else if (i == colorsTable.length - 1) {
      $(ulName).append(
        '<li><div class="map-gradient" style="background-color:' +
          item.color +
          '"></div>' +
          item.min +
          " - " +
          " ∞ " +
          "</li>"
      );
    } else {
      $(ulName).append(
        '<li><div class="map-gradient" style="background-color:' +
          item.color +
          '"></div>' +
          item.min +
          " - " +
          item.max +
          "</li>"
      );
    }
  });
}

function initMap() {
  google.maps.visualRefresh = true;
  var isMobile =
    navigator.userAgent.toLowerCase().indexOf("android") > -1 ||
    navigator.userAgent.match(
      /(iPod|iPhone|iPad|BlackBerry|Windows Phone|iemobile)/
    );
  if (isMobile) {
    var viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute("content", "initial-scale=1.0, user-scalable=no");
  }
  var myOptions = {
    center: new google.maps.LatLng(14.858021513748703, 110.05196343994135),
    zoom: 5,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var mapDiv = document.getElementById("googft-mapCanvas");
  mapDiv.style.width = isMobile ? "100%" : "100%";
  mapDiv.style.height = isMobile ? "100%" : "500px";
  map = new google.maps.Map(
    document.getElementById("googft-mapCanvas"),
    myOptions
  );

  map.data.loadGeoJson(src);

  loadInitialMapBG();
  //Load heatmap for the province
  curMode = GENERAL;

  $(".province-combobox").val(provinceData.name);
  loadDetailmap(GENERAL);
  showInfo(provinceData);
}

function setMarkers(arrayPoints) {
  // Adds markers to the map.
  // Shapes define the clickable region of the icon. The type defines an HTML
  // <area> element 'poly' which traces out a polygon as a series of X,Y points.
  // The final coordinate closes the poly by connecting to the first coordinate.
  var shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: "poly"
  };
  for (var i = 0; i < arrayPoints.length; i++) {
    var patient = arrayPoints[i];

    var urlMarker = host + getUrlMarker(patient.pathogen).url;
    
    var image = {
      url: urlMarker,
        //"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(32, 32),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(32, 32)
    };

    var marker = new google.maps.Marker({
      position: patient.position,
      map: map,
      icon: image,
      shape: shape,
      title: patient.title
      //zIndex: beach[3]
    });
    gmarkers.push(marker);
  }
}

function removeMarkers() {
  for (i = 0; i < gmarkers.length; i++) {
    gmarkers[i].setMap(null);
  }
}

function loadDetailmap(type) {
  //Clear heatmap and markers
  if (heatmap) {
    heatmap.setMap(null);
  }
  removeMarkers();

  var arrayPoints = [];
  if (selTypeMap == HEATMAP) {
    arrayPoints = getPointsByType(type);

    heatmap = new google.maps.visualization.HeatmapLayer({
      data: arrayPoints,
      map: map
    });

    heatmap.set("opacity", 0.8);
    heatmap.set("radius", 15);

    if (arrayPoints.length != 0) {
      moveToLocation(arrayPoints[0]);
    }

    map.setZoom(8);
  } else {
    arrayPoints = getPointsByType(type, true);
    setMarkers(arrayPoints);
  }
}

function moveToLocation(point) {
  // using global variable:
  map.panTo(point);
}

function getPointsByType(type, forMarkers) {
  var result = [];

  if (type == GENERAL) {
    $.each(provinceData.syndromes, function(i, syndrome) {
      $.each(syndrome.pathogens, function(j, pathogen) {
        $.each(pathogen.patients, function(k, patient) {
          if (forMarkers) {
            result.push({
              position: { lat: patient.latitude, lng: patient.longitude },
              title: patient.code,
              pathogen: pathogen.name
            });
          } else {
            result.push(
              new google.maps.LatLng(patient.latitude, patient.longitude)
            );
          }
        });
      });
    });
  }

  if (type == SYNDROME) {
    $.each(provinceData.syndromes, function(i, syndrome) {
      if (syndrome.name == selSyndrome) {
        $.each(syndrome.pathogens, function(j, pathogen) {
          $.each(pathogen.patients, function(k, patient) {
            if (forMarkers) {
              result.push({
                position: { lat: patient.latitude, lng: patient.longitude },
                title: patient.code,
                pathogen: pathogen.name
              });
            } else {
              result.push(
                new google.maps.LatLng(patient.latitude, patient.longitude)
              );
            }
          });
        });
      }
    });
  }

  if (type == PATHOGEN) {
    $.each(provinceData.syndromes, function(i, syndrome) {
      if (syndrome.name == selSyndrome) {
        $.each(syndrome.pathogens, function(j, pathogen) {
          if (pathogen.name == selPathogen) {
            $.each(pathogen.patients, function(k, patient) {
              if (forMarkers) {
                result.push({
                  position: { lat: patient.latitude, lng: patient.longitude },
                  title: patient.code,
                  pathogen: pathogen.name
                });
              } else {
                result.push(
                  new google.maps.LatLng(patient.latitude, patient.longitude)
                );
              }
            });
          }
        });
      }
    });
  }

  return result;
}

function showInfo(data) {
  $(".info-wrapper").empty();

  var temp = '<div class="info-area"></div>';

  if (data && data.count != 0) {
    //Append count of samples
    temp = $(temp).append(
      '<div class="sum-info"><span class="glyphicon glyphicon-briefcase"></span> Sum of Samples: <span class="sum-sample"><b>' +
        data.count +
        "</b></span></div>"
    );

    var details = '<div class="info-details"></div>';
    if (curMode == GENERAL) {
      $.each(data.syndromes, function(i, syndrome) {
        var syndromeList = createSyndromeInfo(syndrome);
        details = $(details).append(syndromeList);
      });
    }

    if (curMode == SYNDROME) {
      var syndromeTemp = createSyndromeInfo(data);
      details = $(details).append(syndromeTemp);
    }

    if (curMode == PATHOGEN) {
      // var pathogenTemp = createPathogenInfo(data);
      // details =  $(pathogenTemp).append(syndromeTemp);
      var syndromeTemp = createSyndromeInfo(data);
      details = $(details).append(syndromeTemp);
    }

    temp = $(temp).append(details);
  } else {
    temp = createNoInfo();
  }

  $(".info-wrapper").append(temp);
}

function createNoInfo() {
  return (
    '<div class="panel panel-default panel-no-info"><div class="panel-heading">' +
    "Info" +
    '</div><div class="panel-body">' +
    "No data to display." +
    "</div></div>"
  );
}

function createSyndromeInfo(syndrome) {
  var syndromeList = '<div class="panel panel-info"></div>';
  syndromeList = $(syndromeList).append(
    '<div class="panel-heading">' +
      syndrome.name +
      '<span class="badge badge-default badge-pill rotavirus-num">' +
      syndrome.count +
      "</span></div>"
  );

  var pathogenArr = "";
  $.each(syndrome.pathogens, function(j, pathogen) {
    var onePathogen = createPathogenInfo(pathogen);

    pathogenArr = pathogenArr + onePathogen;
  });

  syndromeList = $(syndromeList).append(
    '<div class="panel-body"><ul class="list-group">' +
      pathogenArr +
      "</ul></div>"
  );

  return syndromeList;
}

function createPathogenInfo(pathogen) {
  var onePathogen =
    '<li class="list-group-item list-group-item-danger">' +
     '<img width=25 height=25 class="img-markers" src="' + host + getUrlMarker(pathogen.name).url + '" />'+
    pathogen.name +
    '<span class="badge badge-default badge-pill rotavirus-num">' +
    pathogen.count +
    "</span></li>";

  return onePathogen;
}

function loadInitialMapBG() {
  map.data.setStyle(function(feature) {
    var color = "gray";
    var border = "gray";
    var strokeBorder = 1;

    //Highlight selected province
    if (feature.getProperty("Name") == provinceData.name) {
      border = "green";
      strokeBorder = 3;
      color = generalColors[0].color;
    }

    return {
      strokeColor: border,
      fillColor: color,
      fillOpacity: 0.4,
      strokeWeight: strokeBorder
    };
  });
}

function refreshMap(syndromeName, pathogenName) {
  // Color each letter green. Change the color when the isSelected property
  // is set to true.
  map.data.setStyle(function(feature) {
    var color = generalColors[0].color;
    if (syndromeName) {
      if (pathogenName) {
        color = pathogenColors[0].color;
      } else {
        color = syndromeColors[0].color;
      }
    }
    var border = "gray";
    var strokeBorder = 1;
    var data = null;

    $.each(summaryData, function(i, province) {
      if (feature.getProperty("Name") == province.name) {
        if (!syndromeName && !pathogenName) {
          //For general be selected
          data = province;
          color = getColorFromSampleCount(province.count, GENERAL);
        } else {
          $.each(province.syndromes, function(i, syndrome) {
            if (syndrome.name == syndromeName) {
              //For syndrome be selected
              data = syndrome;
              color = getColorFromSampleCount(syndrome.count, SYNDROME);

              $.each(syndrome.pathogens, function(i, pathogen) {
                if (pathogen.name == pathogenName) {
                  //For pathogen be selected
                  //data = pathogen;
                  color = getColorFromSampleCount(pathogen.count, PATHOGEN);
                }
              });
            }
          });
        }
      }
    });

    feature.setProperty("data", data);

    if (feature.getProperty("isSelected")) {
      color = "mediumblue";
      strokeBorder = 4;
    }

    return {
      strokeColor: border,
      fillColor: color,
      fillOpacity: 0.4,
      strokeWeight: strokeBorder
    };
  });
}

function getMetaInfo() {
  var dfd = $.Deferred();
  $.ajax({
    url: WSURL + "meta",
    data: {
      format: "json"
    },
    dataType: "json",
    error: function(error) {
      console.log(error);
    },
    success: function(data) {
      metaInfo = data;

      $(".syndrome-selection").append(
        '<input type="radio" name="syndrome" checked="checked" value="' +
          ALL +
          '">' +
          "All" +
          "<br>"
      );
      $.each(data.syndromes, function(i, item) {
        $(".syndrome-selection").append(
          '<input type="radio" name="syndrome" value="' +
            item.name +
            '">' +
            item.name +
            "<br>"
        );
      });

      $(".province-combobox").append(
        '<option value="blank">----------</option>'
      );
      $.each(data.cities, function(i, item) {
        $(".province-combobox").append(
          '<option value="' + item.name + '">' + item.name + "</option>"
        );
      });

      $(".maptype-combobox").append(
        '<option value="' +
          HEATMAP +
          '">Heat map</option>' +
          '<option value="' +
          MARKERS +
          '">Markers</option>'
      );

      $("input[type=radio][name=syndrome]").change(function() {
        //get pathogens for combobox
        var syndromeName = this.value;
        var pathogens = [];
        $.each(metaInfo.syndromes, function(i, syndrome) {
          if (syndrome.name == syndromeName) {
            pathogens = syndrome.pathogens;
          }
        });

        $(".pathogen-combobox").empty();
        $(".pathogen-combobox").append(
          '<option value="blank">----------</option>'
        );
        $.each(pathogens, function(i, pathogen) {
          $(".pathogen-combobox").append(
            '<option value="' +
              pathogen.name +
              '">' +
              pathogen.name +
              "</option>"
          );
        });

        if (syndromeName == ALL) {
          //update the map with general info
          selSyndrome = null;
          selPathogen = null;

          curMode = GENERAL;
          loadDetailmap(curMode);
          //Show all info of the province
          showInfo(provinceData);
        } else {
          //update the map following syndrome
          selSyndrome = syndromeName;
          selPathogen = null;

          curMode = SYNDROME;
          loadDetailmap(curMode);

          //get syndrome which is selected of the province
          var selectedSyndrome = getSelSyndromeInfo(syndromeName);
          showInfo(selectedSyndrome);
        }
      });

      dfd.resolve();
    },
    type: "GET"
  });
  return dfd.promise();
}

function getSelSyndromeInfo(syndromeName) {
  var selectedSyndrome = null;
  $.each(provinceData.syndromes, function(i, syndrome) {
    if (syndrome.name == syndromeName) {
      selectedSyndrome = syndrome;
    }
  });

  return selectedSyndrome;
}

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
      selProvinceId = getUrlParameter("pr");
      $.when(getMetaInfo(), getDataByProvince(selProvinceId)).then(function() {
        initMap();
      });
    },
    type: "GET"
  });
}

function getDataByProvince(Id) {
  var dfd = $.Deferred();

  $.ajax({
    url: WSURL + "detail?city=" + Id,
    data: {
      format: "json"
    },
    dataType: "json",
    error: function(error) {
      console.log(error);
    },
    success: function(data) {
      provinceData = data;
      dfd.resolve();
    },
    type: "GET"
  });

  return dfd.promise();
}

function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
}

$(document).ready(function() {
  //Get current host
  var url = window.location.href
  var arr = url.split("/");
  host = arr[0] + "//" + arr[2];

  $(".import-btn").on("click", function() {
    $("#myModal").modal("show");
  });

  $(".pathogen-combobox").change(function() {
    var pathogenName = $(this).val();
    if (pathogenName == BLANK) {
      selPathogen = null;

      curMode = SYNDROME;
      loadDetailmap(curMode);

      //get syndrome which is selected of the province
      var selectedSyndrome = getSelSyndromeInfo(syndromeName);
      showInfo(selectedSyndrome);
    } else {
      selPathogen = pathogenName;

      curMode = PATHOGEN;
      loadDetailmap(curMode);

      //get syndrome which is selected of the province
      var selectedSyndrome = getSelSyndromeInfo(syndromeName);
      showInfo(selectedSyndrome);
    }
  });

  $(".province-combobox").change(function() {
    $.each(metaInfo.cities, function(i, item) {
      if (item.name == $(".province-combobox").val()) {
        window.location.href = "/detail?pr=" + item.id;
        flag = true;
      }
    });
  });

  $(".maptype-combobox").change(function() {
    selTypeMap = $(".maptype-combobox").val();

    loadDetailmap(curMode);
    if (curMode == GENERAL) {
      showInfo(provinceData);
    } else {
      var selectedSyndrome = getSelSyndromeInfo(syndromeName);
      showInfo(selectedSyndrome);
    }
  });
});
