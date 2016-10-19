import processing.sound.*;

SinOsc tone = new SinOsc(this);

int x0 = 200, y0 = 200, r0 = 200, dr = 20;
float[] a = {1, 10./9, 9./8, 5./4, 4./3, 3./2, 5./3, 15./8, 2};
float[] b = {1, 10./9, 5./4, 4./3, 3./2, 5./3, 16./9, 15./8, 2};
int s = a.length - 1;
float phi00 = 2.13, phi0 = phi00; //  = 2.5;
String[] diagrams = {
  "1628_beeckman__diatonicScale_1__MS_Middelburg_171_r.jpg", 
  "1635_descartes__diatonicScale_1__MS_Leiden_ublwhs_hug_29_a_f047v.jpg", 
  "1640_descartes__diatonicScale_1__MS_Groningen.jpg", 
  "1650_descartes__diatonicScale_1__32_BnF.jpg", 
  "1653_descartes__diatonicScale_1__en_032.jpg", 
  "1656_descartes__diatonicScale_1__brockt_1978_36.jpg", 
  "1668_descartes__diatonicScale_1__buzon_2012_100_A.jpg", 
  "1683_descartes__diatonicScale_1__28_pdf_174.jpg"
};
String[] diagramSource = {
  "Descartes 1628, MS_Middelburg", 
  "Descartes 1635, MS_Leiden", 
  "Descartes 1640, MS_Groningen", 
  "Descartes 1650, Utrecht", 
  "Descartes 1653, London", 
  "Descartes 1656, Amsterdam", 
  "Descartes 1668, Paris", 
  "Descartes 1683, Amsterdam"
};

int n_diag = 0; // number of current diagram

float calcAngle(int x0, int y0, int x, int y) {
  return atan2(y-y0, x-x0);
}

float calcFreq(float phi, float phi0, float f0) {
  float angle = (phi - phi0 -(PI/2) + 2*TWO_PI)% TWO_PI;
  float freq = f0*pow(2, angle/TWO_PI);
  return freq;
}

void drawSyntonicCircle(int x0, int y0, int r, float phi0, float[] scale) {
  float phi;
  int s = scale.length -1;
  ellipse(x0, y0, r, r);
  for (int k = 0; k < s; k++) {

    phi = TWO_PI*log(scale[k])/log(2) + phi0; // 3.965;
    line(x0, y0, x0 + r*sin(phi), y0 - r*cos(phi));
  }
}

PImage[] imgs;

void setup() {
  size(600, 600);
  background(0);
  imgs = new PImage[diagrams.length];
  for (int k=0; k< diagrams.length; k++) {
    imgs[k] = loadImage(diagrams[k]);
  }
  image(imgs[n_diag], 10, 20);
  text(diagramSource[n_diag], 10, 15);
  ellipseMode(RADIUS);
  noFill();
  stroke(0, 0, 255);
  tone.play(200, 0);
}


void draw() {
  float phi = calcAngle(mouseX, mouseY, x0, y0);
  float freq = calcFreq(phi, phi0, 360);
  fill(0);
  noStroke();
  rect(195, 0, 150, 20);
  stroke(0,0,255);
  fill(255);
  text("freq: " + round(10*freq)/10., 200, 15);
  if (dist(mouseX, mouseY, x0, y0) > 100) {
    tone.amp(0.5);
  } else {
    tone.amp(0);
  }
  tone.freq(freq);
  noFill();
}

void mousePressed() {
  if (mouseButton == LEFT) {
    background(0);
    image(imgs[n_diag], 10, 20);
    text(diagramSource[n_diag], 10, 15);
    x0 = mouseX;
    y0 = mouseY;
    phi0 = phi00;
    drawSyntonicCircle(x0, y0, r0, phi0, a);
  } else {

  }
}
void keyPressed() {
  if (key == '1') {
    n_diag = (n_diag + 1)% diagrams.length;
    background(0);
    image(imgs[n_diag], 10, 20);
    text(diagramSource[n_diag], 10, 15);
    phi0 = phi00;
  }
  if (key == '2') {
    n_diag = (diagrams.length + n_diag - 1)% diagrams.length;
    background(0);
    image(imgs[n_diag], 10, 20);
    text(diagramSource[n_diag], 10, 15);
    phi0 = phi00;
  }
  if (key == 'q') {
    background(0);
    image(imgs[n_diag], 10, 20);
    text(diagramSource[n_diag], 10, 15);
    phi0 += .005;
    drawSyntonicCircle(x0, y0, r0, phi0, a);
  } else if (key == 'w') {
    background(0);
    image(imgs[n_diag], 10, 20);
    text(diagramSource[n_diag], 10, 15);
    phi0 -= .005;
    drawSyntonicCircle(x0, y0, r0, phi0, a);
  }
}