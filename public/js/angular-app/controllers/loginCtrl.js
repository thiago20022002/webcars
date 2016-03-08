


/* global app */

app.controller('loginCtrl', function ($scope, $rootScope, $state, $http) {
    $scope.sendLoginPost = function () {
        $http.post('/api/login', $scope.loginData).
                then(function (object) {
                    $rootScope.session = {};
                    $rootScope.session.user = object.data.user;

                    $state.go("home", {'username': object.data.user});
                    $rootScope.errorJson = undefined;
                }).
                catch (function (object, status) {

                    $rootScope.session = undefined;
                    $rootScope.errorJson = object.data;
                    $state.go("login", {}, {reload: true});
                });
    };
});

