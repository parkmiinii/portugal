$(function(){
    btnToggle();
    popupControl();
    tabControl();
    main_bx();
    fadeBoxControl();
})

function btnToggle(){
    $("header > nav > button").click(function(){
        $(this).parent().toggleClass("active");
    });
    
}

document.addEventListener("DOMContentLoaded", function(){
    var counterElement = document.getElementById("counter");
    var currentNumb = 1;
    var lastScrollY = 0;
    var interval = 1530;
    var exceptHeight = $('.mainBg').height() + 800;

    if(window.matchMedia('(min-width: 768px) and (max-width:1279px)').matches){
        interval = 1250;
        exceptHeight = $('.mainBg').height() + 300;
    }else if(window.matchMedia('(max-width:767px)').matches){
        interval = 800;
        exceptHeight = $('.mainBg').height() + 100;
    };

    window.addEventListener("scroll",function(){
        var scrollY = window.scrollY;
        // console.log(scrollY);

        if(scrollY > lastScrollY && scrollY - exceptHeight >= currentNumb * interval && currentNumb < 10) {
            currentNumb++;
            counterElement.textContent = currentNumb;
        }
        else if(scrollY < lastScrollY && scrollY - exceptHeight < (currentNumb - 1) * interval && currentNumb > 1) {
            currentNumb--;
            counterElement.textContent = currentNumb;
        }

        lastScrollY = scrollY;
    });

    
});

function fadeBoxControl(){
    var fadeBox = document.querySelectorAll(".fade_right");

    const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target); // 한 번만 실행하고 중단 (선택 사항)
        }
    });
    }, {
    threshold: 0.3 // 화면에 10% 보이면 트리거
    });

    fadeBox.forEach(img => {
    observer.observe(img);
    });
    fadeBox.forEach(div => {
    observer.observe(div);
    });
}

function popupControl(){
    var currentPopup = null;
    $("main > div:last-of-type > ul > li > div > button").click(function(){
        currentPopup = "." + $(this).attr("data-popup"); 
        $(currentPopup).addClass("active");
        // window.alert("ok");

        // $(".bxslider").bxSlider('destroy');

        $(".bxslider").bxSlider({
            minSlides: 1,
            maxSlides: 1,
            adaptiveHeight: true,
            speed: 500,
            pause: 7000,
            auto: true,
            pager: true,
            control: true,
            infiniteLoop: true
        });
        // window.alert("bx ok");
    });

    $(".btn_close").click(function(){
        $(currentPopup).removeClass("active");
        location.reload();
    });
}

function tabControl(){
    var activeTab = null;
    $(".detailContainer > ul > li > button").click(function(){ 
        activeTab = "." + $(this).attr("data-tab");
        $(".detailContainer > ul > li > button").removeClass("active");
        $(this).addClass("active");
        $("[class*='Tab']").removeClass("active");
        $(activeTab).addClass("active");
    });
}

function main_bx(){
    $(".main_bxslider").bxSlider({
        auto: true,
        pager: false,
        controls: false,
        speed: 1000,
        pause: 7000,
        margin: 0,
        touchEnabled: false,
        infiniteLoop: true
    });
}

window.addEventListener("scroll",function(){

    if(window.matchMedia('(max-width: 767px)').matches){
        $("main > div:last-of-type > div").addClass("bgChange");
        
        var changeColor = document.querySelector('.bgChange');

        if(changeColor){
            var targetHeight = changeColor.getBoundingClientRect();
            
            if(targetHeight.top <= 0){
                changeColor.style.background = 'rgba(255, 255, 255, 0.8)';
                $(".bgChange").css('box-shadow','0px 3px 10px rgba(100, 100, 100, 0.1)')
            }else{
                changeColor.style.background = '';
                $(".bgChange").css('box-shadow','')
            }
        };
    };
})

