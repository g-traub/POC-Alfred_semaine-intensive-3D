const firstHandler = () =>{
  videoPromo.classList.add('invisible');
  square.classList.remove('invisible');
}
const videoPromo = document.getElementById('videoPromo');
const square = document.querySelector('.square');

videoPromo.addEventListener('click', firstHandler);

//Video variables
var streaming = false,
  video = document.querySelector("#videoPhoto"),
  canvas = document.querySelector("#canvasPhoto"),
  photo = document.querySelector("#photo");

navigator.getMedia =
navigator.getUserMedia ||
navigator.webkitGetUserMedia ||
navigator.mozGetUserMedia ||
navigator.msGetUserMedia;

navigator.getMedia(
  {
    video: true,
    audio: false
  },
  function(stream) {
    if (navigator.mozGetUserMedia) {
      video.mozSrcObject = stream;
    } else {
      var vendorURL = window.URL || window.webkitURL;
      video.srcObject = stream;
    }
    video.play();
  },
  function(err) {
    console.log("An error occured! " + err);
  }
);


function takepicture() {
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  var data = canvas.toDataURL("image/png");
  setTimeout(()=>{
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  }, 1200);
  //envoyer data au serveur
  fetch('http://localhost:8000', {
    method:'POST',
    body: data,
    mode: 'cors',
    headers:{
      'Content-Type' : 'image/png'
      }
   })
   .then(res=>{
     res.text().then((s) => {
       if (s === 'SHIRT_001'){
        window.location.href = "http://localhost:8888/semaine-intensive_3D/front/dist/bluetie.html";
       }
       else if (s === 'SHIRT_003'){
        window.location.href = "http://localhost:8888/semaine-intensive_3D/front/dist/greytie.html";
       }
     })
   })
  .catch(error=>{console.log(error)});
}

photo.addEventListener("click", e => {
  takepicture();
  e.preventDefault();
});