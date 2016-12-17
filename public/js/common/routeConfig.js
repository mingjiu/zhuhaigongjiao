define([],function(){
    var routeConfig = {
        routeMap: {
            // '/1': {
            //     controller: 'page1Controller',
            //     path: 'js/controllers/pages/page1Controller.js',
            // },
            // '/2': {
            //     controller: 'page2Controller',
            //     path: 'js/controllers/pages/page2Controller.js',
            // },
            // '/3': {
            //     controller: 'page3Controller',
            //     path: 'js/controllers/pages/page3Controller.js',
            // },
            // '/4': {
            //     controller: 'page4Controller',
            //     path: 'js/controllers/pages/page4Controller.js',
            // },
            // '/5': {
            //     path: 'js/controllers/pages/page5Controller.js',
            //     controller: 'page5Controller',
            // },
            '/realtime': {
                path: 'js/controllers/pages/realtimeController.js',
                controller: 'realtimeController'
            },
            '/translate': {
                path: 'js/controllers/pages/translateController.js',
                controller: 'translateController'
            },
            '/station': {
                path: 'js/controllers/pages/stationController.js',
                controller: 'stationController'
            }
        },
        defaultRoute: '/realtime'
    }
    return routeConfig;
});
