let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

//apikey = pk.eyJ1IjoiYXdvemlvcmtsdWkiLCJhIjoiY2x4aTloaXNnMWhyeTJrb2JiOXFpdWg2aiJ9.QPiD8GKbHr6LY-hNOiETAQ

let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

myMap = L.map("map", {
    center: [38.79, -122.80],
    zoom: 3,
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

function getRadius(magnitude){
    if (magnitude === 0){
        return 1
    }
    return magnitude*5;

};
function getColor(depth){
    if (depth <= 10) return "red";
    else if (depth > 10 & depth <= 30) return "orange";
    else if (depth > 30 & depth <= 50) return "orangered";
    else if (depth > 50 & depth <= 70) return "yellow";
    else if (depth > 70 & depth <= 90) return "greenyellow";
    else return "green";
    };


d3.json(url).then(function(data){
    function styleInfo(feature){
        return{
            opacity: 1,
            fillOpacity: 0.3,
            fillColor: getColor(feature.geometry.coordinates[2]),
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.54
        }
    }
    L.geoJson(data, {

        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng)
        },
        style: styleInfo,
        onEachFeature: function(feature, layer){
            layer.bindPopup(
                "Magnitude: "
                + feature.properties.mag
                +"<br>Depth: "
                + feature.geometry.coordinates[2]
                + "<br>Location: "
                + feature.properties.place
            )
        }
    }).addTo(myMap) 

})






grayscale = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

baseMaps = {
    "grayscale Map":grayscale
}


legend = L.control({position: "bottomright"});
legend.onAdd = function() {
    div = L.DomUtil.create("div", "info legend"),
    depth = [-10, 10, 30, 50, 70, 90];
    div.innerHTML += "<h3 style = 'text-align: center'> Depth</h3>"

    for (i = 0; i<depth.length; i++) {
        div.innerHTML +=
        '<i style= "background:' + getColor(depth[i] +1) + '"></i>' + depth[i]+ (depth[i+1] ? "&dash;" +depth[i +1] +"<br>": "+" );
    }
    return div;
};

legend.addTo(myMap)


