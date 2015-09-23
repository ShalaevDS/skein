(function($) {
    $(document).ready(function () {

        //mobile view body class
        var isMobile = {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
            },
            any: function() {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
        };
        if(isMobile.iOS() || isMobile.Android() || isMobile.Windows()){
            jQuery('body').addClass('mobile');
        }
        if( isMobile.iOS() )
        {
            jQuery('body').addClass('ios');
        }
        if( isMobile.Android() )
        {
            jQuery('body').addClass('android');
        }
        if( isMobile.Windows() )
        {
            jQuery('body').addClass('windows');
        }

        //show / hide top menu
        jQuery('.show-menu-btn').on('click', function(){
            jQuery(this).toggleClass('active');
            jQuery(this).parent().prev('ul.top-menu').slideToggle(300).toggleClass('toggled');
        });

        //sub menu
        jQuery(function () {
            jQuery('.top-menu li').has('ul.top-menu-sub').mouseover(function () {
                jQuery(this).addClass('active-sub');
                jQuery(this).children().addClass('active-sub-link');
            }).mouseout(function () {
                jQuery(this).removeClass('active-sub');
                jQuery(this).children().removeClass('active-sub-link');
            });
        });

        //modal window
        function showHideModal(trig,targ){
            jQuery(trig).on('click touchstart', function(e){
                e.preventDefault();
                jQuery(targ).addClass('open');
                if (jQuery(window).width() <= 750){
                    jQuery("html, body").animate({scrollTop: 0}, "slow");
                }
            });
            jQuery(this).keydown(function (eventObject) {
                if (eventObject.which == 27){
                    jQuery(targ).removeClass('open');
                }
            });
            jQuery('.close-modal').click(function(){
                jQuery(targ).removeClass('open');
            });
            jQuery(targ).on('click touchstart', function (e) {
                if (!jQuery(e.target).parents().hasClass('modal-wrap') && !jQuery(e.target).hasClass('modal-wrap')) {
                    jQuery(targ).removeClass('open');
                }
            });
        }
        //modal window elements (click, target modal)
        showHideModal('.open-author-modal', '.author-modal');
        showHideModal('.open-search-modal', '.search-modal');

        //height calc
        var contentHeight = jQuery(".content").height(),
            sbItem = jQuery(".sidebar"),
            sbItemHeight = jQuery(sbItem).height(),
            authorModalInfo = jQuery('.author-modal-content'),
            mainWidgetHeight = jQuery(".widgets-h-box").outerHeight(),
            floatBanner = jQuery('.float-banner');

        if (jQuery(window).width() >= 1000){
            if( sbItemHeight < contentHeight ) {
                jQuery(sbItem).css({'height': (contentHeight + 5)});
                jQuery(sbItem).find ('.bottom-sb-position').addClass('bottom-fixed');
            }
        }
        if( authorModalInfo.height() >= '200' ) {
            jQuery(authorModalInfo).addClass('scroll-box');
        }

        //float widget
        if( (contentHeight + 300) > mainWidgetHeight ) {
            floatBanner.fadeIn(200);
            jQuery(function(){
                jQuery(window).scroll(function() {
                    var top = jQuery(document).scrollTop();
                    if (top > (mainWidgetHeight + 60)) {
                        jQuery(floatBanner).addClass('fixed-add');
                    }
                    else {
                        jQuery(floatBanner).removeClass('fixed-add');
                    }
                });
            });
        }


        //media queries
        if ( jQuery(window).width() <= 1250){
            jQuery('.widget.popular .widget-title, .widget.single-author-widget .widget-title').addClass('line');
        }

        //bx slider settings
        var mainSlider = jQuery('.bx-mainslider');
        var floatSlider = jQuery('.float-slider');

        if(jQuery(mainSlider).length){
            jQuery(mainSlider).bxSlider({
                controls: false,
                mode: 'fade',
                speed: 1500,
                pause: 5000,
                auto:true,
                useCSS:false,
                tickerHover:true,
                autoHover: true,
                adaptiveHeight: false,
                onSliderLoad: function(currentIndex){
                    jQuery(mainSlider).find('.mainslider-item').eq(currentIndex).addClass('current');
                },
                onSlideAfter: function(slideElement, oldIndex, newIndex){
                    jQuery(mainSlider).find('.mainslider-item').eq(oldIndex).removeClass('current');
                    jQuery(mainSlider).find('.mainslider-item').eq(newIndex).addClass('current');
                }
            });
        }

        if(jQuery(floatSlider).length){
            jQuery(floatSlider).bxSlider({
                controls: false,
                mode: 'fade',
                speed: 1500,
                pause: 3000,
                auto:true,
                useCSS:false,
                tickerHover:true,
                autoHover: true,
                adaptiveHeight: false
            });
        }

        //deselect
        jQuery(document).on('click', '.de-select2 dt', function(){
            var parent = jQuery(this).parent();
            if(jQuery(this).hasClass('active')){
                jQuery(document).find('.de-select2').find('dt').removeClass('active');
                jQuery(this).removeClass('active');
            }
            else{
                jQuery(document).find('.de-select2').find('dt').removeClass('active');
                jQuery(this).addClass('active');
                if(jQuery(this).parent().hasClass('scrollable')){
                    if(!jQuery(this).parents('.de-select2').find('.scroll-cont').hasClass('jspScrollable')){
                        jQuery(this).parents('.de-select2').find('.scroll-cont').jScrollPane();
                    }
                }
            }
        });
        jQuery(document).on('click', '.de-select2 dd a', function(){
            var parent = jQuery(this).parents('.de-select2'), trigger = parent.find('dt');
            if(!jQuery(this).hasClass('current')){
                console.log('click');
                parent.find('a').removeClass('current');
                jQuery(this).addClass('current');
                trigger.removeClass('active').html(jQuery(this).html());
            }
            return false;
        });

        jQuery(document).on('click', function(e) {
            if (!jQuery(e.target).parents().hasClass('de-select2') && !jQuery(e.target).hasClass('de-select2') && !jQuery(e.target).parents().hasClass('de-select-tab') && !jQuery(e.target).hasClass('de-select-tab')) {
                jQuery('.de-select2 dt, .de-select-tab dt').removeClass('active');
            }
        });

        //hover action
        jQuery('.post-item-thumb img, .post-title, .similar-questions .post-excerpt, .advertising-target').hover(
            function () {
                jQuery(this).parent().parent().addClass('hover-add');
            },
            function () {
                jQuery(this).parent().parent().removeClass('hover-add');
            }
        );

        jQuery('.post-item-thumb a img, .advertising-target-btn').hover(
            function () {
                jQuery(this).parent().parent().parent().addClass('hover-add');
            },
            function () {
                jQuery(this).parent().parent().parent().removeClass('hover-add');
            }
        );
        jQuery('.play-btn').hover(
            function () {
                jQuery(this).parent().addClass('hover-add');
            },
            function () {
                jQuery(this).parent().removeClass('hover-add');
            }
        );
        jQuery('.content-post-item').hover(
            function () {
                jQuery(this).addClass('hover-add');
            },
            function () {
                jQuery(this).removeClass('hover-add');
            }
        );

        jQuery('#show-que-form').on('click', function(){
            jQuery(this).parent().parent().parent().hide();
            jQuery(this).parent().parent().parent().next('.new-question-wrap').fadeIn(300)
        });

        //fixed follow bar
        jQuery(function(){
            jQuery(window).scroll(function() {
                var top = jQuery(document).scrollTop();
                if (top > 101) {
                    jQuery('.social-follow-list').addClass('fixed-add');
                }
                else {
                    jQuery('.social-follow-list').removeClass('fixed-add');

                }
            });
        });

    });
})(jQuery);