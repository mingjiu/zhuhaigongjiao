define(['angular', 'text!views/pages/page5.html'], function(angular, tpl){

    function page5Controller(scope){
        scope.test = 5;
        console.log(scope.test);
    }

    page5Controller.$inject = ['$scope'];
    return {
        controller: page5Controller,
        tpl: tpl
    }
});
