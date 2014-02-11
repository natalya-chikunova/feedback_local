//$(function(){
$(document).ready(function(){
    var surveys = [
        { value: 'Survey test 1', data: '281' },
        { value: 'Survey test 2', data: '282' },
        { value: 'Survey test 3', data: '283' },
        { value: 'Survey test 4', data: '284' },
        { value: 'Survey test 5', data: '285' },
        { value: 'Survey test 6', data: '286' },
        { value: 'Survey test 7', data: '287' },
        { value: 'Survey test 8', data: '288' },
        { value: 'Survey test 9', data: '289' }
    ];
//console.log('done');
    // setup autocomplete function pulling from surveys[] array
    $('#autocomplete').autocomplete({
        lookup: surveys,
        onSelect: function (suggestion) {
            var thehtml = suggestion.value;
            $('#outputcontent').html(thehtml);
        }

    });


});