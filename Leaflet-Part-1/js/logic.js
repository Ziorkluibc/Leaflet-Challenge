let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

//apikey = pk.eyJ1IjoiYXdvemlvcmtsdWkiLCJhIjoiY2x4aTloaXNnMWhyeTJrb2JiOXFpdWg2aiJ9.QPiD8GKbHr6LY-hNOiETAQ

let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

myMap = L.map("map", {
    center: [38.79, -122.80],
    zoom: 3,
    layres: [streetmap]
});

let baseMaps = {
    "streetmap": streetmap
};

let earthquakeData = new L.LayerGroup();
//let tectonics = new L.LayerGroup();

let overlays = {
    "earthquakes": earthquakeData,
   // "Tectonics Plates": tectonics 
};

L.control.layers(baseMaps, overlays).addTo(myMap);

function styleInfo(feature){
    return{
        color: chooseColor(feature.geometry.coordinates[2]),
        radius: chooseRadius(feature.properties.mag),
        fillColor: chooseColor(feature.geometry.coordinates[2])
    }
};

//d3.json(link).then(function(data){
    //console.log(data);
    //createFeatures(data.features);
//});



function chooseRadius(magnitude){
    return magnitude*5

};

function chooseColor(depth){
    if (depth <= 10) return "red";
    else if (depth > 10 & depth <= 30) return "orange";
    else if (depth > 30 & depth <= 50) return "orangered";
    else if (depth > 50 & depth <= 70) return "yellow";
    else if (depth > 70 & depth <= 90) return "greenyellow";
    else return "green";
    };


d3.json(url).then(function(data){
    L.geoJson(data, {
        pointToLayer: function(feature, latlon) {
            return L.circleMarker(latlon).bindPopup(feature.id);
        },
        style: styleInfo
    }).addTo(earthquakeData);
    earthquakeData.addTo(myMap);
    
});
    
function createFeatures(earthquakes) {
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr><p>Date:${new Data(feature.properties.time)}</p><p>Magnitude: ${feature.geometry.coordinates[2]}</p>`)
    }
}
    earthquakes = L.geoJson(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: function(feature, latlng) {
        markers = {
            radius: markerSize(feature.properties.magnitude),
            fillColor : chooseColor(feature.geometry.coordinates[2]),
            fillOpacity: 0.10,
            color: "black",
            stroke: true,
            weight : 0.5
        }
        return L.circle(latlng, markers);
    }
});


createMap(earthquake);


grayscale = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

baseMaps = {
    "grayscale Map":grayscale
}

overlayMaps = {
    Earthquakes: earthquakes
};


myMap = L.map("map",{
    center: [38.79, -122.80 ],
    zoom: 10,
    layres:[grayscale, earthquakes]
});

legend = L.control({position: "bottomright"});
legndonAdd = function() {
    div = L.DomUtil.create("div", "info legend"),
    depth = [-10, 10, 30, 50, 70, 90];
    div.innerHTML += "<h3 style = 'text-align: center'> Depth</h3>"

    for (i = 0; i<depth.lenght; i++) {
        div.innerHTML +=
        '<i style= "background:' + chooseColor(depth[i] +1) + '"></i>' + depth[i]+ (depth[i+1] ? "&dash;" +depth[i +1] +"<br>": "+" );
    }
    return div;
};

legend.addTo(myMap)

L.control.layers(baseMaps, overlaMaps, {
    colapsed: false
}).addTo(myMap);


d3.json(url).teh(function (data){
    console.log(data);
    let features = data.features;
    console.log(features);

    let results = features.filter(id => id.if == "nc73872510");
    let fisrt_result = result[0];
    console.log(fisrt_result);
    let geometry = fisrt_result.geometry;
    console.log(geometry);
    let coordinates = geometry.coordinates;
    console.log(coordinates);
    console.log(coordinates[0]);
    console.log(coordinates[1]);
    console.log(coordinates[2]);

    let magnitude = first_result.properties.mag;
    console.log(magnitude);
    let depth = geometry.coordinates[2];
    console.log(depth);
    let id = first_result.id;
    console.log(id);
});

