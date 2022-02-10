import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

const geometry = new THREE.TorusGeometry(5,1,16,100)
const material = new THREE.MeshStandardMaterial({color: 0x707070});
const torus1 = new THREE.Mesh(geometry, material);

scene.add(torus1)


const geometry2 = new THREE.TorusGeometry(7,1,16,100)
const material2 = new THREE.MeshStandardMaterial({color: 0x707070});
const torus2 = new THREE.Mesh(geometry2, material2);

scene.add(torus2)

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material)
  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(400));
  star.position.set(x,y,z)
  scene.add(star)
}

Array(2000).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background= spaceTexture;


const pfpTexture = new THREE.TextureLoader().load('pfp.jpg');

const pfp = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: pfpTexture})
)

scene.add(pfp);

const feurTexture = new THREE.TextureLoader().load("feur.png")

const feur = new THREE.Mesh(
  new THREE.BoxGeometry(0.5,0.5,0.5),
  new THREE.MeshBasicMaterial({map: feurTexture})
)

scene.add(feur);

// Moonbama

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
  })
);

scene.add(moon);

moon.position.z=30;
moon.position.setX(-10);







function animate() {
  requestAnimationFrame(animate);

  torus1.rotation.x += 0.01;
  torus1.rotation.y += 0.005;
  torus1.rotation.z += 0.01;
  torus2.rotation.x -= 0.005;
  torus2.rotation.y -= 0.01;
  torus2.rotation.z -= 0.01;

  moon.rotation.y += 0.001;

  controls.update();

  renderer.render(scene, camera);
}

animate()