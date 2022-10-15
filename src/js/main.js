import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import sunTexture from "../img/sun.jpg";
import mercuryTexture from "../img/mercury.jpg";
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sets the color of the background
// renderer.setClearColor(0xFEFEFE);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const textureLoader = new THREE.TextureLoader();
// Sets orbit control to move the camera around
const orbit = new OrbitControls(camera, renderer.domElement);

// Camera positioning
camera.position.set(16, 56, 56);
orbit.update();

// Sets a 12 by 12 gird helper
// const gridHelper = new THREE.GridHelper(12, 12);
// scene.add(gridHelper);

// Sets the x, y, and z axes with each having a length of 4
// const axesHelper = new THREE.AxesHelper(4);
// scene.add(axesHelper);

const sunGeometry = new THREE.SphereGeometry(16, 30, 30);
const sunMaterial = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sunTexture),
});
const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sunMesh);
const pointLight = new THREE.PointLight(0xffffff, 2, 300);
scene.add(pointLight);

const mercuryGeometry = new THREE.SphereGeometry(3.2, 30, 30);
const mercuryMaterial = new THREE.MeshStandardMaterial({
  map: textureLoader.load(mercuryTexture),
});
const mercuryMesh = new THREE.Mesh(mercuryGeometry, mercuryMaterial);

const mercuryObj = new THREE.Object3D();
mercuryObj.add(mercuryMesh);
scene.add(mercuryObj);
mercuryMesh.position.x = 28;

function animate() {
  sunMesh.rotateY(0.001);
  mercuryObj.rotateY(0.02);
  mercuryMesh.rotateY(0.01);
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
