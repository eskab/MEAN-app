/**
 * Created by szka on 04.05.2016.
 */
(function() {

    'use strict';

    angular
        .module('checklist')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$compileProvider'];

    function config($stateProvider, $urlRouterProvider, $compileProvider) {

        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('tasks', {
                url: '/tasks',
                templateUrl: 'views/task/task.html',
                controller: 'TaskController',
                controllerAs: 'vm',
                resolve: {
                    tasksPrepService: tasksPrepService,
                    authentication: authentication
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/account/login.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            });

        $compileProvider.debugInfoEnabled(false);

    }

    tasksPrepService.$inject = ['StoreFactory'];

    function tasksPrepService(StoreFactory) {
        return StoreFactory.get();
    }

    authentication.$inject = ['$q', '$state', '$timeout', 'AuthFactory'];

    function authentication($q, $state, $timeout, AuthFactory) {
        var authenticated = AuthFactory.isAuthenticated();

        if(authenticated) {
            return $q.resolve();
        } else {
            $timeout(function() {
                $state.go('login');
            });

            return $q.reject();
        }
    }

}());