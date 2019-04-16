//Video variables
var streaming = false,
  video = document.querySelector("video"),
  canvas = document.querySelector("canvas"),
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
  console.log('click');
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  var data = canvas.toDataURL("image/png");
  setTimeout(()=>{
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  }, 1200);
  //envoyer data au serveur
  async function postData(url, data){
    return fetch(url, {
      credentials: 'same-origin',
      method:'POST',
      body: data,
      mode: 'no-cors',
      headers: new Headers({
        'Content-Type' : 'image/png'
      }),
    })
  }
  postData('http://localhost:8000', data);
}

photo.addEventListener("click", e => {
  takepicture();
  e.preventDefault();
});