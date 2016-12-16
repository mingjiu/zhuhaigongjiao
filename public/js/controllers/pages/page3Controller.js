define(['angular', 'text!views/pages/page3.html'], function(angular, tpl){

    function page3Controller(scope){
        scope.test = 3;
        console.log(scope.test);
    }

    page3Controller.$inject = ['$scope'];
    return {
        controller: page3Controller,
        tpl: tpl
    }
});
