var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const listener = new THREE.AudioListener();
camera.add(listener);
// create a global audio source
const sound = new THREE.Audio(listener);
// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load("test_pubG.ogg", function (buffer) {
  sound.setBuffer(buffer);
  sound.setLoop(true);
  sound.setVolume(0.5);
  sound.play();
});

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#000000");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
});

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial({ color: 0x9a9e97 });
//var mesh = new THREE.Mesh(geometry, material);
//scene.add(mesh);

meshX = -20;
for (var i = 0; i < 25; i++) {
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = (Math.random() - 0.5) * 10;
  mesh.position.y = (Math.random() - 0.5) * 10;
  mesh.position.z = (Math.random() - 0.5) * 10;
  scene.add(mesh);
  meshX += 1;
}

var light = new THREE.PointLight(0xffffff, 1, 1000);
light.position.set(0, 0, 0);
scene.add(light);

var light = new THREE.PointLight(0xffffff, 2, 1000);
light.position.set(0, 0, 25);
scene.add(light);

var render = function () {
  requestAnimationFrame(render);

  renderer.render(scene, camera);
};

function onMouseMove(event) {
  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObjects(scene.children, true);
  for (var i = 0; i < intersects.length; i++) {
    this.tl = new TimelineMax();
    this.tl.to(intersects[i].object.scale, 1, { x: 2, ease: Expo.easeOut });
    this.tl.to(intersects[i].object.scale, 0.5, { x: 0.5, ease: Expo.easeOut });
    this.tl.to(
      intersects[i].object.position,
      0.5,
      {
        x: 2,
        ease: Expo.easeOut,
      },
      "-1.5"
    );
    this.tl.to(
      intersects[i].object.rotation,
      0.5,
      { y: Math.PI * 0.5, ease: Expo.easeOut },
      "=-1.5"
    );
  }
}

window.addEventListener("mousemove", onMouseMove);
render();

document.getElementById("pause").addEventListener("click", () => {
  sound.pause();
});

document.getElementById("play").addEventListener("click", () => {
  sound.play();
});
