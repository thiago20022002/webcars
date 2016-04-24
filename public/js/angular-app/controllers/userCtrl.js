


/* global app */

app.controller('profileTemplateCtrl', function ($http, $state, $scope, $rootScope, $stateParams) {

    if ($rootScope.session !== undefined) {
        if ($stateParams.username === $rootScope.session.user) {
            $state.go("home", {'username': $rootScope.session.user}, {reload: true});
            return;
        }
    }

    $http.get('/api/userData/' + $stateParams.username).
            then(function (object) {
                // console.log("SESSION ",$rootScope.session.user);
                // $scope.sessionUser = $rootScope.session.user;
                $scope.username = object.data.username;
                $scope.firstName = object.data.firstName;
                $scope.lastName = object.data.lastName;
                $scope.phone = object.data.phone;
                $scope.location = object.data.address;
                $scope.profileURL = object.data.profilePictureUrl;
                $scope.adsCollection = object.data.postedAds;

                $scope.feedbacks = object.data.feedbacks;

                // console.log($scope.adsCollection);

            }).
            catch (function (data, status) {

            });
});


app.controller('homeTemplateCtrl', function ($http, $state, $scope, $rootScope, $stateParams) {

    $http.get('/api/userData/' + $stateParams.username).
            then(function (object) {
                // console.log("SESSION ",$rootScope.session.user);
                // $scope.sessionUser = $rootScope.session.user;
                $scope.username = object.data.username;
                $scope.firstName = object.data.firstName;
                $scope.lastName = object.data.lastName;
                $scope.phone = object.data.phone;
                $scope.location = object.data.address;
                $scope.profileURL = object.data.profilePictureUrl;
                $scope.adsCollection = object.data.postedAds;

                $scope.feedbacks = object.data.feedbacks;

                // console.log($scope.adsCollection);

            }).
            catch (function (data, status) {

            });

});

app.controller('postCtrl', function ($http, $scope, $state, $rootScope) {

    document.querySelector('#imageFile').onchange = function (e) {
        console.log("SRC is " + $("#imageViewer").attr("src"));
        loadFile();

    };

    $scope.sendAdPost = function () {
        $scope.postData.imageUrl = $("#imageViewer").attr("src");
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
                    $state.go("index", {}, {reload: true});
                }).
                catch (function (data, status) {
                    $rootScope.session = undefined;
                    $state.go("index", {}, {reload: true});
                });

    };
});


app.controller('feedbackTemplateCtrl', function ($http, $scope, $stateParams, $state, $rootScope) {

    $http.get('/api/userData/' + $stateParams.username).
            then(function (object) {
                $scope.feedbacks = object.data.feedbacks;

                console.log(object.data.feedbacks);

            }).
            catch (function (data, status) {
                console.log(data);
            });

});


app.controller('feedbackCtrl', function ($http, $scope, $state, $rootScope) {

    // $state.go("home.feedback", {'username': '123'});

    $scope.sendFeedbackPost = function () {
        console.log($scope.feedData);
        $http.post('/api/' + $scope.username + '/feedback', $scope.feedData).
                then(function (data) {
                    $state.go("profile", {'username': $scope.username}, {reload: true});
                    //              $state.go("home.feedback", {'username': '123'});
                    // $state.go($state.current.name, {'username': $scope.username}, {reload: true});
                }).
                catch (function (data, status) {
                    console.log(data);
                });
    };

});