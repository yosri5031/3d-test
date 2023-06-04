const lightbox = GLightbox({
  elements: [
    {
      href: '#',
      type: 'inline',
      content: '<div id="obj-container" style="width: 800px; height: 600px;"></div>',
      width: 800,
      height: 600,
    },
  ],
});

document.addEventListener('glightbox_ready', () => {
  initThreeJS();
});
function initThreeJS() {
  const container = document.getElementById('obj-container');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.minDistance = 1;
  controls.maxDistance = 100;
  controls.maxPolarAngle = Math.PI / 2;

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 0.5);
  camera.add(pointLight);
  scene.add(camera);
  camera.position.z = 5;

  const objLoader = new THREE.OBJLoader();
  objLoader.load('model.obj', (object) => {
    scene.add(object);
    animate();
  });

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
}

