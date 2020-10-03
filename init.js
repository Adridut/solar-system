var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var controls = new THREE.OrbitControls(camera, renderer.domElement);

var x = 0;
var y = 0;
let z = 400;

camera.position.set(x, y, z);
camera.lookAt(0, 0, 0);
controls.update();

var planetDistanceFromSun = 1 / 2;
var time = 0.01;

g = 6.6743e-11;
s = 26 * time;
sX = 26 * time;
sZ = 26 * time;

// 1 second = 1 day
var speedAdjustment = 0.105;
var rotationAjustment = 0.11;
//O.541 * days = rotation speed

var seconds = 0;
var modelTime = 0;

//Background
const bgGeometry = new THREE.SphereGeometry(z * 1.2, 32, 32);
const bgMaterial = new THREE.MeshBasicMaterial();
bgMaterial.map = THREE.ImageUtils.loadTexture('./textures/starfield_bg4.png');
bgMaterial.side = THREE.BackSide;
const bg = new THREE.Mesh(bgGeometry, bgMaterial);
let isBackgroundDisplay = false;

//Axis
let areAxisDisplay = 0;
const axisHelper = new THREE.AxesHelper(z);

//Lights
let displaySunlight = 1;
const sunlight = new THREE.PointLight(0xffffff, 1, 10000 * planetDistanceFromSun);
sunlight.position.set(0, 0, 0);
scene.add(sunlight);

const weakLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(weakLight);

const fullLight = new THREE.AmbientLight(0xffffff, 1);
