

/* global angular */

var app = angular.module('app',
        [
            'ui.router'
        ])
        .run(function ($rootScope, $state, $http) {
            $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

                if (!$rootScope.session) {
                    $http.get('/api/authenticate/success').
                            then(function (object) {

                                $rootScope.session = {};
                                $rootScope.session.user = object.data.user;

                            }).catch(function (object, status) {
                        if (toState.authenticate) {
                            $rootScope.session = undefined;
                            $state.transitionTo("login");
                            event.preventDefault();
                        }

                    });
                }

            });
        });

app.config(function ($stateProvider, $locationProvider) {
    $stateProvider.state('index', {
        url: "/",
        views: {
            "navView": {
                templateUrl: "/partials/navBarTemplate",
                controller: "navBarTemplateCtrl"

            },
            "mainView": {
                controller: "indexTemplateCtrl",
                templateUrl: "/partials/mainTemplate"
            }
        },
        iconNavId: "index-nav",
        authenticate: false
    }).state('login', {
        url: "/login",
        views: {
            "navView": {
                controller: "navBarTemplateCtrl",
                templateUrl: "/partials/navBarTemplate"
            },
            "mainView": {
                controller: 'errorHandlerTemplateCtrl',
                templateUrl: "/partials/loginTemplate"
            },
            params: {errorMessage: null}
        },
        iconNavId: "login-nav",
        authenticate: false
    }).state('home', {
        url: "/home/:username",
        views: {
            "navView": {
                templateUrl: "/partials/navBarTemplate",
                controller: "navBarTemplateCtrl"
            },
            "mainView": {
                templateUrl: "/partials/homeTemplate",
                controller: "homeTemplateCtrl"
            }
        },
        iconNavId: "home-nav",
        authenticate: true
    }).state('home.feedback', {
        url: '',
        views: {
            "feedbackView": {
                controller: "feedbackTemplateCtrl",
                templateUrl: "/partials/feedbackTemplate"
            }
        },
        iconNavId: "home-nav",
        authenticate: true
    }).state('profile', {
        url: "/profile/:username",
        views: {
            "navView": {
                templateUrl: "/partials/navBarTemplate",
                controller: "navBarTemplateCtrl"
            },
            "mainView": {
                templateUrl: "/partials/profileTemplate",
                controller: "profileTemplateCtrl"
            }
        },
        iconNavId: "profile-nav",
        cache: false,
        authenticate: true
    }).state('register', {
        url: "/register",
        views: {
            "navView": {
                controller: "navBarTemplateCtrl",
                templateUrl: "/partials/navBarTemplate"
            },
            "mainView": {
                templateUrl: "/partials/registerTemplate",
                //controller: "errorHandlerTemplateCtrl"
                controller: "registerCtrl"
            }
        },
        iconNavId: "register-nav",
        authenticate: false
    }).state('post', {
        url: "/home/:username/post",
        views: {
            "navView": {
                controller: "navBarTemplateCtrl",
                templateUrl: "/partials/navBarTemplate"
            },
            "mainView": {
                templateUrl: "/partials/postTemplate"
            }
        },
        iconNavId: 'post-nav',
        authenticate: true
    }).state('view-post', {
        url: "/ad/:id",
        views: {
            "navView": {
                controller: "navBarTemplateCtrl",
                templateUrl: "/partials/navBarTemplate"
            },
            "mainView": {
                templateUrl: "/partials/viewAdTemplate",
                controller: "viewAdTemplateCtrl"
            }
        },
        iconNavId: "post-nav",
        authenticate: false
    }).state('search', {
        url: "/search",
        views: {
            "navView": {
                controller: "navBarTemplateCtrl",
                templateUrl: "/partials/navBarTemplate"
            },
            "mainView": {
                controller : "indexTemplateCtrl",
                templateUrl: "/partials/searchTemplate"
            }
        },
        iconNavId: "search-nav",
        authenticate: false
    });

    ;

    $locationProvider.html5Mode(true);
});


