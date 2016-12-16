require.config({
    baseUrl: '/js/',
    paths: {
        //libs
        'angular': '../libs/angular.min',
        'ngRoute': '../libs/angular-route',
        'router': '../libs/angular-ui-router.min',
        'ocLazyLoad': '../libs/ocLazyLoad.min',
        'text': '../libs/text',
        'jquery': '../libs/jquery-3.1.0',
        'bootstrap': '../libs/bootstrap-3.3.5/bootstrap',
        'layer': '../libs/layer/layer',

        //common
        'app': 'common/app',
        'routeConfig': 'common/routeConfig',
        'gogogo': 'common/gogogo'
    },
    shim: {
        'angular': { exports: 'angular' },
        'ngRoute': {
            deps: ['angular']
        },
        'router': {
            deps: ['angular']
        },
        'ocLazyLoad': {
            deps: ['angular']
        },
        'jquery': {exports: '$'},
        'bootstrap': {deps: ['jquery']},
        'layer':{deps:['jquery']}
    },
    deps: ['app']
});



// require(['angular'], function(angular){
//     angular.bootstrap(document, ['csms']);
// });
