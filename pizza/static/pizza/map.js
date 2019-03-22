function mapcreate(ids) {
    ymaps.ready(init);
    var myMap, personid, salonid, stripid;
    function init(){
        document.getElementById("map").innerHTML = "";
        myMap = new ymaps.Map("map", {center: [59.93853099680896, 30.313496980816158], zoom: 11, behaviors: ["drag", "scrollZoom"]}, {minZoom: 5, maxZoom: 16, suppressMapOpenBlock: true});
        myMap.controls.remove("fullscreenControl");myMap.controls.remove('searchControl');myMap.controls.remove('geolocationControl');myMap.controls.remove('trafficControl');myMap.controls.remove('typeSelector')
        var myGeoObjects0 = [];
        function obj(id, lng, lat, company, metro, address, time){
            var presetName;var content = "";var name = "";var color;
            var icon = "../static/pizza/img/"+company+".png";
            var smetro = "";
            for (var i = metro.length - 1; i >= 0; i--) {
                smetro += metro[i];
            }
            switch(company) {
                case "pizzahut": color = 'orange'; name = "Pizza Hut" + " (" + id + ")"; break;
                case "ollisclub": color = '#92000a'; name = "Ollis Club" + " (" + id + ")"; break;
                case "dodopizza": color = '#ff2400'; name = "Додо Пицца" + " (" + id + ")"; break;
                case "papajohnes": color = '#ff00ff'; name = "Папа Джонс" + " (" + id + ")"; break;
            }
            content += "<table><tr><td><img src=\"../static/pizza/img/"+company+".png\" width=\"100px\" height=\"100px\"></td><td style=\"vertical-align: top\">";
            content += "<span style=\"color: blue;font-size: 18px\">"+name+"</span><br>";
            content += "<span>"+address+"</span><br>";
            content += "<span>"+time+"</span>"
            content += "</td></tr></table>"
            var myGeoObject = new ymaps.GeoObject(
                {
                    geometry: {type: "Point", coordinates: [lat, lng]},
                    properties: {
                        balloonContent: content
                    }
                }, {
                    // === свои иконки ===
                //     iconLayout: 'default#image',
                //     iconImageHref: icon,
                //     iconImageSize: [30,30],
                //     iconImageOffset: [-5,-38]
                // }, {
                    preset: presetName,
                    iconColor: color
                }
            );
            myGeoObjects0.push(myGeoObject);
        }
        $.getJSON('../static/pizza/points.json', function(data) {
            if (ids.length > 0) {
                var k = 0;var i = ids[k]; var j = 0;
                while (k < ids.length) {
                    while (i != j) {
                        j++;
                    }
                    var mas = data[j];
                    var time = mas.time_s + " - " + mas.time_e;
                    obj(mas.id,mas.x,mas.y, mas.company, mas.metro, mas.address, time);    
                    i = ids[++k];
                }
            }
            var myClusterer0 = new ymaps.Clusterer({
                clusterIconLayout: 'default#pieChart',
                clusterIconPieChartRadius: 20,
                clusterIconPieChartCoreRadius: 15,
                clusterIconPieChartStrokeWidth: 2,
                hasBalloon: false
            });
            myClusterer0.add(myGeoObjects0);
            myMap.geoObjects.add(myClusterer0);
        });
        
    }
}