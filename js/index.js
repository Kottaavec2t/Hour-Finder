document.addEventListener("DOMContentLoaded", function () {

    message = document.querySelector("#map p");

    try {
        var map = new ol.Map({
            target: 'map', // Refer to the div with id 'map'
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM() // OpenStreetMap layer
                })
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([2.213749, 46.227638]), // France coordinates
                zoom: 6
            })
        });

        const markerSource = new ol.source.Vector();
        const markerLayer = new ol.layer.Vector({
            source: markerSource
        });
        map.addLayer(markerLayer);

        map.on('click', function (event) {
            const coordinates = event.coordinate;
            markerSource.clear(); // Clear previous markers

            const marker = new ol.Feature({
                geometry: new ol.geom.Point(coordinates)
            });

            marker.setStyle(new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 6,
                    fill: new ol.style.Fill({ color: 'red' }), // Fill color
                    stroke: new ol.style.Stroke({ color: 'black', width: 2 }) // Border color and width
                })
            }));

            markerSource.addFeature(marker);
            console.log("Marker added at:", coordinates);
        });
        message.innerHTML = ""; 
        message.style.display = "none"; 
        console.log("Map initialized successfully.");
    } catch (error) {
        message.innerHTML = "Error while loading the map : ", error; 
        console.error("Error initializing map:", error);

    }
});
