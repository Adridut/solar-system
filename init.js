const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

let solarSystem = new Array(9);

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let controls = new THREE.OrbitControls(camera, renderer.domElement);

let x = 0;
let y = 0;
let z = 400;

camera.position.set(x, y, z);
camera.lookAt(0, 0, 0);
controls.update();

let planetDistanceFromSun = 1 / 2;
let time = 0.01;

const g = 6.6743e-11;
let s = 26 * time;
let sX = 26 * time;
let sZ = 26 * time;

// 1 second = 1 day
let speedAdjustment = 0.105;
let rotationAjustment = 0.11;
//O.541 * days = rotation speed

let seconds = 0;
let modelTime = 0;

//Background
const bgGeometry = new THREE.SphereGeometry(z * 1.2, 32, 32);
const bgMaterial = new THREE.MeshBasicMaterial();
bgMaterial.map = THREE.ImageUtils.loadTexture('./textures/starfield_bg4.png');
bgMaterial.side = THREE.BackSide;
const bg = new THREE.Mesh(bgGeometry, bgMaterial);
let isBackgroundDisplay = false;

//Axis
let areAxisDisplay = false;
const axisHelper = new THREE.AxesHelper(z);

//Lights
let displaySunlight = true;
const sunlight = new THREE.PointLight(0xffffff, 1, 10000 * planetDistanceFromSun);
sunlight.position.set(0, 0, 0);
scene.add(sunlight);
const weakLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(weakLight);
const fullLight = new THREE.AmbientLight(0xffffff, 1);

//Orbits
let areOrbitsDisplay = false;
let orbits = createOrbits();

//Planets
generatePlanets();

//Raycaster
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(), INTERSECTED;
click = false;




