img = "";
objects = [];
status = "";

function preload() {
    img = loadImage('aquarium.jpeg');
}

function setup() {
    canvas = createCanvas(500 , 370);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting object"; 
}

function modelLoaded() {
    console.log("Model is loaded");
    status = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results) {
    console.log(results);
    if(error) {
        console.error("Error");
        window.alert("Error");
    }
    else {
        console.log(results);
        objects = results;
    }
}

function draw() {
    document.getElementById("status").innerHTML = "Status : Status is detected";

    image(img, 0, 0, 500, 400);

    if (status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Object is detected";
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }
    } 
}

function back() {
    window.location = "index.html";
}