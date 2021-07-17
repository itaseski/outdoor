let geojson;

let map = L.map("map",
    {
        center: [41.14000, 21.55000],
        zoom: 10
    }
);

L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attribution/">CartoDB</a>',
    subdomains: "abcd",
    maxZoom: 19
}).addTo(map);

let info = L.control({ position: "topright" });

info.onAdd = function () {
    let div = L.DomUtil.create("div", "info");
    div.innerHTML = '<h4>Мариово</h4><p id="village">Постави го глушецот над Мариово</p>';
    return div;
};
info.addTo(map);

let breaks = [-Infinity, 2, 10, 31, 77, Infinity];
let colors = ["#607c3c", "#607c3c", "#607c3c", "#607c3c", "#607c3c"];

function mariovo_color(d) {
    for (let i = 0; i < breaks.length; i++) {
        if (d > breaks[i] && d <= breaks[i + 1]) {
            return colors[i];
        }
    }
}

function mariovo_style(feature) {
    return {
        fillColor: mariovo_color(feature.properties.pop_2002),
        weight: 3,
        opacity: 0.1,
        color: "white",
        fillOpacity: 0.75
    };
}

let highlightStyle = {
    weight: 9,
    color: "magenta",
    fillOpacity: 0.5,
    fillColor: "red"
};

let info_p = document.getElementById("village");
        
function highlightFeature(e) {
    e.target.setStyle(highlightStyle);
    e.target.bringToFront();
    info_p.innerHTML =
        e.target.feature.properties.name + "<br>" +
        "Oпштина: " + e.target.feature.properties.municipality + "<br>" +
        "Катастарска општина: " + e.target.feature.properties.cadastral + "<br>" +
        e.target.feature.properties.pop_2002 + " жители";
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info_p.innerHTML = "<small>Постави го глушецот над Мариово</small>";
}

fetch('./mariovo.geojson')
    // executes a GET request and returns a special object called a “Promise”            
    .then(function (response) {
        return response.json(); // JSON contents 
    })
    .then(function (data) {
        geojson = L.geoJSON(data, {
            style: mariovo_style,
            onEachFeature: function (feature, layer) {
                layer.addEventListener("mouseover", highlightFeature);
                layer.addEventListener("mouseout", resetHighlight);
            }
        }).addTo(map);

    });





