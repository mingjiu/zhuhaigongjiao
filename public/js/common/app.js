define(['angular','require','routeConfig', 'layer', 'ngRoute', 'ocLazyLoad'], function(angular, require, routeConfig, layer){

    var csms = angular.module('csms', ['ngRoute', 'oc.lazyLoad']);

    // csms.controller('mainCotroller', ['$scope', function($scope){
    //     console.log($scope);
    // }]);

    csms.config(['$routeProvider', '$controllerProvider', function($routeProvider, $controllerProvider){

        $routeProvider.otherwise({redirectTo: routeConfig.defaultRoute});

        for (var key in routeConfig.routeMap) {
            // console.log(key);
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
    
    // csms.directive('layer', function(){
    //     // var link = function(scope, elemt, attrs) {
    //     //     layer.open({
    //     //         content: elemt,
    //     //         type:1,
    //     //         title: 'dddd'
    //     //     });
              
    //     // };
    //     // return {
    //     //     link: link,
    //     //     restrict: 'AE'
    //     // };
    // });
    

    angular.bootstrap(document, ['csms']);

    // csms.run(['$rootScope', '$state', function($rootScope, $state){
    //     $rootScope.$state = $state;
    // }]);

});
