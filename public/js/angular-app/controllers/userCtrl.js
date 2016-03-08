


/* global app */

app.controller('profileTemplateCtrl', function ($http, $scope, $rootScope,$stateParams) {


    console.log("profileTemplateCtrl BAR CONTROL LOADED");

    $http.get('/api/userData/'+ $stateParams.username).
            then(function (object) {

                $scope.username =object.data.username;
                $scope.firstName =object.data.firstName;
                $scope.lastName =object.data.lastName;
                $scope.phone =object.data.phone;
                $scope.location =object.data.address;
                $scope.profileURL = object.data.profilePictureUrl;
                
            }).
            catch (function (data, status) {

            });
});

app.controller('postCtrl', function ($http, $scope, $state, $rootScope) {

    $scope.sendAdPost = function () {

        $http.post('/api/postAd', $scope.postData).
                then(function (data) {
                    console.log(data);
                    $state.go("index");
                }).
                catch (function (data, status) {
                    console.log(data);
                    $rootScope.session = undefined;
                    $state.go("index");
                });

    };
});

app.controller('logoutCtrl', function ($http, $scope, $state, $rootScope) {

    $scope.sendLogOutGet = function () {

        $http.get('/api/logout').
                then(function (data) {
                    $rootScope.session = undefined;
                    $state.go("index");
                }).
                catch (function (data, status) {
                    $rootScope.session = undefined;
                    $state.go("index");
                });

    };
});