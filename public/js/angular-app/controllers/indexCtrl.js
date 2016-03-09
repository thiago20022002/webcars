


/* global app */

app.controller('indexTemplateCtrl', function ($scope, $http) {

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
});



app.controller('viewAdTemplateCtrl', function ($scope, $http, $stateParams) {

    $http.get(
            '/api/getCarData/'+$stateParams.id
            ).
            then(function (object, status, headers, config) {
                
                $scope.username = object.data.seller;
                $scope.make = object.data.make;
                $scope.model = object.data.model;
                $scope.description = object.data.description;
                $scope.price = object.data.price;
                $scope.year = object.data.year;
                $scope.urlImage = object.data.picture[0];
                $scope.views = object.data.views;
            }).
            catch (function (data, status, headers, config) {
                // console.log("called error");
                console.log("NOT HERE");
                console.log(data);

                // $scope.name = 'Error!';
            });
});