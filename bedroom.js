objectDetector = "";

img = "";
status = "";
objects = [];

function preload()
{
    img = loadImage('bedroom.jpg');
}

function setup()
{
    canvas = createCanvas(640, 420);
    canvas.center()
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw()
{
    image(img, 0, 0, 640, 420);

    if (status != "")
    {
        for (s = 0; s < objects.length; s++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";

            fill("#FF0000");
            percentage = floor(objects[s].confidence * 100);
            text(objects[s].label + " " + percentage + "%", objects[s].x + 15, objects[s].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[s].x, objects[s].y, objects[s].width, objects[s].height);
        }
    }

}

function modelLoaded()
{
    console.log("Model Loaded !");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results)
{
    if (error) {
          console.error(error)
    } 
        console.log(results);
        objects = results
}

function back()
{
    window.location = "index.html";
}