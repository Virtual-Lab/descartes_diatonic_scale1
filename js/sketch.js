var x0 = 255, y0 = 240, r0 = 190, dr = 20;
var a = [1, 10./9, 9./8, 5./4, 4./3, 3./2, 5./3, 15./8, 2];
var b = [1, 10./9, 5./4, 4./3, 3./2, 5./3, 16./9, 15./8, 2];
var s = a.length - 1;
var phi00 = 2.13, phi0 = phi00; //  = 2.5;
var TWO_PI = 2*Math.PI;
var delta = 1;
var magnify = 1;
var f0 = 360;

var diagrams = [
  "images/1628_beeckman__diatonicScale_1__MS_Middelburg_171_r.jpg", 
  "images/1635_descartes__diatonicScale_1__MS_Leiden_ublwhs_hug_29_a_f047v.jpg", 
  "images/1640_descartes__diatonicScale_1__MS_Groningen.jpg", 
  "images/1650_descartes__diatonicScale_1__32_BnF.jpg", 
  "images/1653_descartes__diatonicScale_1__en_032.jpg", 
  "images/1656_descartes__diatonicScale_1__brockt_1978_36.jpg", 
  "images/1668_descartes__diatonicScale_1__buzon_2012_100_A.jpg", 
  "images/1683_descartes__diatonicScale_1__28_pdf_174.jpg"
];
var diagramSource = [
  "Descartes 1628, MS_Middelburg", 
  "Descartes 1635, MS_Leiden", 
  "Descartes 1640, MS_Groningen", 
  "Descartes 1650, Utrecht", 
  "Descartes 1653, London", 
  "Descartes 1656, Amsterdam", 
  "Descartes 1668, Paris", 
  "Descartes 1683, Amsterdam"
];

var imgs = new Array(diagrams.length);

var tone;

var n_diag = 0; // number of current diagram

var selection = document.getElementById("selection");
var templateShow = document.getElementById("templateShow");
var templateHide = document.getElementById("templateHide");
var templateMiddle = document.getElementById("templateMiddle");
var templateLeft = document.getElementById("templateLeft");
var templateUp = document.getElementById("templateUp");
var templateRight = document.getElementById("templateRight");
var templateDown = document.getElementById("templateDown");
var templateTurnLeft = document.getElementById("templateTurnLeft");
var templateTurnRight = document.getElementById("templateTurnRight");
var templateEnlarge = document.getElementById("templateEnlarge");
var templateDecrease = document.getElementById("templateDecrease");
var templateMoveFast = document.getElementById("templateMoveFast");
var templateMoveSlow = document.getElementById("templateMoveSlow");
var soundFreq = document.getElementById("soundFreq");
var soundFreqSet = document.getElementById("soundFreqSet");
var soundOn = document.getElementById("soundOn");
var soundOff = document.getElementById("soundOff");

var templateVisible = false;
var sDot = new Array(8);

function templateSettings () {

  templateShow.onclick = function() {
    templateVisible = true; drawTemplate(x0, y0, r0)}
  templateHide.onclick = function() {
    templateVisible = false; drawTemplate(x0, y0, r0)};
  templateMiddle.onclick = function() {
    templateVisible = true;
    phi0 = phi00;
    drawTemplate(x0, y0, r0);
  };
  templateLeft.onclick = function() {
    x0 = x0 - delta; drawTemplate(x0, y0, r0);
  };
  templateUp.onclick = function() {
    y0 = y0 - delta; drawTemplate(x0, y0, r0);
  };
  templateRight.onclick = function() {
    x0 = x0 + delta; drawTemplate(x0, y0, r0);
  };
  templateDown.onclick = function() {
    y0 = y0 + delta; drawTemplate(x0, y0, r0);
  };
  templateTurnLeft.onclick = function() {
    phi0 -= delta * .005;
    drawTemplate(x0, y0, r0);
  };
  templateTurnRight.onclick = function() {
    phi0 += delta * .005;
    drawTemplate(x0, y0, r0);
  };
  templateEnlarge.onclick = function() {
    r0 += delta; drawTemplate(x0, y0, r0);
  };
  templateDecrease.onclick = function() {
    r0 -= delta; drawTemplate(x0, y0, r0);
  };
  templateMoveFast.onclick = function() {
    delta = 10
  };
  templateMoveSlow.onclick = function() {
    delta = 1
  };

}

function soundSetting () {

  selection.addEventListener("submit", function(event) {
     event.preventDefault()}, false);

  soundFreq.addEventListener("input", function(event) {
    event.preventDefault();
    f0 = event.target.value;
    soundFreqSet.value = f0;
    console.log("BaseFreq: ", f0)
  }, false);

  soundFreqSet.addEventListener("input", function(event) {
    event.preventDefault();
    value = event.target.value;
    f0 = value;
    soundFreq.value = value;
  }, false);

  // soundFreqSet.addEventListener("keydown", function(e) {
  //   element = e.target;
  // if(e.keyCode == 13) { 
  //   console.log("ENter and submit");
  //   event.preventDefault();
  //   // enter key was pressed
  //   // run own code
  //   return false; // prevent execution of rest of the script + event propagation / event bubbling + prevent default behaviour
  //   }
  // }, false);

  soundOn.onclick = function () { if (!tone.active) tone.play(f0)};
  soundOff.onclick = function () { tone.stop()}
}

function drawTemplate(x0, y0, r0) {

      background(255);
      image(imgs[n_diag], 10, 20);
      noStroke(); fill(0);
      text(diagramSource[n_diag], 10, 15);
      stroke(0,0,255); noFill();
      if (templateVisible) drawSyntonicCircle(x0, y0, r0, phi0, a); 
}


function calcAngle(x0, y0, x, y) {
  return Math.atan2(y-y0, x-x0);
}

function calcFreq(phi, phi0, f0) {
  var angle = (phi - phi0 -(Math.PI/2) + 2*TWO_PI)% TWO_PI;
  var freq = f0*Math.pow(2, angle/TWO_PI);
  return freq;
}

function drawSyntonicCircle(x0, y0, r, phi0, scale) {
  var phi;
  var s = scale.length -1;
  ellipse(x0, y0, r, r);
  for (var k = 0; k < s; k++) {
    phi = TWO_PI*Math.log(scale[k])/Math.log(2) + phi0; // 3.965;
    line(x0, y0, x0 + r*Math.sin(phi), y0 - r*Math.cos(phi));
  }
};

function preload() {
  n_diag = 0;

  for (var k=0; k< diagrams.length; k++) {
    imgs[k] = loadImage(diagrams[k]);
    console.log("path = ", diagrams[k]);
  };
  for (var k=0; k< diagrams.length; k++) {

    console.log("image =", imgs[k]); 
  };
}

function setup() {

  var layer = createCanvas(600, 600);
  layer.parent("diagram");
  console.log("loaded canvas");

  Synthesizer.init(f0);

  tone = new Sound();
  hi00 = 2.13, phi0 = phi00;

  background(255);
  //imgs = new Array(diagrams.length);
  console.log("image =", imgs[n_diag]);

  image(imgs[n_diag], 10, 20);
  text(diagramSource[n_diag], 10, 15);
  ellipseMode(RADIUS);
  noFill();
  stroke(0, 0, 255);
  templateSettings();
  soundSetting();
  //tone.play(200);
}


function draw() {
  var phi = calcAngle(mouseX, mouseY, x0, y0);
  var freq = calcFreq(phi, phi0, f0);
  fill(0);
  noStroke();
  rect(195, 0, 150, 20);
  fill(255);
  text("freq: " + round(10*freq)/10., 200, 15);
  // if (dist(mouseX, mouseY, x0, y0) > 100) {
  //   if (!tone.active) tone.play(freq);
  // } else {
  //   if (tone.active) tone.stop(); 
  // }
  if (tone.active) tone.setFrequency(freq);
  noFill();
}

function mousePressed() {
  // if (mouseButton == LEFT) {
  //   background(255);
  //   image(imgs[n_diag], 10, 20);
  //   noStroke(); fill(0);
  //   text(diagramSource[n_diag], 10, 15);
  //   stroke(0,0,255); noFill();
  //   x0 = mouseX;
  //   y0 = mouseY;
  //   phi0 = phi00;
  //   drawSyntonicCircle(x0, y0, r0, phi0, a);
  // } else {
  //   // save("syntonicDiatonicScale_leiden_2.jpg"); 
  //   // save("syntonicDiatonicScale_middelburg_2.jpg");
  // }
}

document.onkeydown = keyhandle1;
document.onkeyup = keyhandle2;

function keyhandle1(e) {

  var key = (window.event) ? event.keyCode : e.keyCode;
  var phi = calcAngle(mouseX, mouseY, x0, y0);
  var freq = calcFreq(phi, phi0, 360);

  if (key === 16) delta = 10;
  if (key === 88) delta = 1;

  if (key === 65 || key === 37) x0 = x0 - delta;

  if (key === 87 || key === 38) y0 = y0 - delta;

  if (key === 83 || key === 39) x0 = x0 + delta;

  if (key === 89 || key === 40) y0 = y0 + delta;

  if (key === 57) r0 = r0 + delta;

  if (key === 56) r0 = r0 - delta;
   

  if (key === 65 || key === 37 || key === 87 || key === 38 || key === 83 || key === 39 || key === 89 || key === 40 
    || key === 56 || key === 57) {
    drawTemplate(x0, y0, r0);
  };

  if (key === 17) {
    templateVisible = true;
    x0 = mouseX;
    y0 = mouseY;
    phi0 = phi00;
    drawTemplate(x0, y0, r0);
  };

  if (key === 49) {
    n_diag = (n_diag + 1)% diagrams.length;
    phi0 = phi00;
    drawTemplate(x0, y0, r0);
  };

  if (key === 70) {
    templateVisible = true;
    drawTemplate(x0, y0, r0);
  };

  if (key === 70) {
    templateVisible = false;
    drawTemplate(x0, y0, r0);
  };

  if (key === 50) {
    n_diag = (diagrams.length + n_diag - 1)% diagrams.length;
    phi0 = phi00;
    drawTemplate(x0, y0, r0);
  };

  if (key === 48 || key === 27) tone.stop();
  if (key === 13 || key === 20) {
    if (!tone.active) tone.play(freq);
  };

  if (key === 69) {
    phi0 += delta * .005;
    drawTemplate(x0, y0, r0);

  } else if (key === 81) {
    phi0 -= delta * .005;
    drawTemplate(x0, y0, r0);
  }
}

function keyhandle2(e) {

  var key = (window.event) ? event.keyCode : e.keyCode;

  if (key === 16) delta = 1;
}

