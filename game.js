const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);
scene.fog = new THREE.Fog(0x87ceeb, 30, 150);

const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 300
);

camera.position.set(0, 1.5, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// Lighting
scene.add(new THREE.HemisphereLight(0xffffff, 0x667755, 2));

const sunlight = new THREE.DirectionalLight(0xffffff, 2);
sunlight.position.set(-20, 40, 20);
scene.add(sunlight);

// Ground
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(200, 300),
  new THREE.MeshStandardMaterial({ color: 0x397b35 })
);
ground.rotation.x = -Math.PI / 2;
ground.position.set(0, -0.1, -130);
scene.add(ground);

// Road
const road = new THREE.Mesh(
  new THREE.PlaneGeometry(12, 300),
  new THREE.MeshStandardMaterial({ color: 0x292929 })
);
road.rotation.x = -Math.PI / 2;
road.position.set(0, 0, -130);
scene.add(road);

// Road lines
const lines = [];

for (let i = 0; i < 20; i++) {
  const line = new THREE.Mesh(
    new THREE.BoxGeometry(0.15, 0.025, 4),
    new THREE.MeshStandardMaterial({ color: 0xffffff })
  );

  line.position.set(0, 0.02, -i * 12);
  scene.add(line);
  lines.push(line);
}

// Trees
const trees = [];

function createTree(x, z) {
  const tree = new THREE.Group();

  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15, 0.2, 2),
    new THREE.MeshStandardMaterial({ color: 0x654321 })
  );
  trunk.position.y = 1;
  tree.add(trunk);

  const leaves = new THREE.Mesh(
    new THREE.ConeGeometry(1.2, 3, 8),
    new THREE.MeshStandardMaterial({ color: 0x145c24 })
  );
  leaves.position.y = 3;
  tree.add(leaves);

  tree.position.set(x, 0, z);
  scene.add(tree);
  trees.push(tree);
}

for (let i = 0; i < 18; i++) {
  createTree(-10, -i * 10);
  createTree(10, -i * 10);
}

// Car dashboard attached to camera
const dashboard = new THREE.Group();
camera.add(dashboard);

const dash = new THREE.Mesh(
  new THREE.BoxGeometry(2.8, 0.45, 0.65),
  new THREE.MeshStandardMaterial({ color: 0x171717, roughness: 0.8 })
);
dash.position.set(0, -0.85, -1.3);
dashboard.add(dash);

// Steering wheel
const wheel = new THREE.Mesh(
  new THREE.TorusGeometry(0.38, 0.055, 12, 40),
  new THREE.MeshStandardMaterial({ color: 0x111111 })
);
wheel.position.set(-0.45, -0.48, -1.05);
dashboard.add(wheel);

// Wheel center
const center = new THREE.Mesh(
  new THREE.CylinderGeometry(0.11, 0.11, 0.09, 24),
  new THREE.MeshStandardMaterial({ color: 0x555555 })
);
center.rotation.x = Math.PI / 2;
center.position.copy(wheel.position);
dashboard.add(center);

// Controls
const keys = {};
let speed = 0;
let steering = 0;

window.addEventListener("keydown", e => {
  keys[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup", e => {
  keys[e.key.toLowerCase()] = false;
});

// Game loop
function animate() {
  requestAnimationFrame(animate);

  if (keys["w"] || keys["arrowup"]) {
    speed = Math.min(speed + 0.15, 100);
  } else if (keys["s"] || keys["arrowdown"]) {
    speed = Math.max(speed - 0.3, 0);
  } else {
    speed = Math.max(speed - 0.04, 0);
  }

  if (keys["a"] || keys["arrowleft"]) steering = Math.min(steering + 0.025, 0.6);
  else if (keys["d"] || keys["arrowright"]) steering = Math.max(steering - 0.025, -0.6);
  else steering *= 0.9;

  camera.position.x += steering * speed * 0.0008;
  camera.position.x = THREE.MathUtils.clamp(camera.position.x, -4, 4);

  wheel.rotation.z = -steering * 1.5;

  const movement = speed * 0.012;

  lines.forEach(line => {
    line.position.z += movement;
    if (line.position.z > 5) line.position.z -= 240;
  });

  trees.forEach(tree => {
    tree.position.z += movement;
    if (tree.position.z > 5) tree.position.z -= 180;
  });

  document.getElementById("speed").textContent =
    "SPEED: " + Math.round(speed) + " KM/H";

  renderer.render(scene, camera);
}

animate();

// Window resizing
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
