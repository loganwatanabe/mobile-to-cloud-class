
var paths = [];
var count = 0;

$(function() {
  //load the ajax of the image names for "get picture"
  $.getJSON("pic_paths.json", function(data, diditwork) {
    console.log(diditwork);
    for(i=0; i< data.pictures.length; i++){
      paths.push(data.pictures[i].url);
    }
  });
});

window.onload = function(){

  var draw = {
    fill: "#FF0000",
    stroke: "#FF0000",
    clear: "#FFFFFF",
    size: 5,
    cap: 'round',
    join: 'round',
    width: 300,
    height:300
  }

  var canvas = $("#canvas")[0];
  var canvastop = canvas.offsetTop;
  var canvasleft = canvas.offsetLeft;

  var context = canvas.getContext("2d");

  var lastx;
  var lasty;

  function changeColor(color_code){
    draw.fill = color_code;
    draw.stroke = color_code;
  }

  $(".col").on("click", function(){
    var colour = $(this).css("background-color");
    changeColor(colour);
    $("#popupMenu").popup("close");
  });


  function deletePic(){
    context.fillStyle = draw.clear;
    context.rect(0,0, draw.width, draw.height);
    context.fill();
    count=0;
  }

  function path(moves){//creates the drawing
    context.beginPath();
    context.strokeStyle = draw.stroke;
    context.fillStyle = draw.fill;
    context.lineCap = draw.cap;
    context.lineJoin = draw.join;
    context.lineWidth = draw.size;

    moves();

    context.fill();
    context.stroke();
    context.closePath();
  }

  function dot(x,y) { //creates dot
    path(function(){
      context.arc(x,y,1,0,Math.PI*2,true);
    });
  }

    function line(fromx,fromy, tox,toy) { //draws line
    path(function(){
      context.moveTo(fromx, fromy);
      context.lineTo(tox, toy);
    });
  }


  function position(event,action) { //touch event on canvas

    event.preventDefault();

    var newx = event.touches[0].clientX - canvasleft;
    var newy = event.touches[0].clientY - canvastop;
    action(lastx,lasty, newx,newy);

    lastx = newx;
    lasty = newy;
  }

 canvas.ontouchstart = function(event){
    position(event,function(lastx,lasty, newx,newy){
            dot(newx,newy);
    })
  }

  canvas.ontouchmove = function(event){                   
    position(event,function(lastx,lasty, newx,newy){
      line(lastx,lasty, newx,newy);
    })
  }





//loading an uploaded image from camera/file

      function drawOnCanvas(file) {
        var reader = new FileReader();

        reader.onload = function (e) {
          var dataURL = e.target.result,
              img = new Image();

          img.onload = function() {

              //check picture orienation
              if(img.height>img.width){  //I've realized that context.rotate() not supported by mobile browsers
                                          //also, I only have an android to test this on.
                context.save();
                context.translate(150,150)
                context.rotate(Math.PI/2);
                context.drawImage(img, -150, -150, 300, 300);
                context.restore();
              }
              else{
                context.drawImage(img, 0, 0, 300, 300);
              }
          };

          img.src = dataURL;
        };

        reader.readAsDataURL(file);
      }

      function upload(file) {
        var form = new FormData(),
            xhr = new XMLHttpRequest();

        form.append('image', file);
        xhr.open('post', 'pictures/pics.txt', true);
        xhr.send(form);
      }


      $("#upload").on("change", function(){ //when user uplaods to input
        var file = $("#upload")[0].files[0];

        upload(file);
        drawOnCanvas(file);
        count = -1;

      });




  //loading the included pictures into canvas on click

  $("#random").on("click", function(){
    var img = new Image();
    img.src = paths[count%5];
    count++;
    img.onload = function(){
      context.drawImage(img,0,0, 300, 300);
    };

  });

  $("#delete").on("click", function(){
    deletePic();
  });

  $("#clear").on("click", function(){
    if(count == 0){
      deletePic();
    }
    else if(count == -1){
      //last uploaded image was user submitted
        var file = $("#upload")[0].files[0];
        upload(file);
        drawOnCanvas(file);
    }
    else{
      //using the given pictures
      var img = new Image();
      img.src = paths[(count-1)%5];
      context.drawImage(img, 0, 0, 300, 300);
    }
  });

  deletePic();//to initiate the blank canvas


}