define([],function(){
    var routeConfig = {
        routeMap: {
            '/1': {
                controller: 'page1Controller',
                path: 'js/controllers/pages/page1Controller.js',
            },
            '/2': {
                controller: 'page2Controller',
                path: 'js/controllers/pages/page2Controller.js',
            },
            '/3': {
                controller: 'page3Controller',
                path: 'js/controllers/pages/page3Controller.js',
            },
            '/4': {
                controller: 'page4Controller',
                path: 'js/controllers/pages/page4Controller.js',
            },
            '/5': {
                path: 'js/controllers/pages/page5Controller.js',
                controller: 'page5Controller',
            }
        },
        defaultRoute: '/1'
    }
    return routeConfig;
});
