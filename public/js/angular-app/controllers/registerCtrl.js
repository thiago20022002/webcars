



/* global app */

app.controller('errorHandlerTemplateCtrl', function ($scope, $rootScope) {
    $scope.error = false;
    if ($rootScope.errorJson) {
        $scope.errorMessage = $rootScope.errorJson.message;
        $scope.error = true;
    }
    $rootScope.errorJson = undefined;

});

app.controller('registerCtrl', function ($scope, $http, $rootScope, $state) {



    $scope.sendRegisterPost = function () {


        /*
         if($('#registerForm').attr("novalidate") === "novalidate") {
         console.log("rejected");
         return;
         }else {
         console.log("gooooddd");
         }
         */
        
        
        
        if(!$('#registerForm').validate()){
            console.log("invalid");
            return;
        }else {
            console.log("valid");
          
        };
        

        console.log($scope.registerFormName);

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
    };
});


