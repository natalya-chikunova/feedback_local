$(document).ready(function(){

    if ($('#nestable').length) {
        // activate Nestable for list 1
        $('#nestable').nestable({
            group: 1
        });

        $('#nestable-menu').on('click', function(e) {
            var target = $(e.target),
                action = target.data('action');
            if (action === 'expand-all') {

                $('.dd').nestable('expandAll');
            }
            if (action === 'collapse-all') {
                $('.dd').nestable('collapseAll');
            }
        });
    }

});