(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Fixed Navbar
    $(window).scroll(function () {
        if ($(window).width() < 992) {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-dark shadow');
            } else {
                $('.fixed-top').removeClass('bg-dark shadow');
            }
        } else {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-dark shadow').css('top', -45);
            } else {
                $('.fixed-top').removeClass('bg-dark shadow').css('top', 0);
            }
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Causes progress
    $('.causes-progress').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });

    function updateCustomAmount(amount) {
        document.getElementById('custom-amount').value = amount;
    }

    function clearRadioButtons() {
        var radios = document.getElementsByName('amount');
        for (var i = 0; i < radios.length; i++) {
            radios[i].checked = false;
        }
    }

    function updateCurrencySymbol() {
        var currencySelect = document.getElementById('currency');
        var selectedOption = currencySelect.options[currencySelect.selectedIndex];
        var symbol = selectedOption.getAttribute('data-symbol');

        document.getElementById('label-amount-10').textContent = symbol + '10';
        document.getElementById('label-amount-50').textContent = symbol + '50';
        document.getElementById('label-amount-100').textContent = symbol + '100';

        // If a radio button is selected, update the custom amount value to reflect the new currency symbol
        var selectedAmount = document.querySelector('input[name="amount"]:checked');
        if (selectedAmount) {
            document.getElementById('custom-amount').value = selectedAmount.value;
        }
    }

    // Initialize the currency symbol on page load
    document.addEventListener('DOMContentLoaded', function() {
        updateCurrencySymbol();
    });
    
})(jQuery);

