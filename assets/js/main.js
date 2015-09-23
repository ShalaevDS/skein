/**
 * Created by Max on 17.09.2015.
 */
$(document).ready(function(){
    $('#close-warning').click(function(){
        $(this).parent().remove();
        return false;
    });
    $('#home-lower-slider').bxSlider({
        mode : 'fade',

        onSliderLoad: function(){
            $('.bx-pager-link').each(function(){
                var numb = $(this).html();
                $(this).attr('data-index-numb', numb);
                $(window).resize();
            });

        }
    });





    $('#show-nav-xs').click(function(){
        $('#top-nav-list').toggleClass('open');
        $('#nav-close-icon').toggleClass('open');
    });
    $('#top-nav-list,#nav-close-icon').click(function(event){
        var target = event.target;
        if (target == this) {
            $('#top-nav-list').removeClass('open');
            $('#nav-close-icon').removeClass('open');
        }
    });
    $('#contact-file').click(function(){
        $(this).prev().click();
        return false;
    });
    var num = parseInt($.cookie("visit")|| 0) + 1;
    $.cookie("visit", num);
    if (num>1){
        $('#close-warning').parent().remove();
    }

});