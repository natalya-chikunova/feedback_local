'use strict';

/* Directives */

app.directive('formField', function($compile, $parse) {
    return {
        restrict: 'E',
        compile: function(element, attrs) {
            var fieldGetter = $parse(attrs.field);
            return function (scope, element, attrs) {
                var template, field, id, ng_class, field_type;
                ng_class = " 'has-warning' ";
                field = fieldGetter(scope);
                id = 'field-' + field.id;

                scope.addMultiValue = function() {
                    this.field.value.push({type:'multi_text', value:''});

                };
                scope.removeMultiValue = function(index) {
                    scope.field.value.splice(index, 1);

                };


                switch(field.type) {

                    case 'text':
                        field_type = '<div class="col-sm-11">'+
                            ' <input class="form-control col-sm-11" ng-change="field_changed=true" ng-model="field.value" placeholder="{{field.default}}" type="text" '+
                            ' ng-disabled="!field.override" >'+

                            '</div><div class="col-sm-1">'+
                            '<button ng-show="field_changed" type="button" class="btn btn-warning">'+
                            '<span class="glyphicon glyphicon-warning-sign"></span></button>'+
                            '</div>';
                        break;

                    case 'textarea':
                        field_type = '<div class="col-sm-11">'+
                            ' <textarea class="form-control" ng-change="field_changed=true" ng-model="field.value" placeholder="{{field.default}}" ' +
                            ' ng-disabled="!field.override" ></textarea>'+

                            '</div><div class="col-sm-1">'+
                            '<button ng-show="field_changed" type="button" class="btn btn-warning">'+
                            '<span class="glyphicon glyphicon-warning-sign"></span></button>'+
                            '</div>';
                        break;

                    case 'wysiwyg':
                        field_type = '<div class="col-sm-11">'+
                            '<button ng-disabled="!field.override" type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-wysiwyg"><i class="fa fa-lg fa-pencil-square-o"></i> Expand editor</button>'+
                            '<textarea class="tmce form-control" rows="6" ng-model="field.value" placeholder="{{field.default}}" ' +
                            ' ng-disabled="!field.override" ></textarea>'+

                            '</div><div class="col-sm-1" style="padding-top: 35px">'+
                            '<button ng-show="field.value" type="button" class="btn btn-warning">'+
                            '<span class="glyphicon glyphicon-warning-sign"></span></button>'+
                            '</div>';
                        break;

                    case 'radio':
                        field_type = '<div class="col-sm-11">'+
                            '<label class="col-sm-12" ng-repeat="r in field.value">'+
                            ' <input ng-disabled="!field.override" ng-model="field.selected" type="radio" selected="r.selected" name="' + id + '" ng-value="r.radio_id" />{{ r.radio_name }}'+
                            '</label>'+

                            '</div><div class="col-sm-1">'+
                            '<button ng-show="field.selected" type="button" class="btn btn-warning">'+
                            '<span class="glyphicon glyphicon-warning-sign"></span></button>'+
                            '</div>';
                        break;

                    case 'checkbox':
                        field_type = '<div class="col-sm-11">'+
                            '<label class="col-sm-12"><input ng-init="field.default" ng-checked="field.value" ng-change="field_changed=true" type="checkbox" class="form-control" ng-model="field.value"'+
                            ' ng-disabled="!field.override" ></label>'+
                            //value="field.value"

                            '</div><div class="col-sm-1">'+
                            '<button ng-show="field_changed" type="button" class="btn btn-warning">'+
                            '<span class="glyphicon glyphicon-warning-sign"></span></button>'+
                            '</div>';
                        break;

                    case 'select':
                        field_type = '<div ng-class="{'+ng_class+': dropdown_changed!=field.default }" class="col-sm-11">'+
                            ' <select class="form-control" ng-init="dropdown_changed=field.selected" ng-model="field.selected" ' +
                            ' ng-disabled="!field.override" '+
                            '  ng-options="o.option_id as o.option_name for o in field.value"></select>'+
                            //dropdown_changed

                            '</div><div class="col-sm-1">'+
                            '<button ng-show="field.selected!=field.default" type="button" class="btn btn-warning">'+
                            '<span class="glyphicon glyphicon-warning-sign"></span></button>'+
                            '</div>';
                        break;

                    case 'multi_values':
                        field_type = '<div class="col-sm-11">'+
                            '<label class="col-sm-12" ng-repeat="m in field.value">'+
                            '<div class="col-sm-10">'+
                            ' <input class="form-control" ng-change="field_changed=true" ng-model="m.multi_name" placeholder="{{m.multi_default}}" value="{{m.multi_name}}" type="text" '+
                            ' ng-disabled="!field.override" >'+

                            '</div><div class="col-sm-1" ng-show="$index>0">'+
                            '<button ng-click="removeMultiValue($index)" type="button" class="btn btn-danger">'+
                            '<span class="glyphicon glyphicon-minus"></span></button>'+

                            '</div><div class="col-sm-1">'+
                            '<button ng-show="field_changed" type="button" class="btn btn-warning">'+
                            '<span class="glyphicon glyphicon-warning-sign"></span></button>'+
                            '</div></label>'+

                            '</div><div class="col-sm-1">'+
                            '<button  ng-disabled="!field.override" ng-click="addMultiValue()" type="button" class="btn btn-success"><span class="glyphicon glyphicon-plus"></span></button>'+
                            '</div>';
                        break;

                }

                template = [
                    '<div class="form-group" ng-class="{'+ng_class+': field_changed }">',
                    ' <label class="col-sm-12" style="font-weight: 100">',
                        ' <input ng-checked="field.override" ng-click="field.override=!field.override" ng-value="field.override" type="checkbox" style="margin-right: 7%">',
                        field.name,
                        '</label>',
                    field_type,
                    '</div>'
                ].join('');
                element.replaceWith($compile(template)(scope));
            }
        }
    }
});