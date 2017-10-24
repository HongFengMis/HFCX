var libs = {};
var cc = {};
var Room = {};
var Ticker = {};
var Dom = {};
var Base = {};
Dom._unable = $("#_unable");
cc.id = "Loader";

libs.create = function(){
    cc.m = {};
    $("section.cc").each(function(){
        var dom = $(this);
        cc.m[dom.attr("id")] = dom;
    });
};

libs.iniDom = function(){
    for(var id in Room) {
        if(Room[id].dom) Room[id].dom();
    }
};

libs.setTicker = function(fps){
    createjs.Ticker.setFPS(fps);
    createjs.Ticker.addEventListener("tick", function(){
        $.each(Ticker, function(i, fn) { fn() })
    })
};
cc.tap = function(e){
    e.preventDefault();
    e.stopPropagation();
};
cc.ticker = function(id, fn){
    Ticker[id] = function(){
        if(cc.m[id].is(':visible')) fn();
        else delete Ticker[id];
    }
};
cc.clsTicker = function(id){
    delete Ticker[id];
};

cc.ppt = function(id, transition, callback){
    //id:["go","come"]
    //transition(go_before, going, go_after, come_before, coming, come_after, callback):过渡动画 //传入Rooms[id[0]].go_before等
    //callback，完成后回调，或直接回调

    //容错
    if(!id[0] || !id[1]) {
        console.log("id设置错误", pa);
        return
    }

    //判断是否自己重复过场
    if(id[0]==id[1]) {
        if(callback) callback();
        return
    }


    cc.old = id[0];
    cc.id = id[1];

    //回调
    var after = {};
    if(!Room[id[0]]) Room[id[0]] = {};
    if(!Room[id[1]]) Room[id[1]] = {};

    if(Room[id[0]].go_after) after.go = Room[id[0]].go_after;
    if(Room[id[1]].come_after) after.come = Room[id[1]].come_after;

    if(Room[id[0]].go_before) {
        Room[id[0]].go_before(function(){
            if(Room[id[1]].come_before) {
                Room[id[1]].come_before(function(){
                    if(Room[id[0]].going) Room[id[0]].going();
                    if(Room[id[1]].coming) Room[id[1]].coming();
                    transition(after, callback)
                })
            }else{
                if(Room[id[0]].going) Room[id[0]].going();
                if(Room[id[1]].coming) Room[id[1]].coming();
                transition(after, callback)
            }
        })
    }else{
        if(Room[id[1]].come_before) {
            Room[id[1]].come_before(function(){
                if(Room[id[0]].going) Room[id[0]].going();
                if(Room[id[1]].coming) Room[id[1]].coming();
                transition(after, callback)
            })
        }else{
            if(Room[id[0]].going) Room[id[0]].going();
            if(Room[id[1]].coming) Room[id[1]].coming();
            transition(after, callback)
        }
    }
};

var $$ = function(key){
    if(Dom[key]) return Dom[key];
    Dom[key] = $(key);
    return Dom[key];
};

var Loads = {};
Loads.list = [];
Loads.loading = function(manifest){
    Loads.que = new createjs.LoadQueue();
    Loads.que.installPlugin(createjs.Sound);

    if(Loads.progress) Loads.que.on("progress", Loads.progress, this);
    if(Loads.complete) Loads.que.on("complete", Loads.complete, this);
    if(!manifest) manifest = Loads.list;
    Loads.que.loadManifest(manifest)
};
Loads.loads = function(id, src, fi, tp){
    //{id: "player1", src:"uploads/stage1/player1.png"}
    //{id:"sound", src:"http://path/to/sound.mp3"}
    Loads.list.push({id:id, src:(src?src:"")+fi})
};
Loads.get = function(id){
    return Loads.que.getResult(id)
};
// Loads.progress(e) e.loaded
// Loads.complete() Loads.que.getResult("image")


//其他公共函数
function in_array(stringToSearch, arrayToSearch) {
    for (var s = 0; s < arrayToSearch.length; s++) {
        var thisEntry = arrayToSearch[s].toString();
        if (thisEntry == stringToSearch) {
            return true;
        }
    }
    return false;
}

function getPara(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}


function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "/";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }

    var hours = date.getHours();
    if (hours >= 1 && hours <= 9) {
        hours = "0" + hours;
    }

    var ms = date.getMinutes();
    if (ms <= 9) {
        ms = "0" + ms;
    }

    var second = date.getSeconds();
    if (second <= 9) {
        second = "0" + second;
    }
    // var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    //     + " " + date.getHours() + seperator2 + date.getMinutes()
    //     + seperator2 + date.getSeconds();

    var currentdate = strDate + seperator1 + month + seperator1 + date.getFullYear() + "&nbsp;&nbsp;&nbsp;" + hours + seperator2 + ms + seperator2 + second;

    return currentdate;
}


libs.server = function(fn){

    // FS = require('fs');
    // http = require('http');

    // if(!conf) return;
    // if(!conf.server) return;
    // var url = conf.server+"/uploads/data.php";

    // $.getJSON("../../uploads/base.json", function(data) {
    //
    //     console.log(url);
    //     $.ajax({
    //         type:'get',
    //         async:false,
    //         url:url,
    //         cache:false,
    //         dataType:'jsonp',//传递给请求处理程序，用以获得jsonp回调函数名的参数名(默认为:callback)
    //         jsonp:'jsoncallback', //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
    //         jsonpCallback:"success_jsonpCallback", //成功获取跨域服务器上的json数据后,会动态执行这个callback函数
    //         success: function(json){
    //             console.log("数据服务器连接成功！获取数据：" , json);
    //             //是否更新判断
    //             Server.sync(json, data, fn);
    //         },
    //         error:function(){
    //             console.log("数据服务器连接失败！", url);
    //             Base = data;
    //             console.log("Base准备完毕" , Base);
    //             fn();
    //         }
    //     });
    // });




};