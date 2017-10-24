createjs.Sound.registerSound("../../assets/mp3/bg.mp3", "mp3_bg");
createjs.Sound.registerSound("../../assets/mp3/click.wav", "mp3_click2");
createjs.Sound.registerSound("../../assets/mp3/click2.mp3", "mp3_cls");
createjs.Sound.registerSound("../../assets/mp3/cls.mp3", "mp3_click");
createjs.Sound.registerSound("../../assets/mp3/come.wav", "mp3_come");

function mp3_play(key){
    createjs.Sound.play("mp3_"+key);
}
function mp3_stop(key){
    if(!key) createjs.Sound.stop();
    else createjs.Sound.stop("mp3_"+key);
}