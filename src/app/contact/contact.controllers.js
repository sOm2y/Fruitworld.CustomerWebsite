(function() {
  'use strict';

  angular
    .module('fruitworldCustomerWebsite')
    .controller('ContactController', ContactController);

  /** @ngInject */
  function ContactController( $rootScope) {
    var vm = this;
     $rootScope.isLoading = false;
     var locations = [
        ['Fruit World Glen Innes', '185 Apirana Avenue, Glen Innes,Auckland Central', ''],
        ['Fruit World Greenlane', '1 Marewa Road, Greenlane, Auckland Central', ''],
        ['Fruit World Mt Albert', '955 New North Road, Mt Albert, Auckland Central', ''],
        ['Fruit World Mt Roskill', '30A Frost Road, Mt Roskill, Auckland Central', ''],
        ['Fruit World Mt Wellington', 'Mt Wellington Shopping Centre, Penrose', ''],
        ['Fruit World Ponsonby', 'Unit 4, 280 Richmond Road, Ponsonby, Auckland Central', ''],
        ['Supa Royal oak', '100 pah road, royal oak, Auckland Central', ''],
        ['Fruit World Albany', '50 Greville Road, Albany, Auckland North', ''],
        ['Fruit World Chatswood', '174 Mokoia Road, Chatswood, Auckland North', ''],
        ['Fruit World North Harbour', '343 Albany Highway, North Harbour, Auckland North', ''],
        ['Fruit World Silverdale', '2200 East Coast Road, Silverdale, Auckland North', ''],
        ['Fruit World Whangaparaoa', '1/15 Karepiro Dr, Stanmore Bay, Whangaparaoa 0932', '']
 
    ];
    
    var geocoder;
    var map;
    var bounds = new google.maps.LatLngBounds();
    
    function initialize() {
        map = new google.maps.Map(
        document.getElementById("googleMap"), {
            center: new google.maps.LatLng(-36.862897, 174.758704),
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        geocoder = new google.maps.Geocoder();
    
        for (var i = 0; i < locations.length; i++) {
        //TODO: fix query overlimits for google maps
        // var wait = true;
        // setTimeout("wait = true", 100);
            geocodeAddress(locations, i);
        
        }
    }
    // google.maps.event.addDomListener(window, "load", initialize);
    initialize();
    function geocodeAddress(locations, i) {
        var title = locations[i][0];
        var address = locations[i][1];
        var url = locations[i][2];
           
        geocoder.geocode({
            'address': locations[i][1]
        },
    
        function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var marker = new google.maps.Marker({
                    icon: '../organicc/images/icon_location.png',
                    map: map,
                    position: results[0].geometry.location,
                    title: title,
                    animation: google.maps.Animation.DROP,
                    address: address,
                    url: url
                })
                infoWindow(marker, map, title, address, url);
                bounds.extend(marker.getPosition());
                map.fitBounds(bounds);
            } else {
                alert("geocode of " + address + " failed:" + status);
            }
        });
    }
    
    function infoWindow(marker, map, title, address, url) {
        google.maps.event.addListener(marker, 'click', function () {
            var html = "<div><h3>" + title + "</h3><p>" + address + "<br></div><a href='" + url + "'>View location</a></p></div>";
            var iw = new google.maps.InfoWindow({
                content: html,
                maxWidth: 350
            });
            iw.open(map, marker);
        });
    }
    
    function createMarker(results) {
        var marker = new google.maps.Marker({
            icon: '../organicc/images/icon_location.png',
            map: map,
            position: results[0].geometry.location,
            title: title,
            animation: google.maps.Animation.DROP,
            address: address,
            url: url
        })
        bounds.extend(marker.getPosition());
        map.fitBounds(bounds);
        infoWindow(marker, map, title, address, url);
        return marker;
    }

  }
})();
