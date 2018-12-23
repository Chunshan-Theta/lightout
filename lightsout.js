var n; // = 3;
var box; // = new Array(n);
var width;  // button width
var height; // button height
var time;
var count;
var measureTime;
var jsTimer;
var lightColor = "light.png";
var darkColor = "dark.png";
var level1 = "level1.jpg";
var level2 = "level2.jpg";
var level3 = "level3.jpg";

function resizeBoard(p) {
    var board = document.getElementById("square");
    board.innerHTML = "";
    n = p;
    if (n < 6) {
        width = height = 98;
    } else {
        width = height = 98;
    }
    prepareTable();
}

function resizeGame(a) {
    var gameboard = document.getElementById("game");
    s=a;
        if (s == 3) {
            gameboard.className = 'level1';
        } else if (s == 4) {
            gameboard.className = 'level2';
        } else if (s == 5) {
            gameboard.className = 'level3';
        }
}

function checkResult(ComputerInitGame=false) {

    //var val = box[0][0];
    var valWin = 1;
    var fail = 0;
    var failCount=0;
    for (x = 0; x < n; x = x + 1) {
        for (y = 0; y < n; y = y + 1) {
            if (box[x][y] != valWin) {
                fail = 1;
                failCount+=1;
            }
        }
    }


    if(!ComputerInitGame){
      //console.log(ComputerInitGame);
      if (failCount ==0) {
        applause();
      }
    }else{
      //開局已完成，重置局面
      //console.log(ComputerInitGame);
      if (fail == 0) {
        reStart();
      }
    }


}
function nextMove(i, j,ComputerInitGame=false) {
    if (measureTime == 0) {
        return false;
    }
    changeColor(i, j);
    if (j - 1 >= 0) changeColor(i, j - 1);
    if (j + 1 < n) changeColor(i, j + 1);
    if (i - 1 >= 0) changeColor(i - 1, j);
    if (i + 1 < n) changeColor(i + 1, j);
    if(!ComputerInitGame){
      countMovements();
      checkResult();
    }else{
      checkResult(ComputerInitGame=true);
    }

}
function changeColor(i, j) {
    var img = document.getElementById("img" + i + j);
    //console.log(img);
    //console.log("img" + i + j);
    if (box[i][j] == "1") {
        img.setAttribute("src", lightColor);
        box[i][j] = 0;
    } else {
        img.setAttribute("src", darkColor);
        box[i][j] = 1;
    }
}
function prepareTable() {
    box = new Array(n);
    for (i = 0; i < n; i = i + 1) {
        box[i] = new Array(n);
    }

    for (i = 0; i < n; i = i + 1) {
        for (j = 0; j < n; j = j + 1) {
            box[i][j] = 0;
        }
    }

    var square = document.getElementById("square");
    for (i = 0; i < n; i = i + 1) {
        for (j = 0; j < n; j = j + 1) {
            var img = document.createElement("img");
            img.setAttribute("id", "img" + i + j);
            img.setAttribute("class", "lightDiv");
            img.setAttribute("data-x", i);
            img.setAttribute("data-y", j);
            if (box[i][j] == 1) {
                img.setAttribute("src", darkColor);
            } else {
                img.setAttribute("src", lightColor);
            }
            img.setAttribute("width", width);
            img.setAttribute("height", height);
            img.setAttribute("onClick", "javascript:nextMove(" + i + "," + j + "),clickblock();");
            square.appendChild(img);
        }
        var div = document.createElement("div");
        div.setAttribute("width","100%");
        div.setAttribute("height",".5px");
        div.setAttribute("background-color","#888888");
        div.setAttribute("z-index","10");
        square.appendChild(div);
    }

    //measureTime = 1;
    time = -1;
    window.clearInterval(jsTimer);
    jsTimer = self.setInterval(startTimer, 1000);
    //startTimer();
}
function gameStart() {


    initStart();
}

function reStart() {


    initStart();

}
function initStart(){

  //init movement counter
  count = 0;
  var counter = document.getElementById("counter");
  counter.innerHTML = count;
  count = -1;
  countMovements();


  //init timmer
  measureTime = 0;
  time =0;
  var timer = document.getElementById("timer");
  timer.innerHTML = time;

  //turn on timmer
  measureTime = 1;
  time = -1;
  window.clearInterval(jsTimer);
  jsTimer = self.setInterval(startTimer, 1000);


  p = document.getElementById("size").value;
  resizeBoard(p);
  resizeGame(p);
  randomInit(p,p);

  var divs = document.getElementsByClassName("lightDiv");
  for(var dividx in divs){
    unitDiv = divs[dividx];
    try{
      var i = unitDiv.getAttribute("data-x");
      var j = unitDiv.getAttribute("data-y");
      unitDiv.setAttribute("onClick", "javascript:nextMove(" + i+ "," + j + "),clickblock();");
    }
    catch(e){
      //console.log(e);
    }

  }

}

function startTimer() {
    if (measureTime == 1) {
        time = time + 1;
        var timer = document.getElementById("timer");
        timer.innerHTML = time;
    }
}
function applause() {
    console.log("success!")
    measureTime = 0;
    window.clearInterval(jsTimer);

    var audio = new Audio();

    if (audio.canPlayType("audio/mp3")) {
        audio.src = "crrect_answer3.mp3";
    }
    //else if (audio.canPlayType("audio/wav")) {
    //    audio.src = "crrect_answer3.wav";
    //}
    audio.play();
    var currentLevel = document.getElementById('size').value.toString() ;
    var currentUsedTime = document.getElementById("timer").innerHTML.toString();
    var currentMovement = document.getElementById("counter").innerHTML.toString();
    alert("you win!\nLevel: "+currentLevel+'*'+currentLevel+'\nused time: '+currentUsedTime+'\nused movements: '+currentMovement);
    var tag = currentLevel+'*'+currentLevel;

    var name = prompt("Please enter your name:","name");
    uploadData(name,currentUsedTime,tag);
    if (confirm("replay?")) {
      console.log("You pressed reStart!");
      reStart();
    } else {
      console.log("You not pressed reStart!");
    }
    refreshRankboard();
}
function countMovements() {
    count = count + 1;
    var counter = document.getElementById("counter");
    counter.innerHTML = count;
}

function size(s){
    document.getElementById('size').value = s;
}

function clickblock() {

    var audio2 = new Audio();

    if (audio2.canPlayType("audio/mp3")) {
        audio2.src = "switch1.mp3";
    }
    console.log("click block!");

    audio2.play();

}

function changeLevel(level) {

    //init timmer
    measureTime = 0;
    time =0;
    var timer = document.getElementById("timer");
    timer.innerHTML = time;

    //init movement counter
    count = 0;
    var counter = document.getElementById("counter");
    counter.innerHTML = count;



    resizeBoard(level);
    resizeGame(level);
    size(level);


    //disabled onclick
    var divs = document.getElementsByClassName("lightDiv");
		for(var dividx in divs){
			unitDiv = divs[dividx];
      if(unitDiv.setAttribute){
        unitDiv.setAttribute('onclick', 'alert("Pressing \'New Game !\' button to start the game.");');
      }
		}

}
function randomInit(width,height){
  //Math.floor(Math.random()*2); //回傳0或1
  for(var i=0;i<10;i++){
    x = Math.floor(Math.random()*width);
    y = Math.floor(Math.random()*height);
    //document.getElementById('img'+x+y).click();
    nextMove(x, y,ComputerInitGame=true)
  }

  //init movement counter
  count = 0;
  var counter = document.getElementById("counter");
  counter.innerHTML = count;

}
function uploadData(name,sec,tag){
  $.get("./api.php?act=insert&name="+name+"&sec="+sec+"&tag="+tag, function(result){
    console.log(result);
  });
}
