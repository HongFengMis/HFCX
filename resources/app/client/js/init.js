function loader(){
    libs.create();
    libs.setTicker(25);

    libs.iniDom();


    $.getJSON("../../uploads/base.json", function(data) {
        Base = data;
        console.log("Base:",Base);

        view();

        setTimeout(Room.Loader.ppt, 500);
    });

}

function view(){

    $("#page1 .w").html(Base.page1);
    $("#page2 .w").html(Base.page2);
    $("#page3 .w").html(Base.page3);

    view_box("2_1");
    view_box("2_2");
    view_box("2_3");
    view_box("2_4");

    view_box("3_1");
    view_box("3_2");
    view_box("3_3");
    view_box("3_4");

    view_box("4_1");
    view_box("4_2");
}

function view_box(id){
    $("#box_c"+id+" .tit").html(Base["box_c"+id].tit);
    $("#box_c"+id+" .info").html(Base["box_c"+id].info);
    $("#box_c"+id+" .com").html(Base["box_c"+id].com);
}