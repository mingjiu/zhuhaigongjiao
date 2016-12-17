define(['angular','require','routeConfig', 'ngRoute'], function(angular, require, routeConfig){

    var zhbus = angular.module('zhbus', ['ngRoute']);

    // csms.controller('mainCotroller', ['$scope', function($scope){
    //     console.log($scope);
    // }]);

    zhbus.config(['$routeProvider', '$controllerProvider', function($routeProvider, $controllerProvider){

        $routeProvider.otherwise({redirectTo: routeConfig.defaultRoute});

        for (var key in routeConfig.routeMap) {
            console.log(key)
            $routeProvider.when(key, {
                template:'',
                controller: routeConfig.routeMap[key].controller,
                resolve:{
                    keyName: requireModule(routeConfig.routeMap[key].path, routeConfig.routeMap[key].controller),
                }
            });
        }

        function requireModule(path, controller) {
            return function ($route, $q) {
                var deferred = $q.defer();
                require([path], function (ret) {
                    $controllerProvider.register(controller, ret.controller);
                    $route.current.template = ret.tpl;
                    deferred.resolve();
                });
                return deferred.promise;
            }
        }

    }]);
    angular.bootstrap(document, ['zhbus']);

});
