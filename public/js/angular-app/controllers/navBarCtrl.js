


/* global app */

app.controller('navBarTemplateCtrl', function ($scope, $rootScope, $state) {



    if ($rootScope.session) {
        // console.log($rootScope.session.user);
        $scope.username = $rootScope.session.user;
        $scope.userExist = true;
    } else {
        $scope.userExist = false;
    }

    $scope.selected = true;
    $scope.isSelected= function(tab){
        if($state.current.iconNavId === tab){
            return true;
        }else {
            return false;
        }
        
    }

});