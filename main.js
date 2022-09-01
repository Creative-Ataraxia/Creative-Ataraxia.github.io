import './style.css';
import * as THREE from 'three';
import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';


// Scene
const scene = new THREE.Scene();                                 // init scene object
const camera = new THREE.PerspectiveCamera(                      // init camera object
  75,                                                            // Field of view; default = 50
  window.innerWidth / window.innerHeight,                        // aspect ratio; based on device's browswer size; default = 1
  0.1,                                                           // controls what objects are visible; near plane; default = 0.1
  1000,                                                          // far plane; default = 2000
);
const renderer = new THREE.WebGLRenderer({                       // init renderer
  canvas: document.querySelector('#bg'),                         // select canvas
});
renderer.setPixelRatio(window.devicePixelRatio);                 // set to device's pixel ratio
renderer.setSize(window.innerWidth, window.innerHeight);         // make renderer full screen
camera.position.setZ(30);

renderer.render(scene, camera);                                  // invoke the renderer


// Objects                                                       // init an object
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);        // define object's geometry
const material = new THREE.MeshStandardMaterial({                // define object's material
  color: 0xff6347,
  wireframe: false,
});
const torus = new THREE.Mesh(geometry, material);                // mesh object's geometry and material
scene.add(torus);                                                // add object to scene


// Lights
const pointLight = new THREE.PointLight(0xffffff);               // init a single point of light
pointLight.position.set(5, 5, 5);                                // set light's starting (x, y, z) position
const ambientLight = new THREE.AmbientLight(0xffffff);           // init a ambient light
scene.add(pointLight, ambientLight);                             // add light to scene

const lightHelper = new THREE.PointLightHelper(pointLight);      // init a light helper object which shows position / direction of the light
const gridHelper = new THREE.GridHelper(200, 50);                // init a grid helper object which shows the perspective's horizon
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement); // init a camera control unit

function addStar() {                                             // populate scene with randomly generated objects
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);       // define objects' geometry
  const material = new THREE.MeshStandardMaterial({              // define objects' material
    color: 0xffffff,
  });
  const star = new THREE.Mesh(geometry, material);               // mesh objects' geometry and material
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100)); // generate sets of random (x, y, z) positions
  star.position.set(x, y, z);                                    // set objects' starting (x, y, z) position with random data
  scene.add(star)                                                // add objects to scene  
}

Array(200).fill().forEach(addStar);                              // invoke addStar() 200 times

const spaceTexture = new THREE.TextureLoader().load('space.jpg');// load background image
scene.background = spaceTexture;


// Avatar
const royTexture = new THREE.TextureLoader().load('roy.jpg');    // load avatar image
const roy = new THREE.Mesh(                                      // init avatar object
  new THREE.BoxGeometry(3, 3, 3),                                // define avatar's geometry
  new THREE.MeshBasicMaterial({                                  // define avatar's material
    map: royTexture,
  })
);
scene.add(roy)


// Moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg');  // load moon image
const normalTexure = new THREE.TextureLoader().load('normal.jpg'); // additional textures to mesh
const moon = new THREE.Mesh(                                     // init moon object
  new THREE.SphereGeometry(3, 32, 32),                           // define moon's geometry
  new THREE.MeshStandardMaterial({                               // define moon's material
    map: moonTexture,
    normalMap: normalTexure,
  })
);
scene.add(moon)

moon.position.z = 30;                                            // move the object to the right on the z axis
moon.position.setX(-10);                                         // direction of vertical scrolling


// Scroll Animation
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;           // get the top position of the browser window; t will always be neg
  moon.rotation.x += 0.05;                                       // manipulate object's (xyz) as body scrolls
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  roy.rotation.y += 0.01;
  roy.rotation.z += 0.01;

  camera.position.z = t * -0.01;                                 // neg * neg will get pos camera movement
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;                             // trigger moveCamera() each time body scrolls
moveCamera();






// Animation Loop
function animate() {
  requestAnimationFrame(animate)                                 // calls the browser to request next frame
  torus.rotation.x += 0.01                                       // attributes that gets updated each frame
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01
  controls.update();                                             // enable camera controls are updated each frame
  renderer.render(scene, camera);                                // render each frame
}

animate();