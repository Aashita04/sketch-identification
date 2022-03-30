function setup(){
  canvas = createCanvas(300,300);
  canvas.center()
  background("white");
  canvas.mouseReleased(classifyCanvas);
  synth = window.speechSynthesis;
}

function preload(){
  classifier = ml5.imageClassifier('DoodleNet')
}

function clearcanvas(){
    background("white");
}

function draw(){
  strokeWeight(5);
  stroke(0);
  if (mouseIsPressed){
    line ( pmouseX , pmouseY , mouseX , mouseY);
  }
}

function classifyCanvas(){
  classifier.classify(canvas , gotResult);
}

function gotResult(error, result){
  if (error){
    console.log(error);
  }
  else{
    console.log(result);
    document.getElementById("label").innerHTML= "Label : " + result[0].label;
    document.getElementById("confidence").innerHTML= "Confidence : " + Math.round(result[0].confidence * 100) + "%";

    utterThis= new SpeechSynthesisUtterance(result[0].label);
    synth.speak(utterThis);

  }
}