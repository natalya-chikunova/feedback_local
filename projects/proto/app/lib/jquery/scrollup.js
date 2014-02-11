//Show success notification
$(".btn-primary").on("click", function () {
    $('.alert-danger').hide();
    $('.alert-info').hide();

    var screenTop = $(document).scrollTop();
    $('.alert-success').css({'top': screenTop*1+60});
    $('.alert-success').toggle();
    if ($(".alert-success").is(":visible"))  $('.alert-success').fadeOut(1500);
});

//Show delete notification
$(".btn-danger").on("click", function () {
    $('.alert-success').hide();
    $('.alert-info').hide();

    var screenTop = $(document).scrollTop();
    $('.alert-danger').css({'top': screenTop*1+60});
    $('.alert-danger').fadeToggle();
    if ($(".alert-danger").is(":visible"))  $('.alert-danger').fadeOut(1500);
});

//Show info notification
$(".thumbnail a[role=menuitem]").on("click", function (event) {
    event.preventDefault();
    $('.alert-success').hide();
    $('.alert-danger').hide();

    var screenTop = $(document).scrollTop();
    $('.alert-info').css({'top': screenTop*1+60});
    $('.alert-info').fadeToggle();
    if ($(".alert-info").is(":visible"))  $('.alert-info').fadeOut(1500);
});

//Scroll top
$(document).ready(function () {

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $('.scrollup').click(function () {
        $("html, body").animate({ scrollTop: 0 }, 500);
        return false;
    });

    //Survey autocomplete
    $('.clear-search').on('click', function(){
        $('#autocomplete').val('');
    });


//Show preview modal
    $('.modal-preview').on('click',function(event){
        event.preventDefault();
        $('#modal-question-preview').modal('show');
    });

//Move nestable answers
    $('.modal-answer-edit').on('click',function(event){
        event.preventDefault();
        $('#modal-question-answer-edit').modal('show');
    });

    //Toggle Sliding pabel
    $('.show-sliding-panel').on('click', function(){
        $('#sliding-panel').toggle();
        answersViewUpdate();
    });

    //Question Sliding panel
   //Update text values
    $("input.form-control:text, textarea.form-control" ).on('keyup', function(){
        var txt = $(this).val();
        var name_val = $(this).attr('name');
        questionViewUpdate(txt, name_val);
    });
    //Update checkbox options
    $("input[name='question_required']" ).on('change', function(){
        var txt = $(this).parent().text();
        var name_val = $(this).attr('name');
        questionViewUpdate(txt, name_val);
    });
    //Display answers
    $("select[name='question_show'], select[name='quesion_type'], input[name='question_multichoice']").on('change', function(){
        answersViewUpdate();
    });
    $("input.router-pointer:text").on('keyup', function(){
        answersViewUpdate();
    });


    //Move Sliding panel on window scroll
   if($('#sliding-panel').length) {
        var el = $('#sliding-panel');
        var originalElPos = el.offset().top;
        //run on scroll
        $(window).scroll(function(){
            var windowPos = $(window).scrollTop();
            var finalDestination = windowPos + originalElPos;
            el.stop().animate({'top': finalDestination}, 500);
        });
   }
    //Slidedown languages settings panel
    $("input[name='language_enabled']").on('change', function(){
       $('.languages-block').slideDown();
    });
    $(".languages-block .close").on('click', function(){
        $('.languages-block').slideUp();
    });

    //Design thumbnails hover
    $("[rel='tooltip']").tooltip();

    //Sidedown design settings block
    $(".design_edit_panel").on('click', function(){
       $('.design-block').slideDown();
    });
    $(".design_edit_panel_close").on('click', function(){
        $('.design-block').slideUp();
    });

    //Design toggle HTML view
    $(".design_edit_html_contol").on('click', function(){
        $('.design_edit_html').fadeToggle();
    });

    //Toggle answers panel
    $(".hide_answers_block").on('click', function(){
        $(this).parent().next().slideToggle();
        $(this).toggleClass("rotate_180");
    });

    //Toggle queue panel
    $('.close_block').on('click', function(){
        $('.queue_edit_block').slideUp();
    });
    $('.queue_edit').on('click', function(){
        $('.queue_edit_block').slideDown();
    });

    //Toggle queue panel
    $('.exporer_close_block').on('click', function(){
        $('.exporer_edit_block').slideUp();
    });
    $('.exporter_edit').on('click', function(){
        $('.exporer_edit_block').slideDown();
    });
    $('.add-exporters-settings').on('click', function(){
        $('.exporters-settings-table').prepend( '<tr class="test"><td><input type="text" value="" placeholder="Enter Title"></td>'+'<td><select><option value="1">System value</option><option value="2">Import data value</option><option value="3">Predefined value</option><option value="4">Response by question ext...</option></select></td>'+'<td><input type="text" value="" placeholder="Enter Column"></td>'+'<td><button class="btn btn-sm btn-warning remove-new-settings" onclick="removeCurrentRow(this);"><span class="glyphicon glyphicon-remove-circle"></span><span class="glyphicon-class"></span></button></td><td><button type="button" class="btn btn-primary" data-dismiss="modal">Save</button></td>'+'</tr>' );
    });

});

function removeCurrentRow(obj){
    $(obj).parent().parent("tr:first").remove();
}

function answersViewUpdate(){
    //If no answer values
    if(!$("#nestable .dd-handle").length) return;

    var listHtml = '';
    var answerWidth = 100 / parseInt($("#nestable .dd-handle").length);
    var type = $("select[name='quesion_type']").val();
    var opt = $("select[name='question_show']").val();
    var inputType = $("input[name='question_multichoice']" ).prop('checked') === true ? '<input type="checkbox" value="1">' : '<input type="radio" value="1">';

    $("#nestable .dd-handle").each(function( index ) {

        var answerTitle = $( this ).text();
        var answerOption = $( '.router-pointer', this ).val();
        if(type == 2 || type == 3 || type == 5) {
            listHtml+= '<div>' + answerTitle+': '+ answerOption+'</div>';
            listHtml+= '<textarea  class="form-control" rows="2"></textarea>';
        } else {
            if(opt == 2 || opt == 3) {
                listHtml+= '<div style="display: inline-block; padding: 5px; width: '+answerWidth+'%;">' + inputType+' '+ answerTitle+': '+ answerOption+'</div>';
            } else {
                listHtml+= '<div style="padding: 5px;">' + inputType+' '+ answerTitle+': '+ answerOption+'</div>';
            }
        }
    });
    $('.question_answers_preview').html(listHtml);
}

function questionViewUpdate(txt, name_val){
    if ( $('.'+name_val+'_preview').length ) {
        $('.'+name_val+'_preview').text(txt);
    }
}




