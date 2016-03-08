


/* global app */

app.controller('navBarTemplateCtrl', function ($scope, $rootScope) {


    if ($rootScope.session) {
        console.log($rootScope.session.user);
        $scope.username = $rootScope.session.user;
        $scope.userExist = true;
    } else {
        $scope.userExist = false;
    }
    loadNavBar();

});