
function drawRhumbLines() {
    clearMarkers();

    var latInputValue = document.getElementById('latitude').value;
    var lngInputValue = document.getElementById('longitude').value;
    var DistanceInputValue = document.getElementById('distance').value;
    if (latInputValue.length > 0 && lngInputValue.length > 0)
        StartingPoint = new google.maps.LatLng(parseFloat(latInputValue), parseFloat(lngInputValue));
    if (DistanceInputValue.length > 0)
        defaultDistance = parseInt(DistanceInputValue);
    map.setCenter({ lat: StartingPoint.lat(), lng: StartingPoint.lng()});

    angles.forEach(function (angle) {
        lines.push(getRhumbLine(StartingPoint, defaultDistance, angle, "#F00"))
    });

    angles2.forEach(function (angle) {
        lines.push(getRhumbLine(StartingPoint, defaultDistance, angle, "#666"))
    });
}

function getRhumbLine(origin, distance, angle, color) {
    var destinationPoint = google.maps.geometry.spherical.computeOffset(origin, distance * 1000, angle);
    return new google.maps.Polyline({
        path: [origin, destinationPoint],
        geodesic: false,
        strokeColor: color,
        strokeOpacity: 1,
        strokeWeight: 2,
        map: map,
    });
}

function clearMarkers() {
    lines.forEach(function (line) {
        line.setMap(null);
    });
    lines = [];
}
function changeDistance(distance){
    map.setZoom(12- Math.floor(Math.log2(distance/3)));
    drawRhumbLines();
}