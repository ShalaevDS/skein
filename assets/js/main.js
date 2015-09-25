/**
 * Created by Max on 17.09.2015.
 */
$(document).ready(function(){
    $('#before-load').animate({"opacity":"0"},3000,function(){
        $('#before-load').remove()
    });
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
    $('#contact-form-modal').on('show.bs.modal', function (e) {
        $('#header,#cookie-warning').addClass('modal-active');
    });
    $('#contact-form-modal').on('hidden.bs.modal', function (e) {
        $('#header,#cookie-warning').removeClass('modal-active');
    });
    $(window).scroll(function() {
        var fromTop = parseInt($('#header').height());
        if($(window).scrollTop() > fromTop ) {
            $('#to-top').addClass('needed');
        }
        else {
            $('#to-top').removeClass('needed');
        }
    });
});