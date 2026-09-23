// SMITHX — TRUE 3D EARTH
// Requires Three.js to be loaded by index.html

const container = document.querySelector(".earth-stage");

if (!container) {
  console.error("SmithX: .earth-stage not found.");
} else if (typeof THREE === "undefined") {
  console.error("SmithX: Three.js is not loaded.");
} else {

  // -----------------------------
  // SCENE
  // -----------------------------

  const scene = new THREE.Scene();

  // -----------------------------
  // CAMERA
  // -----------------------------

  const camera = new THREE.PerspectiveCamera(
    35,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );

  camera.position.set(0, 0, 3.2);

  // -----------------------------
  // RENDERER
  // -----------------------------

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });

  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
  );

  renderer.setSize(
    container.clientWidth,
    container.clientHeight
  );

  renderer.outputColorSpace =
    THREE.SRGBColorSpace;

  container.appendChild(renderer.domElement);

  renderer.domElement.style.position = "absolute";
  renderer.domElement.style.inset = "0";
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";

  // -----------------------------
  // LIGHTING
  // -----------------------------

  const ambientLight =
    new THREE.AmbientLight(
      0xffffff,
      0.35
    );

  scene.add(ambientLight);

  const sun =
    new THREE.DirectionalLight(
      0xffffff,
      3
    );

  sun.position.set(5, 2, 5);

  scene.add(sun);

  // -----------------------------
  // EARTH TEXTURE
  // -----------------------------

  const textureLoader =
    new THREE.TextureLoader();

  textureLoader.load(
    "assets/earth.jpg",
    function (earthTexture) {

      earthTexture.colorSpace =
        THREE.SRGBColorSpace;

      // -----------------------------
      // EARTH
      // -----------------------------

      const earthGeometry =
        new THREE.SphereGeometry(
          1,
          128,
          128
        );

      const earthMaterial =
        new THREE.MeshPhongMaterial({
          map: earthTexture,
          shininess: 12
        });

      const earth =
        new THREE.Mesh(
          earthGeometry,
          earthMaterial
        );

      scene.add(earth);

      // -----------------------------
      // ATMOSPHERE
      // -----------------------------

      const atmosphereGeometry =
        new THREE.SphereGeometry(
          1.045,
          128,
          128
        );

      const atmosphereMaterial =
        new THREE.MeshBasicMaterial({
          color: 0x3ca9ff,
          transparent: true,
          opacity: 0.12,
          side: THREE.BackSide
        });

      const atmosphere =
        new THREE.Mesh(
          atmosphereGeometry,
          atmosphereMaterial
        );

      scene.add(atmosphere);

      // -----------------------------
      // LOGISTICS HUBS
      // -----------------------------

      const hubMaterial =
        new THREE.MeshBasicMaterial({
          color: 0x00d9ff
        });

      const hubs = [
        { lat: -1.286, lon: 36.817 },
        { lat: 25.2048, lon: 55.2708 },
        { lat: 51.5074, lon: -0.1278 },
        { lat: 40.7128, lon: -74.0060 },
        { lat: 1.3521, lon: 103.8198 }
      ];

      function latLonToVector3(
        lat,
        lon,
        radius
      ) {

        const phi =
          (90 - lat) *
          Math.PI /
          180;

        const theta =
          (lon + 180) *
          Math.PI /
          180;

        return new THREE.Vector3(
          -radius *
            Math.sin(phi) *
            Math.cos(theta),

          radius *
            Math.cos(phi),

          radius *
            Math.sin(phi) *
            Math.sin(theta)
        );
      }

      hubs.forEach(hubData => {

        const position =
          latLonToVector3(
            hubData.lat,
            hubData.lon,
            1.025
          );

        const hub =
          new THREE.Mesh(
            new THREE.SphereGeometry(
              0.025,
              16,
              16
            ),
            hubMaterial
          );

        hub.position.copy(position);

        scene.add(hub);
      });

      // -----------------------------
      // ROTATION
      // -----------------------------

      function animate() {

        requestAnimationFrame(
          animate
        );

        // Actual 3D rotation
        earth.rotation.y += 0.002;

        atmosphere.rotation.y +=
          0.0022;

        // Keep hubs attached to Earth
        scene.rotation.y += 0.0005;

        renderer.render(
          scene,
          camera
        );
      }

      animate();

      // -----------------------------
      // RESIZE
      // -----------------------------

      window.addEventListener(
        "resize",
        () => {

          const width =
            container.clientWidth;

          const height =
            container.clientHeight;

          camera.aspect =
            width / height;

          camera.updateProjectionMatrix();

          renderer.setSize(
            width,
            height
          );
        }
      );
    },

    undefined,

    function (error) {
      console.error(
        "SmithX: Earth texture failed to load.",
        error
      );
    }
  );
}
