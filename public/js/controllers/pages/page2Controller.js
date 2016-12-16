define(['angular', 'gogogo', 'text!views/pages/page2.html'], function(angular, tpl){

    function page2Controller(scope){
        scope.test = 2;
        console.log(scope.test);
    }

    page2Controller.$inject = ['$scope'];
    return {
        controller: page2Controller,
        tpl: tpl
    }
});
