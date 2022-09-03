// import * as THREE from 'three';
// import { TWEEN } from 'three/addons/libs/tween.module.min.js';
// import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
// import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { TWEEN } from "https://unpkg.com/three@0.127.0/examples/jsm/libs/tween.module.min.js";
import { TrackballControls } from "https://unpkg.com/three@0.127.0/examples/jsm/controls/TrackballControls.js";
import { CSS3DRenderer, CSS3DObject } from "https://unpkg.com/three@0.127.0/examples/jsm/renderers/CSS3DRenderer.js";

// format: 'center symbol', 'short desc line1', 'short desc line2', 'column', 'row'
const table = [
  './images/icons/icons8-python-96.png', '1', '1', 1, 1, 
  './images/icons/icons8-javascript-96.png', '2', '2', 2, 1, 
  './images/icons/icons8-git-96.png', '3', '3', 3, 1, 
  './images/icons/icons8-github-96.png', '4', '4', 4, 1, 
  './images/icons/icons8-bash-96.png', '5', '5', 5, 1, 
  './images/icons/icons8-markdown-96.png', '6', '6', 6, 1, 
  './images/icons/icons8-typescript-96.png', '9', '9', 1, 2, 
  './images/icons/icons8-html-5-96.png', '10', '10', 2, 2, 
  './images/icons/icons8-css3-96.png', '11', '11', 3, 2, 
  './images/icons/icons8-sql-64.png', '13', '13', 4, 2, 
  './images/icons/icons8-mysql-100.png', '12', '12', 5, 2, 
  './images/icons/icons8-pytorch-96.png', '17', '17', 1, 3, 
  './images/icons/icons8-tensorflow-96.png', '16', '16', 2, 3, 
  './images/icons/icons8-numpy-96.png', '14', '14', 3, 3, 
  './images/icons/icons8-pandas-96.png', '15', '15', 4, 3, 
  './images/icons/icons8-three-67.png', '18', '18', 5, 3, 
  './images/icons/icons8-selenium-80.png', '19', '19', 6, 3, 
  './images/icons/icons8-vscode-96.png', '20', '20', 1, 4, 
  './images/icons/icons8-windows10-100.png', '21', '21', 2, 4, 
  './images/icons/icons8-linux-96.png', '22', '22', 3, 4, 
  './images/icons/icons8-uml-64.png', '7', '7', 4, 4, 
  './images/icons/icons8-json-96.png', '8', '8', 5, 4, 
  './images/icons/icons8-Leetcode-64.png', '23', '23', 1, 5, 
  './images/icons/icons8-octocat-96.png', '24', '24', 2, 5, 
  './images/icons/icons8-code-96.png', '26', '26', 3, 5, 
  './images/icons/icons8-binary-64.png', '27', '27', 4, 5, 
  './images/icons/Binary-tree_25386.png', '28', '28', 5, 5,
];

// declare major components
let camera, scene, renderer;
let controls;

// declare containers
const objects = [];
const targets = { table: [], sphere: [], helix: [], grid: [] };

// main loops
init();
animate();


function init() {
  // init camera, scene; set camera starting pos;
  camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 2500;
  scene = new THREE.Scene();

  // generate html elements for nodes and their attributes
  for ( let i = 0; i < table.length; i += 5 ) {             

    const element = document.createElement( 'div' );           // generate an element div
    element.className = 'element';                                 

    const number = document.createElement( 'div' );            // generate an inner div for 'number'
    number.className = 'number';                              
    number.textContent = ( i / 5 ) + 1;
    element.appendChild( number );

    const symbol = document.createElement( 'img' );            // generate an <img>
    symbol.className = 'symbol';
    symbol.src = table[ i ];                                   // include source in table col1 "images/images.."                       
    symbol.alt = table[i].split('-')[1];;                      // use image file name as alt; so the name display even if image failed to load
    element.appendChild( symbol );

    const details = document.createElement( 'div' );           // generate an inner div for 'details'
    details.className = 'details';
    details.innerHTML = table[ i + 1 ] + '<br>' + table[ i + 2 ];
    element.appendChild( details );

    const objectCSS = new CSS3DObject( element );           // wrap the css3 object around the html elements
    objectCSS.position.x = Math.random() * 4000 - 2000;     // set animation's random starting position when animating to other forms
    objectCSS.position.y = Math.random() * 4000 - 2000;
    objectCSS.position.z = Math.random() * 4000 - 2000;
    
    scene.add( objectCSS );                                 // add css object to scene                
    objects.push( objectCSS );                              // push css object to objects container
    const object = new THREE.Object3D();                    // init a function scoped object to feed containers
    object.position.x = ( table[ i + 3 ] * 250 ) - 1800;    // set spaces between columns for table form; the constant is the entire group's placement on scenen
    object.position.y = - ( table[ i + 4 ] * 250 ) + 860;   // set spaces between rows for table form; the constant is the entire group's placement on scenen
    targets.table.push( object );                           // push node plane object with position attribute to 'table' container

  }

  // sphere
  const vector = new THREE.Vector3();

  for ( let i = 0, l = objects.length; i < l; i ++ ) {

    const phi = Math.acos( - 1 + ( 2 * i ) / l );
    const theta = Math.sqrt( l * Math.PI ) * phi;
    const object = new THREE.Object3D();
    object.position.setFromSphericalCoords( 650, phi, theta );  // set object's position to spherical configuration                    
    vector.copy( object.position ).multiplyScalar( 2 );         // define a center for sphere objects to look at; change this along with x to make entire sphere
    vector.x -= 900;
    object.position.x -= 900;
    object.lookAt( vector );                                    // tilt objects to face center
    targets.sphere.push( object );                              // push node plane object with position attribute to 'sphere' container

  }
  
  // grid
  for ( let i = 1; i < objects.length + 1; i ++ ) {

    const object = new THREE.Object3D();                                 // grid, each plane holds 25 nodes
    object.position.x = ( ( i % 3 ) * 400 ) - 1250;                      // change spaces between rows; 5 nodes per row;
    object.position.y = ( - ( Math.floor( i / 3 ) % 3 ) * 400 ) + 400;   // change spaces between columns; 5 nodes per column;
    object.position.z = ( Math.floor( Math.abs( i-objects.length ) / 9 ) * 1000 ) - 1500; // change spaces between layers; 5 nodes per layer;
    targets.grid.push( object );                                         // push to grid container

  }

  // helix
  for ( let i = 0, l = objects.length; i < l; i ++ ) {

    const theta = i * 0.2 + Math.PI;
    const y = - ( i * 20 ) + 450;
    const object = new THREE.Object3D();
    object.position.setFromCylindricalCoords( 700, theta, y );
    vector.x = object.position.x * 10;
    vector.y = object.position.y;
    vector.z = object.position.z * 2;
    object.lookAt( vector );                                     // tilt objects facing
    targets.helix.push( object );                                // push to helix container

  }

  renderer = new CSS3DRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );       // fit renderer to device window
  document.getElementById( 'container' ).appendChild( renderer.domElement );

  // define user controls
  controls = new TrackballControls( camera, renderer.domElement ); // init a new controller; dom element required to react to controls
  controls.minDistance = 500;                                      // how close you can zoom in
  controls.maxDistance = 8000;                                     // how far you can zoom out
  controls.addEventListener( 'change', render );                   // 'change' is a three.js event; fires when camera tranformed

  // controls buttons
  const buttonTable = document.getElementById( 'table' );
  buttonTable.addEventListener( 'click', function () {

    document.getElementById( 'about' ).style.visibility = "visible";
    document.getElementById( 'techstacks' ).style.visibility = "hidden";
    document.getElementById( 'skills' ).style.visibility = "hidden";
    transform( targets.table, 1000 );

  } );

  const buttonSphere = document.getElementById( 'sphere' );
  buttonSphere.addEventListener( 'click', function () {

    document.getElementById( 'about' ).style.visibility = "hidden";
    document.getElementById( 'techstacks' ).style.visibility = "visible";
    document.getElementById( 'skills' ).style.visibility = "hidden";
    transform( targets.sphere, 1000 );

  } );

  /* const buttonHelix = document.getElementById( 'helix' );
  buttonHelix.addEventListener( 'click', function () {

    transform( targets.helix, 1000 );

  } ); */

  const buttonGrid = document.getElementById( 'grid' );            // last node gets put first
  buttonGrid.addEventListener( 'click', function () {

    camera.position.x = 300;
    document.getElementById( 'about' ).style.visibility = "hidden";
    document.getElementById( 'techstacks' ).style.visibility = "hidden";
    document.getElementById( 'skills' ).style.visibility = "visible";
    transform( targets.grid, 1000 );
    

  } );

  const buttonReset = document.getElementById( 'reset' );
  buttonReset.addEventListener( 'click', function () {
    
    transform( targets.table, 1000 );             // transform to table, and
    controls.reset();                             // and reset controls/camera to default

  } );

  transform( targets.table, 1000 );                // first animate to grid view on initial load

  window.addEventListener( 'resize', onWindowResize );  // adjust renderer.size when window is resized

}                                                       // end of init()

/* using tween.js to control the animation; tween take an object along with its initial attributes; requires the attribute's 
target value, and a duration to animate over; tween will use default or specified curve function to calculate all 
intermediate value so that, when all these values are fed into the animate framework, and gets updated frame by frame;
the animation will appear more smoothly; 
- var position = {x: 100, y: 0}
- var tween = new TWEEN.Tween(position).to({x: 200}, 1000).start() */
function transform( targets, duration ) {       // duration in miliseconds
                                            
  TWEEN.removeAll();                            // init tween by removing all previous references

  for ( let i = 0; i < objects.length; i ++ ) { // loop all objects

    const object = objects[ i ];
    const target = targets[ i ];

    new TWEEN.Tween( object.position )          // controls position; input (x,y,z)
      .to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
      .easing( TWEEN.Easing.Quadratic.InOut )   // change from the default linear interpolation to exponential
      .start();                                 // must call start for each object

    new TWEEN.Tween( object.rotation )          // control rotation
      .to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
      .easing( TWEEN.Easing.Quadratic.InOut )
      .start();

  }

  new TWEEN.Tween( this )
    .to( {}, duration * 2 )
    .onUpdate( render )
    .start();

}

function onWindowResize() {                     // adjust renderer size when window is resized

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  render();

}



function animate() {                           // main game loop

  requestAnimationFrame( animate );            // animte each screen frame; 60fps by default
  TWEEN.update();                              // update animation kit
  controls.update();                           // update controls
  auto_animate();
  
}

var count = 0;
function auto_animate() {
  if (count % 720 == 0) {
    transform( targets.table, 1500 ); // pass to tween all the initial values of the objects in table; animate over 1 second + some random modifier defined in transform()
  }
  else if (count % 360 == 0) {
    transform( targets.grid, 1500 );
  }
  else if (count % 180 == 0) {
    transform( targets.sphere, 1500 );
  }
  else if (count > 720) {
    return;
  }
  count++;
}



function render() {

  renderer.render( scene, camera );

}



// feature needed:
  // add a background that moves with the controls
  // animate objects to slightly rotate