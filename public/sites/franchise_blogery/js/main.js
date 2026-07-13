/* == Main Selector == */

$(document).ready(function() {
    function initSelector(currSelector) {
        var currLayer, aim, currBtn;
        $(currSelector + ' .selectorPanel__tabs .tab').each(function() {
            if($(this).hasClass('active')) {
                currBtn = $(this);
                aim = currBtn.attr('data-aim');
                currLayer = $(currSelector + ' .selectorPanel__layers div[data-layer="'+ aim +'"]');
                currLayer.show();
    
                return false;
            }
        });
    
        $(currSelector + ' .selectorPanel__tabs .tab').click(function() {
            if(!($(this).hasClass('active'))) {
                currLayer.toggle();
                currBtn.removeClass('active');
                currBtn = $(this);
                aim = currBtn.attr('data-aim');
                $(this).addClass('active');
                currLayer = $(currSelector + ' .selectorPanel__layers div[data-layer="'+ aim +'"]');
                currLayer.toggle();
            }
        });
    
        $(currSelector + ' .selectorPanel__tabs .nav').click(function() {
            $(currBtn).removeClass('active');
            currLayer.toggle();
    
            var nextAim = aim;
    
            if($(this).hasClass('prev')) {
                if(aim == 1) {
                    nextAim = $(currSelector + ' .selectorPanel__tabs .tab').length;
                } else {
                    nextAim = Number(aim) - 1;
                }
            } else {
                if(aim !== $(currSelector + ' .selectorPanel__tabs .tab').length) {
                    if(aim !== $('.selectorPanel__tabs .tab').length) {
                    nextAim = Number(aim) + 1;
                    }
                } else {
                    nextAim = 1;
                }
            }
    
            aim = nextAim;
            currBtn = $(currSelector + ' .selectorPanel__tabs .tab[data-aim="'+ nextAim +'"]');
            currBtn.addClass('active');
            currLayer = $(currSelector + ' .selectorPanel__layers div[data-layer="'+ nextAim +'"]');
            currLayer.toggle();
    
        });
    }

    initSelector('#businessSelector');
    initSelector('#resultSelector');
});

/* == Line Runner == */
$(document).ready(function() {
    var numberRunner = document.getElementById('numberRunner');
    var revenueRunner = document.getElementById('revenueRunner');
    var profitRunner = document.getElementById('profitRunner');

    noUiSlider.create(numberRunner, {
        start: [0],
        step: 1,
        range: {
            'min': [0],
            'max': [3]
        }
    });

    noUiSlider.create(revenueRunner, {
        start: [0],
        step: 1,
        range: {
            'min': [0],
            'max': [3]
        }
    });

    noUiSlider.create(profitRunner, {
        start: [0],
        step: 1,
        range: {
            'min': [0],
            'max': [3]
        }
    });

    function showPointers(val) {
        $('.lineRunner:not(.fixed) .label span').css('opacity', '0');
        if(val == 1) {
            $('.lineRunner .label .l15').css('opacity', '1');
        } else if(val == 2) {
            $('.lineRunner .label .l40').css('opacity', '1');
        } else if(val == 3) {
            $('.lineRunner .label .right').css('opacity', '1');
        }

        return false;
    }

    numberRunner.noUiSlider.on('change', function() {
        revenueRunner.noUiSlider.set(this.get());
        profitRunner.noUiSlider.set(this.get());
        showPointers(this.get());
    });

    revenueRunner.noUiSlider.on('change', function() {
        numberRunner.noUiSlider.set(this.get());
        profitRunner.noUiSlider.set(this.get());
        showPointers(this.get());
    });

    profitRunner.noUiSlider.on('change', function() {
        numberRunner.noUiSlider.set(this.get());
        revenueRunner.noUiSlider.set(this.get());
        showPointers(this.get());
    });
});

/* == Custom JS == */

function sendForm(form, url) {
    $.ajax({
        url: url,
        type: "POST",
        dataType: "html",
        data: $(form).serialize(),
        success: function(response) {
            console.log('Form: ', $(form));
            $(form).html('<div class="requestSuccess"><img src="img/success.png"><h2>Спасибо!</h2><h3>Ваша заявка отправлена</h3><span>Долго ждать? Наберите нас прямо сейчас<b>+7-909-967-77-97</b></span></span></div>');
            var goalName = $(form).attr('data-goal');
            // Take goal Google and Yandex
            gtag('event', goalName, {'event_category': 'Forma', 'event_action': goalName});
            yaCounter53245720.reachGoal(goalName);
            // Send mail.ru goal
            var _tmr = window._tmr || (window._tmr = []);
            _tmr.push({ id: "3119328", type: "reachGoal", goal: goalName, value: 1 });
            console.log(goalName);
            // Show Results
            result = $.parseJSON(response);
        },
        error: function(response) { // Error Message
            alert('Ошибка! Данные не отправлены, попробуйте позже.')
            // $('#result_form').html('Ошибка. Данные не отправлены.');
        }
     });
}

$('#Raschet, #Raschet2').click(function() {
    var currForm = $(this).closest('form');
    sendForm(currForm, '/savecalc.php');
    window.open('/presentation.pdf', '_blank');
    return false;
});

$('#Zayavka, #Zayavka2, #Zvonok, #Podrobnee, #Kontakty').click(function() {
    var currForm = $(this).closest('form');
    sendForm(currForm, '/mail.php');
    console.log('ETO' + currForm);
    return false;
});

$('form').find('input[name="phone"]').each(function() {
    $(this).mask("+7(999) 999-9999");
});

$('.rmWrapper').readmore({
    speed: 75,
    collapsedHeight: 200,
    moreLink: '<a href="#" class="readMore makeAdjust">Подробнее...</a>',
    lessLink: '<a href="#" class="readMore makeAdjust">...Скрыть</a>'
});

$(document).ready(function(){
    $(".makeScroll").on("click", function (event) {
        event.preventDefault();
        if($(this).attr('data-aim')) {
            var id  = $(this).attr('data-aim'),
            top = $(id).offset().top;
            $('body, html').animate({scrollTop: top}, 1500);
        }
    });
});

$(document).ready(function() {
    $('.trigger').click(function() {
        var currForm = '.' + $(this).attr('data-form');
        $(currForm).toggleClass('open');
        $(currForm).children('.page-wrapper').toggleClass('blur-it');
        return false;
    });

    $('.closeModal').click(function() {
        $('.modal-wrapper').removeClass('open');
        $('.page-wrapper').removeClass('blur-it');
        return false;
    });
});

$(document).ready(function() {
    $('#owlFirst').owlCarousel({
        center: true,
        items:3,
        loop:true,
        autoplay: true,
        video:true,
        margin:10,
        responsive:{
            600:{
                items:2
            },
            0:{
                items:1
            }
        }
    });

    $('#owlSecond').owlCarousel({
        center: true,
        items:3,
        loop:true,
        autoplay: true,
        video:true,
        margin:10,
        responsive:{
            600:{
                items:2
            },
            0:{
                items:1
            }
        }
    });

    $('#owlPartners').owlCarousel({
        items:4,
        loop:true,
        autoplay: true,
        nav: true,
        margin: 10,
        responsive:{
            1200: {
                items:4
            },
            900:{
                items:3
            },
            600:{
                items:2
            },
            0:{
                items:1
            }
        }
    });
});


function youTubes_makeDynamic() {
    var $ytIframes = $('iframe[src*="youtube.com"]');
    $ytIframes.each(function (i,e) {
        var $ytFrame = $(e);
        var ytKey; var tmp = $ytFrame.attr('src').split(/\//); tmp = tmp[tmp.length - 1]; tmp = tmp.split('?'); ytKey = tmp[0];
        var $ytLoader = $('<div class="ytLoader">');
        $ytLoader.append($('<img class="cover" src="https://i.ytimg.com/vi/'+ytKey+'/hqdefault.jpg">'));
        $ytLoader.append($('<i class="fab fa-youtube"></i>'));
        $ytLoader.data('$ytFrame',$ytFrame);
        $ytFrame.replaceWith($ytLoader);
        $ytLoader.click(function () {
            var $ytFrame = $ytLoader.data('$ytFrame');
            $ytFrame.attr('src',$ytFrame.attr('src')+'?autoplay=1');
            $ytLoader.replaceWith($ytFrame);
        });
    });
}

$(document).ready(function () {youTubes_makeDynamic();});