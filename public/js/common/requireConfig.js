require.config({
    baseUrl: '/js/',
    paths: {
        //libs
        'angular': '../libs/angular.min',
        'ngRoute': '../libs/angular-route',
        'text': '../libs/text',
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
    },
    deps: ['app']
});
