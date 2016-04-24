


/* global app, google */

app.controller('indexTemplateCtrl', function ($scope, $http) {


    $scope.lookUp = function () {
        findLocationZip($("#searchZipCode"), $http);
    };
    $http({
        method: 'GET',
        url: '/api/getData'
    }).
            then(function (data, status, headers, config) {
                //  console.log("called good");
                //  $scope.name = data.name;
                console.log(data);
                collectionPaser(data.data);
            }).
            catch (function (data, status, headers, config) {
                // console.log("called error");
                console.log("NOT HERE");
                console.log(data);

                // $scope.name = 'Error!';
            });

    $scope.searchOption = function () {

        var address = $("#searchZipCode").val();
        var geocoder = new google.maps.Geocoder();

        var queryType = $("#optionSelectQuery option:selected").val();

        geocoder.geocode({'address': address}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                var lat = results[0].geometry.location.lat();
                var lng = results[0].geometry.location.lng();
                //console.log("QUERY " + $("#searchQuery").val());
                
                var query = $("#searchQuery").val();
                if(query.length < 1){
                    query = "ALL";
                    queryType= "ALL";
                }
                
                $http.get('/api/search/' + queryType + '/' + query).
                        then(function (object, status, headers, config) {
                            var radius = $("#optionSelectRadius option:selected").val();
                            var data = object.data;
                            var filtered = [];

                            for (var key in data) {
                                var current = data[key];
                                var d = calculateDistance(current.latt, lat, current.long, lng);
                                //  console.log(d);
                                if (d < radius) {
                                    current.distance = parseInt(d);
                                    filtered.push(current);
                                }
                            }
                            collectionPaser(filtered);
                        }).
                        catch (function (data, status, headers, config) {

                        });
            } else {
                console.log("Geocode was not successful for the following reason: " + status);
            }
        });
    };
});

function findLocationZip(element, $http) {
    if (navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(function (pos) {
            //  console.log(pos);
            $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + pos.coords.latitude + ',' + pos.coords.longitude + '&sensor=true').then(function (res) {
                // console.log(res.data);
                var addr = res.data.results[0];

                if (addr !== undefined) {
                    //console.log("ADDR : ", addr);
                    for (var comp in addr.address_components) {
                        //  console.log(" --- ", addr.address_components[comp]);
                        if (addr.address_components[comp].types[0] === "postal_code") {
                             console.log("ZIP IS "+addr.address_components[comp].long_name);
                            element.val(addr.address_components[comp].long_name);
                            tester(addr.address_components[comp].long_name);
                        }
                    }
                }
            });
        });
    }
}


function tester(zipcode) {
    var lat = '';
    var lng = '';
    var address = zipcode;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': address}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            lat = results[0].geometry.location.lat();
            lng = results[0].geometry.location.lng();
            console.log( results[0]);
           
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}


app.controller('viewAdTemplateCtrl', function ($scope, $http, $stateParams) {

    $http.get(
            '/api/getCarData/' + $stateParams.id
            ).
            then(function (object, status, headers, config) {

                $scope.username = object.data.seller;
                $scope.make = object.data.make;
                $scope.model = object.data.model;
                $scope.description = object.data.description;
                $scope.price = object.data.price;
                $scope.year = object.data.year;
                $scope.urlImage = object.data.picture[0];
                $scope.sellerImg = object.data.sellerImg;
                $scope.views = object.data.views;
                $scope.location = object.data.address;
            }).
            catch (function (data, status, headers, config) {
                // console.log("called error");
               // console.log("NOT HERE");
                console.log(data);

                // $scope.name = 'Error!';
            });
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
    var R = 3959; // km 
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