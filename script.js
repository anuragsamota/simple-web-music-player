var songsNumber = 0;
var y = 0;
var x;
var errorCount=0;
const Songs = document.getElementById("musicInput");
const Audio =document.getElementById("player");
const List = document.getElementById("musicList");
const Seek = document.getElementById("seek");
const ErrorDiv = document.getElementById("div0");

function fileLoad(){
    while (List.hasChildNodes()){
        List.removeChild(List.lastChild);
    };
    x = URL.createObjectURL(Songs.files[0]);
    Audio.src = x;
    y = Songs.files.length - 1;
    Audio.play();
    counter = 1;
    fileList();
    ErrorDiv.remove();
}
function play_pause(){
    if(Audio.src == ""){
        MusicError();
    }
    else{
        if(Audio.paused){
            Audio.play();
        }
        else{
            Audio.pause();
        }
    }
}
function next(){
    if(Audio.src == ""){
        MusicError();
    }
    else{
        if(songsNumber < y){
            songsNumber = songsNumber+1;
        }
        else{
            songsNumber = 0;
        }
        x = URL.createObjectURL(Songs.files[songsNumber]);
        Audio.src = x;
        Audio.play();
        counter = 1;
    }
}
function previous(){
    if(Audio.src == ""){
        MusicError();
    }
    else{
        if(songsNumber>0){
        songsNumber = songsNumber-1;
        }
        else{
            songsNumber = y;
        }
        x = URL.createObjectURL(Songs.files[songsNumber]);
        Audio.src = x;
        Audio.play();
        counter = 1;
    }
}
function fileList(){
    for(i=0;i<=y;i++){
        const ListItem = document.createElement("list");
        const playButton = document.createElement("button");
        const BreakLine = document.createElement("br");
        playButton.id = "playButton"+i;
        playButton.className ="playButton";
        playButton.onclick = playMusic;
        ListItem.id = "ListItem"+i;
        const node0 = document.createTextNode("Play");
        playButton.appendChild(node0);
        var node1 = document.createTextNode(Songs.files[i].name);
        ListItem.appendChild(node1);
        ListItem.appendChild(playButton);
        List.appendChild(ListItem);
        List.appendChild(BreakLine);
    }
}
function playMusic(){
    const SongButtonId = this.id;
    songsNumber =SongButtonId.match(/\d+/)[0] - "";
    x = URL.createObjectURL(Songs.files[songsNumber]);
    Audio.src = x;
    Audio.play();
    counter = 1;
}
function musicseek(){
    if(Audio.src == ""){
        Seek.value = 0;
        MusicError();
    }
    else{
        Audio.currentTime = Seek.value;
    }
}
Audio.onloadedmetadata = function(){
    Seek.max =Audio.duration;
}
Audio.ontimeupdate = update;
function update(){
    Seek.value = Audio.currentTime;
}
function MusicError(){
    if(errorCount == 0){
        var errorNode = document.createTextNode("Please Select Music First");
        var errorLabel = document.createElement("label");
        errorLabel.appendChild(errorNode);
        ErrorDiv.appendChild(errorLabel);
        errorCount=1;
    }
}