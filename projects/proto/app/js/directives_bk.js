'use strict';

/* Directives */

/*
value = array
 */

//app.directive("myCustomer", function ($compile) {
//    return {
//        restrict: "E",
//        template: "<div class='amount'><input type='text' /></div>",
//        replace: true,
//        compile: function compile(tElement, tAttrs) {
//            return function (scope, iElement, iAttrs) {
//                var attributes = $(iElement).prop("attributes");
//                var $input = $(iElement).find("input");
//                $.each(attributes, function () { //loop over all attributes and copy them to the <input/>
//                    if (this.name !== "class") {
//                        $input.attr(this.name, this.value);
//                    }
//                });
//                $compile($input)(scope); //compile the input
//            };
//        }
//    };
//});

app.directive('myCustomer', function($compile) {

    var getTemplate = function(item, el_class, el_model){
        var template = '';
        var el_disabled = item.override ? 'disabled' : 'disabled="disabled"';
        //ng-disabled="' +!item.override+ '"

        switch(item.type) {
            case 'text':
                //template = '<input ng-disabled="' +!item.override+ '" class="' +el_class+ '" ng-model="' +el_model+ '" type="' +item.type+ '" value="' +item.value+ '" placeholder="' +item.default+ '">';
                template = '<input class="' +el_class+ '" ng-model="' +el_model+ '"  type="' +item.type+ '" value="' +item.value+ '" placeholder="' +item.default+ '">';
                break;
            case 'textarea':
                //template = '<textarea class="' +el_class+ '" ng-model="' +el_model+ '" placeholder="' +item.default+ '">'+ item.value +'</textarea>';
                template = '<textarea placeholder="' +item.default+ '">'+ item.value +'</textarea>';
                break;
        }
        return template;
    }
    return {
        scope: {
            item: '=myCustomer',
            myModel: '='
        },
        restrict: 'A',
        require: 'ngModel',
        replace: true,
        link: function(scope, element, attrs, myModel) {
            //Pass attr to html template
            var el_class = element.attr('class');
            var el_model = element.attr('ng-model');

            var template = getTemplate(scope.item, el_class, myModel);
          // var attributes = $(element).prop("attributes");
            var $div= $(element).find(scope.item.type);
           // element.html(template);
          // $compile(element.contents())(scope);

//            $.each(attributes, function () { //loop over all attributes and copy them to the <input/>
//                $div.attr(this.name, this.value);
//                console.log('name: '+this.name+' ; value: '+this.value);
//            });

            console.log('el_model: '+myModel+' ; el_class: '+scope.item.default);

           element.replaceWith(template); // Replace the DOM
            element = template;            // Replace the 'element' reference

        }
//        ,
//        compile: function compile(tElement, tAttrs) {
//            return function (scope, iElement, iAttrs) {
//                var attributes = $(iElement).prop("attributes");
//                var $input = $(iElement).find("div");
//                $.each(attributes, function () { //loop over all attributes and copy them to the <input/>
//                   // if (this.name !== "class") {
//                        $input.attr(this.name, this.value);
//                   // }
//                });
//                $compile($input)(scope);  //compile the input
//            };
//        }
    };
});


app.directive('myCustomer', function($compile) {
var getTemplate = function(item, el_class, el_model){
    var template = '';
    var el_disabled = item.override ? 'disabled' : 'disabled="disabled"';
    //ng-disabled="' +!item.override+ '"

    switch(item.type) {
        case 'text':
            //template = '<input ng-disabled="' +!item.override+ '" class="' +el_class+ '" ng-model="' +el_model+ '" type="' +item.type+ '" value="' +item.value+ '" placeholder="' +item.default+ '">';
            template = '<input class="' +el_class+ '" type="' +item.type+ '" value="' +item.value+ '" placeholder="' +item.default+ '">';
            break;
        case 'textarea':
            //template = '<textarea class="' +el_class+ '" ng-model="' +el_model+ '" placeholder="' +item.default+ '">'+ item.value +'</textarea>';
            template = '<textarea class="' +el_class+ '" placeholder="' +item.default+ '">'+ item.value +'</textarea>';
            break;
    }
    return template;
}
return {
    scope: true,
    restrict: 'A',
    link: function(scope, element, attrs) {
        //Pass attr to html template
        var el_class = element.attr('data-class');
        var el_model = element.attr('model');



        var template = getTemplate(scope.settings, el_class, el_model);

//            element.replaceWith(template); // Replace the DOM
//            element = template;            // Replace the 'element' reference

        element.html(template);
        $compile(element.contents())(scope);

    },
    controller:function($scope,$attrs)  {

        $scope.x=$attrs;

        $scope.$watch('settings_value_changed',function(){
            $scope.myModel[$attrs.name]=$scope.settings_value_changed;
        }) ;

        $scope.settings_value_changed=$attrs.value;
    },
    replace: true,
    priority: 100

};

});
