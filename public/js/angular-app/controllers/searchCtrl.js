



/* global app, google */

app.controller('searchCtrl', function ($scope, $http) {
    $scope.searchOption = function () {
        var address = $scope.registerData.zipCode;
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address': address}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                var lat = results[0].geometry.location.lat();
                var lng = results[0].geometry.location.lng();


                $http.post('/api/search/' + $scope.searchData.make).
                        then(function (object, status, headers, config) {
                            var radius = $("#optionSelect:selected")[0].val();
                            var data = object.data;
                            var filtered = [];
                             console.log(data);
                            for (var key in data) {
                                var current = data[key];
                                var d = calculateDistance(current.latt, lat, current.long, lng);
                                console.log(d);
                                if (d < radius) {
                                    console.log("HERE!");
                                    filtered.push(current);
                                }
                            }

                            collectionPaser(filtered);

                        }).
                        catch (function (data, status, headers, config) {
                            console.log("ERRRROOROROROROROOOROROROO!!!");
                        });
            } else {
                console("Geocode was not successful for the following reason: " + status);
            }
        });

    };

});

function toRad(number) {
    return number * Math.PI / 180;
}
;

function calculateDistance(lat1, lat2, lon1, lon2) {

    /*
     var lat2 = 42.741;
     var lon2 = -71.3161;
     var lat1 = 42.806911;
     var lon1 = -71.290611;
     */
    var R = 6371; // km 
//has a problem with the .toRad() method below.
    var x1 = lat2 - lat1;
    var dLat = toRad(x1);
    var x2 = lon2 - lon1;
    var dLon = toRad(x2);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}




function findLocation(element, $http) {
    if (navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(function (pos) {
            //  console.log(pos);
            $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + pos.coords.latitude + ',' + pos.coords.longitude + '&sensor=true').then(function (res) {
                // console.log(res.data);
                var addr = res.data.results[0];

                if (addr !== undefined) {
                    //console.log("ADDR : ", addr);
                    for (var comp in addr.address_components) {
                        //  console.log(" --- ", addr.address_components[comp]);
                        if (addr.address_components[comp].types[0] === "postal_code") {
                            // console.log("ZIP IS "+addr.address_components[comp].long_name);
                            element.val(addr.address_components[comp].long_name);
                            //test(addr.address_components[comp].long_name);
                        }
                    }
                }
            });
        });
    }
}