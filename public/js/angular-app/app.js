

/* global angular */

var app = angular.module('app',
        [
            'ui.router'
        ])
        .run(function ($rootScope, $state) {
            $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

                if (toState.authenticate && !$rootScope.session) {
                    $state.transitionTo("login");
                    event.preventDefault();
                }

            });
        });

app.config(function ($stateProvider, $locationProvider) {
    $stateProvider
            .state('index', {
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
        authenticate: false
    })
            .state('home', {
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
               
                authenticate: false
            }).
            state('home.feedback', {
                url: '',
                views: {
                    "feedbackView": {
                        controller: "feedbackTemplateCtrl",
                        templateUrl: "/partials/feedbackTemplate"
                    }
                },
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
                cache: false,
                authenticate: false
            })
            .state('register', {
                url: "/register",
                views: {
                    "navView": {
                        controller: "navBarTemplateCtrl",
                        templateUrl: "/partials/navBarTemplate"
                    },
                    "mainView": {
                        templateUrl: "/partials/registerTemplate",
                        controller: "errorHandlerTemplateCtrl"
                    }
                },
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
        authenticate: false
    }).state('search', {
        url: "/search",
        views: {
            "navView": {
                controller: "navBarTemplateCtrl",
                templateUrl: "/partials/navBarTemplate"
            },
            "mainView": {
                templateUrl: "/partials/searchTemplate"
               
            }
        },
        authenticate: false
    });
    
    ;

    $locationProvider.html5Mode(true);
});
