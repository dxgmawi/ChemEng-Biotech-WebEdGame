import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';

// Set up scene, camera, renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xaee4f7);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

// Ground
const groundGeometry = new THREE.PlaneGeometry(100, 100);
const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x9ccc65 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Character
const character = new THREE.Group();

const torso = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 0.5), new THREE.MeshPhongMaterial({ color: 0x4caf50 }));
torso.position.y = 1;

const head = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8), new THREE.MeshPhongMaterial({ color: 0xffcc80 }));
head.position.y = 2.4;

const leftArm = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.5, 0.3), new THREE.MeshPhongMaterial({ color: 0x4caf50 }));
leftArm.position.set(-0.8, 1.25, 0);

const rightArm = leftArm.clone();
rightArm.position.x = 0.8;

const leftLeg = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.5, 0.4), new THREE.MeshPhongMaterial({ color: 0x757575 }));
leftLeg.position.set(-0.3, -0.75, 0);

const rightLeg = leftLeg.clone();
rightLeg.position.x = 0.3;

character.add(torso, head, leftArm, rightArm, leftLeg, rightLeg);
scene.add(character);

// Camera position
camera.position.set(0, 3, 5);
camera.lookAt(character.position);

// Movement variables
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const keys = { w: false, a: false, s: false, d: false, space: false };
let isOnGround = true;

// Keyboard input
window.addEventListener('keydown', (e) => {
  keys[e.key.toLowerCase()] = true;
});

window.addEventListener('keyup', (e) => {
  keys[e.key.toLowerCase()] = false;
});

function animate() {
  requestAnimationFrame(animate);

  direction.set(0, 0, 0);
  const speed = 0.1;

  if (keys.w) direction.z -= speed;
  if (keys.s) direction.z += speed;
  if (keys.a) direction.x -= speed;
  if (keys.d) direction.x += speed;

  character.position.add(direction);

  // Simple jump logic
  if (keys.space && isOnGround) {
    velocity.y = 0.2;
    isOnGround = false;
  }

  // Gravity
  if (!isOnGround) {
    velocity.y -= 0.01;
    character.position.y += velocity.y;
    if (character.position.y <= 0) {
      character.position.y = 0;
      velocity.y = 0;
      isOnGround = true;
    }
  }

  camera.position.x = character.position.x;
  camera.position.z = character.position.z + 5;
  camera.lookAt(character.position);

  renderer.render(scene, camera);
}

animate();

