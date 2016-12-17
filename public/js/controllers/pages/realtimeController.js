define(['angular', 'text!views/pages/realtime.html'], function(angular, tpl){

    function realtimeController(scope){
        scope.searchKey = '';
        scope.searchInput = false;
        console.log(scope.searchKey);
        scope.go = function(){
            console.log(123)
        }
    }

    realtimeController.$inject = ['$scope'];
    return {
        controller: realtimeController,
        tpl: tpl
    }
});
