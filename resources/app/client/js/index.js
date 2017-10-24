Room.Loader = {};
Room.Loader.ppt = function(){
    var Start = "Index";
    cc.ppt(["Loader", Start] , function(after , callback){
        cc.m["Loader"].velocity({ opacity: 0 }, 1000, function () {
            cc.m["Loader"].hide()
        });

        cc.m[Start].show();
        cc.m[Start].velocity({ opacity: [1,0] }, 1000);
        mp3_play("bg");

        $$("#nowTime").html(getNowFormatDate());
        setInterval(function(){
            $$("#nowTime").html(getNowFormatDate());
        },1000);
    })
};

Room.Index = {};
Room.Index.dom = function(){
    $$("#btn1").click(function(){
        if(Dom.index_state==1) return;
        Dom.index_state = 1;

        Emit(0x01+0x02+0x04);
        showPot(1);
    });
    $$("#btn2").click(function(){
        if(Dom.index_state==2) return;
        Dom.index_state = 2;

        Emit(0x18);
        showPot(2);
    });
    $$("#btn3").click(function(){
        if(Dom.index_state==3) return;
        Dom.index_state = 3;

        Emit(0x10);
        showPot(3);
    });
    $$("#btn4").click(function(){
        if(Dom.index_state==4) return;
        Dom.index_state = 4;

        Emit(0x20+0x40);
        showPot(4);
    });

    $$("#btn_back").click(function(){
        $$("#btn_back").velocity({opacity: 0}, { duration: 600 });
        Emit(0xFF);
        map_start();
    });

    // $$("#map_start").click(function(){
    //     Emit(0xFF);
    //     map_start();
    // });

};
Room.Index.ppt = function(id){
    cc.ppt([cc.id, id] , function(after , callback){
        cc.m[cc.old].hide();
        cc.m[id].show();
    })
};
Room.Index.coming = function(){

    Dom.index_state = 0;

    Emit(0xFF);

    $$("._btn .b1").velocity({rotateZ: "360deg"}, { easing:"linear", duration: 1300, loop: true });
    $$("._btn .b2").velocity({rotateZ: "350deg"}, { duration: 1800, loop: true });
    $$("._btn .b3").velocity({rotateZ: "-360deg"}, { easing:"linear",  duration: 2000, loop: true });

    $$("#pot").css({top:0}).velocity({top: [-5, 0]}, {  duration: 500, loop: true });

    $$("._menu .b1").velocity({rotateZ: "360deg"}, { easing:"linear", duration: 2500, loop: true });
    $$("._menu .b2").velocity({rotateZ: "-360deg"}, { easing:"linear", duration: 2500, loop: true });

    Dom.twinkle_stop = false;
    twinkle();

};
Room.Index.go_before = function(next){
    next();
    // Dom.Start.btn.velocity("stop").velocity({top: "+=30px", opacity:0, "scale":1.3}, 500);
};

//map_start
function map_start(){
    if(Dom.index_state===0) return;
    Dom.index_state = 0;

    mp3_stop();
    mp3_play("cls");

    $$("#pot img").velocity({opacity: 1}, { duration: 600 });
    $$("#pot").css({top:0}).velocity({top:  [-5, 0]}, {  duration: 500, loop: true });
    $$("._menu").show().velocity({opacity: 1}, { duration: 600 });
    $$("#twinkle").velocity({opacity: 1}, { duration: 600 });

    hide_pic();
}

//map_stop
function map_stop(){
    $$("#pot").velocity("stop").velocity({top: 0}, { duration: 300 });
    $$("._menu").velocity({opacity: 0}, { duration: 600 , display:"none"});
    $$("#twinkle").velocity({opacity: 0}, { duration: 600 });

    //$$("._pic").velocity({opacity: 0}, { duration: 600 , display:"none"});
}
//hide_pic
function hide_pic(m){

    if(m!=2) $$(".c2").velocity("stop").velocity({opacity: 0, scale:0, left:670, top:330}, { duration: 500 });

    if(m!=3) $$(".c3").velocity("stop").velocity({opacity: 0, scale:0, left:670, top:330}, { duration: 500 });

    if(m!=4) {
        $$("#c4_1").velocity("stop").velocity({opacity: 0, scale:0, left:114, top:180}, { duration: 500 });
        $$("#c4_2").velocity("stop").velocity({opacity: 0, scale:0, left:1441, top:280}, { duration: 500 });
    }

}

//显示地图标点
function showPot(m){
    mp3_stop();
    mp3_play("click");

    $$("#btn_back").css({"opacity":0}).show().velocity({opacity: 1}, { duration: 800 });

    if(m!=1) $$("#pot .m1").velocity({opacity: 0}, { duration: 600 });
    else  showPot1();

    if(m!=2) $$("#pot .m2").velocity({opacity: 0}, { duration: 600 });
    else showPot2();

    if(m!=3) $$("#pot .m3").velocity({opacity: 0}, { duration: 600 });
    else showPot3();

    if(m!=4) $$("#pot .m4").velocity({opacity: 0}, { duration: 600 });
    else showPot4();

}
function showPot1(){
    map_stop();
    hide_pic(1);
    $$("#pot .m1").velocity({opacity: 1}, { duration: 600 });
}
function showPot2(){

    mp3_play("come");

    map_stop();
    hide_pic(2);
    $$("#pot .m2").velocity({opacity: 1}, { duration: 600 });
    showPic("#c2_1", 366, 182, 670, 330, 300);
    showPic("#c2_2", 568, 182, 670, 330, 400);
    showPic("#c2_3", 770, 182, 670, 330, 500);
    showPic("#c2_4", 972, 182, 670, 330, 600);
}
function showPot3(){

    mp3_play("come");

    map_stop();
    hide_pic(3);
    $$("#pot .m3").velocity({opacity: 1}, { duration: 600 });
    // showPic("#c3_1", 366, 182, 670, 330, 300);
    showPic("#c3_2", 464, 182, 670, 330, 300);
    showPic("#c3_3", 666, 182, 670, 330, 400);
    showPic("#c3_4", 868, 182, 670, 330, 500);
}
function showPot4(){

    mp3_play("come");

    map_stop();
    hide_pic(4);
    $$("#pot .m4").velocity({opacity: 1}, { duration: 600 });
    showPic("#c4_1", 264, 179, 114, 180);
    showPic("#c4_2", 1300, 279, 1441, 280);
}
function showPic(id, x, y, cx, cy, r){
    //var r = parseInt(Math.random()*500);
    //var r = 500;
    $$(id).css({left:cx, top:cy, opacity:0});
    $$(id).show().velocity({ opacity:[1,0], scale:[1,0], left:[x, cx], top:[y, cy]}, { delay:r, duration: 800 });
}

// 闪烁
function twinkle(){
    twinkle_t1();
    // twinkle_t2();
    twinkle_t3();
    twinkle_t4();
}

function twinkle_t1(){
    if(Dom.twinkle_stop) {
        $$("#twinkle .t1").velocity("stop");
        return;
    }
    var r = parseInt(Math.random()*6000);
    $$("#twinkle .t1").velocity({opacity: [1, 0]}, { delay:r , duration: 500, complete:function(){
        $$("#twinkle .t1").velocity({ opacity: 0}, { duration: 500 , complete:function(){
            twinkle_t1();
        }});
    } });
}
function twinkle_t2(){
    if(Dom.twinkle_stop) {
        $$("#twinkle .t2").velocity("stop");
        return;
    }
    var r = parseInt(Math.random()*6000);
    $$("#twinkle .t2").velocity({opacity: [1, 0]}, { delay:r , duration: 500, complete:function(){
        $$("#twinkle .t2").velocity({ opacity: 0}, { duration: 500 , complete:function(){
            twinkle_t2();
        }});
    } });
}
function twinkle_t3(){
    if(Dom.twinkle_stop) {
        $$("#twinkle .t3").velocity("stop");
        return;
    }
    var r = parseInt(Math.random()*6000);
    $$("#twinkle .t3").velocity({opacity: [1, 0]}, { delay:r , duration: 500, complete:function(){
        $$("#twinkle .t3").velocity({ opacity: 0}, { duration: 500 , complete:function(){
            twinkle_t3();
        }});
    } });
}
function twinkle_t4(){
    if(Dom.twinkle_stop) {
        $$("#twinkle .t4").velocity("stop");
        return;
    }
    var r = parseInt(Math.random()*6000);
    $$("#twinkle .t4").velocity({opacity: [1, 0]}, { delay:r , duration: 500, complete:function(){
        $$("#twinkle .t4").velocity({ opacity: 0}, { duration: 500 , complete:function(){
            twinkle_t4();
        }});
    } });
}


function Emit(val){
    if(IO.emit){
        console.log(val.toString(16));
        IO.emit({type:"emit", key:"io", val:"0x"+val.toString(16), to:"comNear", id:"ZX", room:"room"});
    }

}

