define(['angular', 'text!views/pages/page4.html'], function(angular, tpl){

    function page4Controller(scope){
        scope.test = 4;
        console.log(scope.test);
    }

    page4Controller.$inject = ['$scope'];
    return {
        controller: page4Controller,
        tpl: tpl
    }
});
