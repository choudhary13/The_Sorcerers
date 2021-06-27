var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 2;

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
renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
});
renderer.render(scene, camera);

//form and the metrial --- 3D element we define 2 things.

var mesh = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 0.5, 0.7),
  new THREE.MeshLambertMaterial({ color: 0xffcc00 })
);
mesh.position.set(0, -0.75, 0);
mesh.rotation.set(Math.PI * 0.5, 0, 0);
scene.add(mesh);

var plane = new THREE.Mesh(
  new THREE.PlaneGeometry(3, 50),
  new THREE.MeshBasicMaterial({ color: 0x3c3c3d, side: THREE.DoubleSide })
);
plane.position.set(0, -1, 0);
plane.rotation.set(Math.PI * 0.5, 0, 0);
scene.add(plane);

// mesh.rotation.set(10,0,0); // about x,y,z axis
// mesh.scale.set(2,1,1);

var light1 = new THREE.PointLight(0xffffff, 1, 500);
light1.position.set(20, 10, 15);
scene.add(light1);

var light2 = new THREE.PointLight(0xffffff, 1, 500);
light2.position.set(-20, 10, 15);
scene.add(light2);

var render = function () {
  requestAnimationFrame(render); // to draw the screen again everytime it is refreshed or resized.

  renderer.render(scene, camera);
};

render();

const posx = mesh.position.x;
const posy = mesh.position.y;

document.body.addEventListener("keypress", (x) => {
  if (x.key == "a" && mesh.position.x >= posx) {
    mesh.position.x -= 1;
    //    camera.position.x -=1;
  } else if (x.key == "d" && mesh.position.x <= posx) {
    mesh.position.x += 1;
    // camera.position.x +=1;
  } else if (x.key == "w") {
    mesh.position.z -= 1;
  } else if (x.key == "s") {
    mesh.position.z += 1;
  }
});

document.getElementById("pause").addEventListener("click", () => {
  sound.pause();
});

document.getElementById("play").addEventListener("click", () => {
  sound.play();
});
