



/* global app, google */

app.controller('errorHandlerTemplateCtrl', function ($scope, $rootScope) {
    $scope.error = false;
    if ($rootScope.errorJson) {
        $scope.errorMessage = $rootScope.errorJson.message;
        $scope.error = true;
    }
    $rootScope.errorJson = undefined;

});

app.controller('registerCtrl', function ($scope, $http, $rootScope, $state) {

    $scope.lookUp = function () {
        findLocationAll($("#registerZipCode"), $("#registerAddress"), $http);
    };
    
    document.querySelector('#imageFile').onchange = function (e) {
       // console.log("SRC is " +  $("#imageViewer").attr("src"));
        loadFile($("#registerForm"));
         
    };


    $scope.sendRegisterPost = function () {

        var lat = '';
        var lng = '';
        var address = $("#registerZipCode").val();
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address': address}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                $scope.registerData.lat = results[0].geometry.location.lat();
                $scope.registerData.lng = results[0].geometry.location.lng();
               // console.log(lat);
               // console.log(lng);
            } else {
                console.log("Geocode was not successful for the following reason: " + status);
            }

            $scope.registerData.profileURL = $("#imageViewer").attr("src");
        
            $scope.registerData.address = $("#registerAddress").val();
            $scope.registerData.zipCode = $("#registerZipCode").val();

            $http.post('/api/register', $scope.registerData).
                    then(function (object) {
                        console.log(object.data);
                        $rootScope.session = {};
                        $rootScope.session.user = object.data.user;
                        $rootScope.errorJson = undefined;
                        $state.go("home", {'username': object.data.user});
                    }).
                    catch (function (object, status) {
                        console.log(object);
                        $rootScope.session = undefined;
                        $rootScope.errorJson = object;
                        $state.go($state.current, {});
                    });
        });
    };

});



function findLocationAll(zip, place, $http) {
    if (navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(function (pos) {
            //  console.log(pos);
            $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + pos.coords.latitude + ',' + pos.coords.longitude + '&sensor=true').then(function (res) {
                // console.log(res.data);
                var addr = res.data.results[0];

                if (addr !== undefined) {
                    var city = "";
                    var state = "";
                    //console.log("ADDR : ", addr);
                    for (var comp in addr.address_components) {
                        //  console.log(" --- ", addr.address_components[comp]);
                        if (addr.address_components[comp].types[0] === "postal_code") {
                            zip.val(addr.address_components[comp].long_name);
                        }
                        if (addr.address_components[comp].types[0] === "locality") {
                            city = addr.address_components[comp].long_name;
                        }
                        if (addr.address_components[comp].types[0] === "administrative_area_level_1") {
                            state = addr.address_components[comp].short_name;
                        }
                    }

                    place.val(city + " , " + state);
                }
            });
        });
    }

}


