define(['angular', 'text!views/pages/page1.html', 'layer'], function(angular, tpl, layer){

    function page1Controller(scope){
        console.log(layer );
    	scope.jsonData = '{"pageNum":1,"pageSize":10,"description":"","materialNo":"","model":"","sparePartCode":"","sparePartName":"","rows":[{"agentPrice":500,"createdBy":"1","createdTime":null,"description":"\u4e2d\u7ee7\u5668","materialNo":"1542-2562-521","model":"5300","orgId":null,"retailPrice":500,"sparePartCode":"UI2600","sparePartItemsId":1,"sparePartName":"\u4e2d\u7ee7\u5668","updatedBy":null,"updatedTime":1468310155000},{"agentPrice":500,"createdBy":"1","createdTime":null,"description":"\u4e2d\u7ee7\u5668","materialNo":"1542-2562-521","model":"5300","orgId":null,"retailPrice":500,"sparePartCode":"UI2600","sparePartItemsId":1,"sparePartName":"\u4e2d\u7ee7\u5668","updatedBy":null,"updatedTime":1468310155000},{"agentPrice":500,"createdBy":"1","createdTime":null,"description":"\u4e2d\u7ee7\u5668","materialNo":"1542-2562-521","model":"5300","orgId":null,"retailPrice":500,"sparePartCode":"UI2600","sparePartItemsId":1,"sparePartName":"\u4e2d\u7ee7\u5668","updatedBy":null,"updatedTime":1468310155000},{"agentPrice":500,"createdBy":null,"createdTime":null,"description":"\u7535\u6c60","materialNo":"1542-2562-522","model":"5301","orgId":null,"retailPrice":500,"sparePartCode":"UI2601","sparePartItemsId":2,"sparePartName":"\u7535\u6c60","updatedBy":null,"updatedTime":1468303503000},{"agentPrice":null,"createdBy":"1","createdTime":null,"description":"\u4e91\u53f0","materialNo":"908-938-342","model":"V","orgId":null,"retailPrice":null,"sparePartCode":"V320","sparePartItemsId":3,"sparePartName":"\u4e91\u53f0","updatedBy":null,"updatedTime":null}],"total":3}';
    	scope.jsonData = JSON.parse(scope.jsonData).rows;

    	for(var i = 0; i<scope.jsonData.length; ++i){
			scope.jsonData[i].checked = false;
			scope.jsonData[i].id = i;
		}

		scope.change = function(id){
			for(var i = 0; i<scope.jsonData.length; ++i){
				scope.jsonData[i].checked = false;
			}
			scope.jsonData[id].checked = true;
			console.log(scope.jsonData[id].checked);
		}


    	scope.openForm = function(){
    		layer.open({
    			title:'弹窗测试',
    			type: 1,
    			shift: 5,
    			content: $('#formTest'),
    			area:['720px', '480px'],
    			success: function(layer, index){
    				var shade = $('.layui-layer-shade');
    				$('.layui-layer-shade').remove();
    				$('[ng-view]').append(shade);
    				console.log(2);
    			}
    		});

    		// $('#testForm').show();
    	}

 		scope.openLayer = function(){
 			var is = false;
 			for(var i = 0; i<scope.jsonData.length; ++i){
				if(scope.jsonData[i].checked){
					is = true;
					layer.open({
						type: 0,
						title: scope.jsonData[i].description,
						content: JSON.stringify(scope.jsonData[i])
					});
				}
			}
			if (!is) {
				layer.alert('请选择数据');
			}
 		}

    }

    page1Controller.$inject = ['$scope'];

    return {
        controller: page1Controller,
        tpl: tpl
    }
});
