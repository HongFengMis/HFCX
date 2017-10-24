Room.Box = {};
Room.Box.dom = function(){

    $$("._pic").each(function(){

        $(this).click(function(){
            mp3_stop();
            mp3_play("come");
            var _this = $(this);
            var id = _this.attr("id");
            $$("#box_"+id).css({opacity:0}).show().velocity({ opacity: [1,0] }, 1000);
            $$("#box_"+id).find(".box").css({opacity:0}).show().velocity({ opacity: [1,0], scale:[1,0] }, 800);
        })
    });

    $$("._box .back").each(function(){

        $(this).click(function(){
            mp3_stop();
            mp3_play("cls");
            var _this = $(this);
            var id = _this.data("id");
            $$("#"+id).velocity({ opacity: 0 }, {  duration: 500, display:"none"});
            $$("#"+id).find(".box").velocity({ opacity: 0, scale:0 }, {  duration: 500, display:"none" });
        })
    });

};