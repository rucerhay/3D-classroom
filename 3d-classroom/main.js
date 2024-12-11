// Import Three.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';

// Scene, Camera, and Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2.5, 10);
camera.rotation.set(0, 0, 0)

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
// Ambient Light for Overall Brightness
const ambientLight = new THREE.AmbientLight(0xffffff, 1.0); // Bright ambient light
scene.add(ambientLight);

// Directional Light for Depth and Shadows
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);


// Classroom Dimensions
const roomWidth = 15;
const roomHeight = 6.5;
const roomDepth = 20;

// Floor
const floorGeometry = new THREE.PlaneGeometry(roomWidth, roomDepth);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xf08080 }); // Pale red floor
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Walls
// Wall Material (Very White)
const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,         // Pure white color
    emissive: 0xffffff,      // Add emissive white for brightness
    emissiveIntensity: 0.5,  // Adjust the emissive intensity for added glow
  });  

const frontWall = new THREE.Mesh(new THREE.PlaneGeometry(roomWidth, roomHeight), wallMaterial);
frontWall.position.set(0, roomHeight / 2, -roomDepth / 2);
scene.add(frontWall);

const backWall = new THREE.Mesh(new THREE.PlaneGeometry(roomWidth, roomHeight), wallMaterial);
backWall.position.set(0, roomHeight / 2, roomDepth / 2 - 2);
backWall.rotation.y = Math.PI;
scene.add(backWall);

const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(roomDepth, roomHeight), wallMaterial);
leftWall.position.set(-roomWidth / 2, roomHeight / 2, 0);
leftWall.rotation.y = Math.PI / 2;
scene.add(leftWall);

const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(roomDepth, roomHeight), wallMaterial);
rightWall.position.set(roomWidth / 2, roomHeight / 2, 0);
rightWall.rotation.y = -Math.PI / 2;
scene.add(rightWall);

// Ceiling Material (Same as Walls)
const ceilingMaterial = wallMaterial; // Reuse the very white wall material

// Ceiling
const ceiling = new THREE.Mesh(
  new THREE.PlaneGeometry(roomWidth, roomDepth), // Same width and depth as the room
  ceilingMaterial
);
ceiling.position.set(0, roomHeight, 0); // Position at the top of the room
ceiling.rotation.x = Math.PI / 2; // Rotate to face downward
scene.add(ceiling);


// Windows
// Window Geometry
const windowGeometry = new THREE.PlaneGeometry(roomDepth / 3, roomHeight / 2); // Each sliding panel is half the window width

// Scenic Texture for Left Window
const windowTexture = new THREE.TextureLoader().load('scenery.jpg');

// Left Window Material
const leftWindowMaterial = new THREE.MeshStandardMaterial({
  map: windowTexture,       // Scenic texture
  opacity: 0.5,             // Semi-transparent effect
  transparent: true,        // Enable transparency
});

// Gray Window Material for Right Window
const grayWindowMaterial = new THREE.MeshStandardMaterial({
  color: 0x808080,          // Gray color
  opacity: 0.5,             // Semi-transparent effect
  transparent: true,        // Enable transparency
});

// Left Window Sliding Panels
const leftWindowPanel1 = new THREE.Mesh(windowGeometry, leftWindowMaterial);
leftWindowPanel1.position.set(-roomWidth / 2 + 0.01, roomHeight / 2.5, roomDepth / 6); // Left panel
leftWindowPanel1.rotation.y = Math.PI / 2;
scene.add(leftWindowPanel1);

const leftWindowPanel2 = new THREE.Mesh(windowGeometry, leftWindowMaterial);
leftWindowPanel2.position.set(-roomWidth / 2 + 0.01, roomHeight / 2.5, -roomDepth / 6); // Right panel
leftWindowPanel2.rotation.y = Math.PI / 2;
scene.add(leftWindowPanel2);

// Right Window Sliding Panels
const rightWindowPanel1 = new THREE.Mesh(windowGeometry, grayWindowMaterial);
rightWindowPanel1.position.set(roomWidth / 2 - 0.01, roomHeight / 2.5, -roomDepth / 6); // Left panel
rightWindowPanel1.rotation.y = -Math.PI / 2;
scene.add(rightWindowPanel1);

const rightWindowPanel2 = new THREE.Mesh(windowGeometry, grayWindowMaterial);
rightWindowPanel2.position.set(roomWidth / 2 - 0.01, roomHeight / 2.5, roomDepth / 6); // Right panel
rightWindowPanel2.rotation.y = -Math.PI / 2;
scene.add(rightWindowPanel2);


// Divider Frames
const dividerGeometry = new THREE.BoxGeometry(0.1, roomHeight / 2, 0.1); // Vertical divider
const dividerMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 }); // Black frame

// Left Window Divider
const leftWindowDivider = new THREE.Mesh(dividerGeometry, dividerMaterial);
leftWindowDivider.position.set(-roomWidth / 2 + 0.01, roomHeight / 2.5, 0); // Center of the left window
leftWindowDivider.rotation.y = Math.PI / 2;
scene.add(leftWindowDivider);

// Right Window Divider
const rightWindowDivider = new THREE.Mesh(dividerGeometry, dividerMaterial);
rightWindowDivider.position.set(roomWidth / 2 - 0.01, roomHeight / 2.5, 0); // Center of the right window
rightWindowDivider.rotation.y = -Math.PI / 2;
scene.add(rightWindowDivider);

// Frame Material
const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 }); // Black frame

// Frame Geometry
const frameThickness = 0.1; // Thickness of the frame

// Left Window Frames for Panels
const leftPanel1Frame = new THREE.Mesh(
  new THREE.BoxGeometry(frameThickness, roomHeight / 2, frameThickness),
  frameMaterial
);
leftPanel1Frame.position.set(-roomWidth / 2 + 0.01, roomHeight / 2.5, roomDepth / 6);
leftPanel1Frame.rotation.y = Math.PI / 2;
scene.add(leftPanel1Frame);

const leftPanel2Frame = new THREE.Mesh(
  new THREE.BoxGeometry(frameThickness, roomHeight / 2, frameThickness),
  frameMaterial
);
leftPanel2Frame.position.set(-roomWidth / 2 + 0.01, roomHeight / 2.5, -roomDepth / 6);
leftPanel2Frame.rotation.y = Math.PI / 2;
scene.add(leftPanel2Frame);

// Right Window Frames for Panels
const rightPanel1Frame = new THREE.Mesh(
  new THREE.BoxGeometry(frameThickness, roomHeight / 2, frameThickness),
  frameMaterial
);
rightPanel1Frame.position.set(roomWidth / 2 - 0.01, roomHeight / 2.5, -roomDepth / 6);
rightPanel1Frame.rotation.y = -Math.PI / 2;
scene.add(rightPanel1Frame);

const rightPanel2Frame = new THREE.Mesh(
  new THREE.BoxGeometry(frameThickness, roomHeight / 2, frameThickness),
  frameMaterial
);
rightPanel2Frame.position.set(roomWidth / 2 - 0.01, roomHeight / 2.5, roomDepth / 6);
rightPanel2Frame.rotation.y = -Math.PI / 2;
scene.add(rightPanel2Frame);

// Door
const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 }); // Brown color for the door
const doorGeometry = new THREE.PlaneGeometry(1.2, 2.5); // Door dimensions (width x height)
const door = new THREE.Mesh(doorGeometry, doorMaterial);

// Positioning the Door
door.position.set(-roomWidth / 2 + 0.6, 1.25, -roomDepth / 2 + 2); // Slightly inset from the wall
door.rotation.y = Math.PI / 2; // Rotate to align with the left wall
scene.add(door);


// Whiteboard
const whiteboardMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const whiteboardGeometry = new THREE.PlaneGeometry(6, 3);
const whiteboard = new THREE.Mesh(whiteboardGeometry, whiteboardMaterial);
whiteboard.position.set(0, 4, -roomDepth / 2 + 0.01);
scene.add(whiteboard);

// Projected Slides on Whiteboard
// Slide Paths
const slidePaths = [
    'slides/slide1.png',
    'slides/slide2.png',
    'slides/slide3.png',
    'slides/slide4.png',
    'slides/slide5.png',
  ];
  let currentSlideIndex = 0; // Start with the first slide
  
  // Texture Loader with HD Settings
  const textureLoader = new THREE.TextureLoader();
  const slideTexture = textureLoader.load(slidePaths[currentSlideIndex], (texture) => {
    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    texture.anisotropy = maxAnisotropy; // Enable anisotropic filtering for clarity
  });
  
  // Slide Material and Geometry
  const slideGeometry = new THREE.PlaneGeometry(5.5, 3); // HD aspect ratio
  const slideMaterial = new THREE.MeshBasicMaterial({
    map: slideTexture,
    transparent: true,
  });
  const slide = new THREE.Mesh(slideGeometry, slideMaterial);
  
  // Position the Slide
  slide.position.set(0, 4.1, -roomDepth / 2 + 0.05); // Centered on whiteboard
  scene.add(slide);
  
  // Function to Update Slides
  function updateSlide() {
    textureLoader.load(slidePaths[currentSlideIndex], (texture) => {
      const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
      texture.anisotropy = maxAnisotropy; // Enable anisotropic filtering
      slideMaterial.map = texture; // Update the texture map
      slideMaterial.needsUpdate = true; // Notify Three.js that the material has changed
    });
  }
  
  // Navigation Buttons
  const nextButton = document.createElement('button');
nextButton.innerText = 'Next Slide';
nextButton.style.position = 'absolute';
nextButton.style.bottom = '120px'; // Place above walking buttons
nextButton.style.left = '65%'; // Slightly to the right
nextButton.style.transform = 'translateX(-50%)';
document.body.appendChild(nextButton);
  
  nextButton.addEventListener('click', () => {
    if (currentSlideIndex < slidePaths.length - 1) {
      currentSlideIndex++;
      updateSlide();
    }
  });
  
  // Previous Slide Button
  const prevButton = document.createElement('button');
prevButton.innerText = 'Previous Slide';
prevButton.style.position = 'absolute';
prevButton.style.bottom = '120px'; // Place above walking buttons
prevButton.style.left = '35%'; // Slightly to the left
prevButton.style.transform = 'translateX(-50%)';
document.body.appendChild(prevButton);
  
  prevButton.addEventListener('click', () => {
    if (currentSlideIndex > 0) {
      currentSlideIndex--;
      updateSlide();
    }
  });
  
  // Renderer High-Quality Settings
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.physicallyCorrectLights = true;
  document.body.appendChild(renderer.domElement);
  

// Renderer High-Quality Settings
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.physicallyCorrectLights = true;
document.body.appendChild(renderer.domElement);

// Tables and Chairs with Characters (Retained)
const tableGeometry = new THREE.BoxGeometry(6, 0.1, 1.5);
const tableMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
const chairGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const chairMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });

const totalCharacters = 31;
let addedCharacters = 0;

for (let row = 0; row < 3; row++) {
  for (let col = 0; col < 2; col++) {
    const x = col * 8 - 4;
    const z = row * 5 - 8;

    // Add Table
    const tableMesh = new THREE.Mesh(tableGeometry, tableMaterial);
    tableMesh.position.set(x, 1, z);
    scene.add(tableMesh);

    // Add Chairs and Characters
    for (let i = -2; i <= 2; i++) {
      if (addedCharacters >= totalCharacters) break;

      const chairX = x + i * 1.2;
      const chairZ = z + (i % 2 === 0 ? 1.8 : -1.8);

      const chairMesh = new THREE.Mesh(chairGeometry, chairMaterial);
      chairMesh.position.set(chairX, 0.75, chairZ);
      scene.add(chairMesh);

      const characterMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const characterGeometry = new THREE.CylinderGeometry(0.2, 0.4, 1, 16);
      const character = new THREE.Mesh(characterGeometry, characterMaterial);
      character.position.set(chairX, 1.5, chairZ);

      const hairColor = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
      const hairStyle = Math.random();
      let hair;

      if (hairStyle < 0.33) {
        hair = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), hairColor);
      } else if (hairStyle < 0.66) {
        hair = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.2, 0.4, 16), hairColor);
      } else {
        hair = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.25, 0.4), hairColor);
      }

      hair.position.set(0, 0.5, 0);
      character.add(hair);
      scene.add(character);

      addedCharacters++;
    }
  }
}

// Teacher's Table
const teacherTableGeometry = new THREE.BoxGeometry(6, 0.1, 2);
const teacherTableMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
const teacherTable = new THREE.Mesh(teacherTableGeometry, teacherTableMaterial);
teacherTable.position.set(0, 1, -roomDepth / 2 + 3);
scene.add(teacherTable);

// Projector
const projectorGeometry = new THREE.BoxGeometry(0.5, 0.2, 0.5);
const projectorMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
const projector = new THREE.Mesh(projectorGeometry, projectorMaterial);
projector.position.set(-1, 1.3, -roomDepth / 2 + 3.2);
scene.add(projector);

const projectorLight = new THREE.SpotLight(0xffffff, 1);
projectorLight.position.set(-1, 1.5, -roomDepth / 2 + 3.2);
projectorLight.target = slide;
projectorLight.angle = Math.PI / 6;
projectorLight.distance = 20;
scene.add(projectorLight);
scene.add(projectorLight.target);

// Laptop
const laptopBaseGeometry = new THREE.BoxGeometry(0.6, 0.05, 0.4);
const laptopScreenGeometry = new THREE.PlaneGeometry(0.5, 0.3);
const laptopMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });

const laptopBase = new THREE.Mesh(laptopBaseGeometry, laptopMaterial);
laptopBase.position.set(1, 1.1, -roomDepth / 2 + 3.2);
scene.add(laptopBase);

const laptopScreen = new THREE.Mesh(laptopScreenGeometry, laptopMaterial);
laptopScreen.position.set(1, 1.3, -roomDepth / 2 + 3.4);
laptopScreen.rotation.x = -Math.PI / 3;
scene.add(laptopScreen);

// Teacher Auley
const teacherMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 }); // Black shirt
const pantsMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff }); // Blue pants

// Body
const bodyGeometry = new THREE.CylinderGeometry(0.3, 0.4, 1.2, 16);
const body = new THREE.Mesh(bodyGeometry, teacherMaterial);
body.position.set(roomWidth / 2 - 1, 1.8, -roomDepth / 2 + 2); // Position near the right wall
scene.add(body);

// Legs
const legsGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.8, 16);
const legs = new THREE.Mesh(legsGeometry, pantsMaterial);
legs.position.set(roomWidth / 2 - 1, 0.9, -roomDepth / 2 + 2);
scene.add(legs);

// Head
const headMaterial = new THREE.MeshStandardMaterial({ color: 0xffe0bd }); // Skin tone
const headGeometry = new THREE.SphereGeometry(0.25, 16, 16);
const head = new THREE.Mesh(headGeometry, headMaterial);
head.position.set(roomWidth / 2 - 1, 2.8, -roomDepth / 2 + 2);
scene.add(head);

// Hair
const hairMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 }); // Black hair
const hairGeometry = new THREE.SphereGeometry(0.3, 16, 16);
const hair = new THREE.Mesh(hairGeometry, hairMaterial);
hair.scale.set(1, 0.6, 1); // Curly tied hair effect
hair.position.set(0, 0.25, 0);
head.add(hair);

// Label for Teacher Auley
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 256;
canvas.height = 64;
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, 256, 64);
ctx.fillStyle = 'black';
ctx.font = '30px Arial';
ctx.textAlign = 'center';
ctx.fillText("Ma'am Auley", 128, 40);

const labelTexture = new THREE.CanvasTexture(canvas);
const labelMaterial = new THREE.SpriteMaterial({ map: labelTexture });
const label = new THREE.Sprite(labelMaterial);
label.scale.set(2, 0.5, 1);
label.position.set(roomWidth / 2 - 1, 3.6, -roomDepth / 2 + 2); // Positioned above her head
scene.add(label);

// User Walking Controls (Forward in Facing Direction)
const moveSpeed = 0.5; // Speed of movement

// Walk Forward Button
const forwardButton = document.createElement('button');
forwardButton.innerText = 'Walk Forward';
forwardButton.style.position = 'absolute';
forwardButton.style.bottom = '80px';
forwardButton.style.left = '50%';
forwardButton.style.transform = 'translateX(-50%)';
document.body.appendChild(forwardButton);

// Walk Backward Button
const backwardButton = document.createElement('button');
backwardButton.innerText = 'Walk Backward';
backwardButton.style.position = 'absolute';
backwardButton.style.bottom = '40px';
backwardButton.style.left = '50%';
backwardButton.style.transform = 'translateX(-50%)';
document.body.appendChild(backwardButton);

// Calculate Direction and Move
forwardButton.addEventListener('click', () => {
  const direction = new THREE.Vector3();
  camera.getWorldDirection(direction); // Get the camera's forward direction
  camera.position.addScaledVector(direction, moveSpeed); // Move forward in that direction
});

backwardButton.addEventListener('click', () => {
  const direction = new THREE.Vector3();
  camera.getWorldDirection(direction); // Get the camera's forward direction
  camera.position.addScaledVector(direction, -moveSpeed); // Move backward in the opposite direction
});


// Swipe-to-Turn Controls
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

// Touch Events
document.addEventListener('touchstart', (e) => {
  isDragging = true;
  previousMousePosition.x = e.touches[0].clientX;
});

document.addEventListener('touchmove', (e) => {
  if (isDragging) {
    const deltaX = e.touches[0].clientX - previousMousePosition.x;
    camera.rotation.y -= deltaX * 0.005; // Sensitivity adjustment
    previousMousePosition.x = e.touches[0].clientX;
  }
});

document.addEventListener('touchend', () => {
  isDragging = false;
});

// Mouse Events
document.addEventListener('mousedown', (e) => {
  isDragging = true;
  previousMousePosition.x = e.clientX;
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const deltaX = e.clientX - previousMousePosition.x;
    camera.rotation.y -= deltaX * 0.005; // Sensitivity adjustment
    previousMousePosition.x = e.clientX;
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});


// Render Loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
