Room.Page = {};
Room.Page.dom = function(){

    $$("#menu1").click(function(){
        Emit(0x04+0x40);
        mp3_stop();
        mp3_play("click2");
        Page1();
    });

    $$("#menu2").click(function(){
        Emit(0x01+0x18+0x10);
        mp3_stop();
        mp3_play("click2");
        Page2();
    });

    $$("#menu3").click(function(){
        Emit(0x02+0x20);
        mp3_stop();
        mp3_play("click2");
        Page3();
    });

    $$("#page1 .back").click(function(){
        Emit(0xff);
        mp3_stop();
        mp3_play("bg");
        page1_back()
    });
    $$("#page1 .btn1").click(function(){
        Emit(0x04);
        page_pot(1, 1);
    });
    $$("#page1 .btn2").click(function(){
        Emit(0x00);
        page_pot(1, 2);
    });
    $$("#page1 .btn3").click(function(){
        Emit(0x00);
        page_pot(1, 3);
    });
    $$("#page1 .btn4").click(function(){
        Emit(0x40);
        page_pot(1, 4);
    });

    $$("#page2 .back").click(function(){
        Emit(0xff);
        mp3_stop();
        mp3_play("bg");
        page2_back()
    });
    $$("#page2 .btn1").click(function(){
        Emit(0x01);
        page_pot(2, 1);
    });
    $$("#page2 .btn2").click(function(){
        Emit(0x18);
        page_pot(2, 2);
    });
    $$("#page2 .btn3").click(function(){
        Emit(0x10);
        page_pot(2, 3);
    });
    $$("#page2 .btn4").click(function(){
        Emit(0x00);
        page_pot(2, 4);
    });

    $$("#page3 .back").click(function(){
        Emit(0xff);
        mp3_stop();
        mp3_play("bg");
        page3_back()
    });
    $$("#page3 .btn1").click(function(){
        Emit(0x02);
        page_pot(3, 1);
    });
    $$("#page3 .btn2").click(function(){
        Emit(0x00);
        page_pot(3, 2);
    });
    $$("#page3 .btn3").click(function(){
        Emit(0x00);
        page_pot(3, 3);
    });
    $$("#page3 .btn4").click(function(){
        Emit(0x20);
        page_pot(3, 4);
    });

};


function Page1(){

    map_hide();

    $$("#page1 .pot").css("opacity", 1);
    var p = $$("#page1");
    p.css({"transform":"scale(0.32)", top:-275, left:-850, opacity:0.5}).show();

    p.velocity({scale: [1, 0.32], top:0, left:0, opacity:1}, {easing:"easeInOutSine", duration: 1000 });

    $$("#pageBG").show().velocity({opacity: 1}, { duration: 500 });
    p.find(".tit").css({left:-600}).show().velocity({left:[219, -600]}, { delay:500, easing:[200, 20], duration: 1000 });
    p.find(".w").css({left:-1600}).show().velocity({left:[219, -600]}, { delay:700, easing:[200, 20], duration: 1000 });

}

function Page2(){

    map_hide();

    $$("#page2 .pot").css("opacity", 1);
    var p = $$("#page2");
    p.css({"transform":"scale(0.71)", top:35, left:-400, opacity:0.5}).show();
    p.velocity({scale: [1, 0.71], top:0, left:0, opacity:1}, {easing:"easeInOutSine", duration: 1000 });

    $$("#pageBG").show().velocity({opacity: 1}, { duration: 500 });
    p.find(".tit").css({left:-600}).show().velocity({left:[219, -600]}, { delay:500, easing:[200, 20], duration: 1000 });
    p.find(".w").css({left:-1600}).show().velocity({left:[219, -600]}, { delay:700, easing:[200, 20], duration: 1000 });
}

function Page3(){

    map_hide();

    $$("#page3 .pot").css("opacity", 1);
    var p = $$("#page3");
    p.css({"transform":"scale(0.89)", top:-50, left:220, opacity:0.5}).show();
    p.velocity({scale: [1, 0.89], top:0, left:0, opacity:1}, {easing:"easeInOutSine", duration: 700 });

    $$("#pageBG").show().velocity({opacity: 1}, { duration: 500 });
    p.find(".tit").css({left:-600}).show().velocity({left:[219, -600]}, { delay:500, easing:[200, 20], duration: 1000 });
    p.find(".w").css({left:-1600}).show().velocity({left:[219, -600]}, { delay:700, easing:[200, 20], duration: 1000 });
}

function map_hide(){
    $$("._menu").velocity({opacity: 0}, { duration: 300 });
    $$(".map").velocity({opacity: 0.1}, { duration: 500 });

    $$("#pot").velocity("stop").velocity({opacity: 0.1}, { duration: 300 });
    $$("#twinkle").velocity({opacity: 0}, { duration: 300 });

    $$("#btn_back").css({opacity:0}).show().velocity({opacity: [1, 0]}, { delay:500, duration: 800 });
}
function map_back(d, t){
    if(!d) d = 500;
    if(!t)  t = 800;
    $$("._menu").velocity("stop").velocity({opacity: 1}, { delay:d, duration: t });
    $$(".map").velocity("stop").velocity({opacity: 1}, { delay:d, duration: t });

    $$("#pot").css({top:0}).velocity("stop").velocity({opacity: 1}, { delay:d, duration: t }).velocity({top:  -5}, {  duration: 500, loop: true });;
    $$("#twinkle").velocity("stop").velocity({opacity: 1}, { delay:d, duration: t });

    $$("#btn_back").velocity({opacity: [0, 1]}, { duration: 800, display:"none" });
}

function page1_back(){
    map_back();
    $$("#pageBG").velocity("stop").velocity({opacity: 0}, { duration: 1100 , display:"none"});

    var p = $$("#page1");
    p.find(".tit").velocity("stop").velocity({left:-600}, { delay:200, duration: 500, display:"none" });
    p.find(".w").velocity("stop").velocity({left:-1600}, { duration: 500, display:"none" });

    p.velocity("stop").velocity({scale: 0.35, top:-260, left:-865, opacity:0.2}, {easing:"easeInOutSine", duration: 1000, display:"none" });
}
function page2_back(){
    map_back();
    $$("#pageBG").velocity("stop").velocity({opacity: 0}, { duration: 1100 , display:"none"});

    var p = $$("#page2");
    p.find(".tit").velocity("stop").velocity({left:-600}, { delay:200, duration: 500, display:"none" });
    p.find(".w").velocity("stop").velocity({left:-1600}, { duration: 500, display:"none" });

    p.velocity("stop").velocity({scale: 0.71, top:35, left:-400, opacity:0.2}, {easing:"easeInOutSine", duration: 1000, display:"none" });
}
function page3_back(){
    map_back(200, 500);
    $$("#pageBG").velocity("stop").velocity({opacity: 0}, { duration: 700 , display:"none"});

    var p = $$("#page3");
    p.find(".tit").velocity("stop").velocity({left:-600}, { delay:200, duration: 500, display:"none" });
    p.find(".w").velocity("stop").velocity({left:-1600}, { duration: 500, display:"none" });

    p.velocity("stop").velocity({scale: 0.89, top:-50, left:200, opacity:0.2}, {easing:"easeInOutSine", duration: 500, display:"none" });
}

function page_pot(id, i){

    mp3_stop();
    mp3_play("click");

    if(i!=1) $$("#page"+id+" .pot1").velocity({opacity: 0}, { duration: 500 });
    else $$("#page"+id+" .pot1").velocity({opacity: 1}, { duration: 500 });

    if(i!=2) $$("#page"+id+" .pot2").velocity({opacity: 0}, { duration: 500 });
    else $$("#page"+id+" .pot2").velocity({opacity: 1}, { duration: 500 });

    if(i!=3) $$("#page"+id+" .pot3").velocity({opacity: 0}, { duration: 500 });
    else $$("#page"+id+" .pot3").velocity({opacity: 1}, { duration: 500 });

    if(i!=4) $$("#page"+id+" .pot4").velocity({opacity: 0}, { duration: 500 });
    else $$("#page"+id+" .pot4").velocity({opacity: 1}, { duration: 500 });
}