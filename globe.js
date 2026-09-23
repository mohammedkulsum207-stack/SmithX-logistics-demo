/* =========================================================
   SMITHX — REAL 3D EARTH
   ========================================================= */

const canvas = document.getElementById("smithx-globe");

if (canvas) {
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(
    45,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );

  camera.position.z = 3.2;

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
  scene.add(ambientLight);

  const sunLight = new THREE.DirectionalLight(0xffffff, 3);
  sunLight.position.set(5, 3, 5);
  scene.add(sunLight);

  // Earth texture
  const loader = new THREE.TextureLoader();

  loader.load(
    "assets/earth.jpg",
    function (earthTexture) {

      earthTexture.colorSpace = THREE.SRGBColorSpace;

      const earthGeometry = new THREE.SphereGeometry(
        1,
        128,
        128
      );

      const earthMaterial = new THREE.MeshPhongMaterial({
        map: earthTexture,
        shininess: 8
      });

      const earth = new THREE.Mesh(
        earthGeometry,
        earthMaterial
      );

      scene.add(earth);

      // Atmosphere
      const atmosphereGeometry =
        new THREE.SphereGeometry(1.035, 128, 128);

      const atmosphereMaterial =
        new THREE.MeshBasicMaterial({
          color: 0x3da9ff,
          transparent: true,
          opacity: 0.13,
          side: THREE.BackSide
        });

      const atmosphere = new THREE.Mesh(
        atmosphereGeometry,
        atmosphereMaterial
      );

      scene.add(atmosphere);

      // SmithX logistics route
      const routeMaterial =
        new THREE.LineBasicMaterial({
          color: 0x00d9ff,
          transparent: true,
          opacity: 0.8
        });

      const routePoints = [];

      for (let i = 0; i <= 100; i++) {

        const t = i / 100;

        const latitude =
          0.25 + Math.sin(t * Math.PI) * 0.35;

        const longitude =
          -1.0 + t * 2.2;

        const radius = 1.025;

        const x =
          radius *
          Math.cos(latitude) *
          Math.cos(longitude);

        const y =
          radius *
          Math.sin(latitude);

        const z =
          radius *
          Math.cos(latitude) *
          Math.sin(longitude);

        routePoints.push(
          new THREE.Vector3(x, y, z)
        );
      }

      const routeGeometry =
        new THREE.BufferGeometry().setFromPoints(
          routePoints
        );

      const route =
        new THREE.Line(
          routeGeometry,
          routeMaterial
        );

      scene.add(route);

      // Network hubs
      const hubGeometry =
        new THREE.SphereGeometry(
          0.025,
          16,
          16
        );

      const hubMaterial =
        new THREE.MeshBasicMaterial({
          color: 0x00d9ff
        });

      const hubs = [
        [1.0, 0.3, 0.1],
        [-0.7, 0.45, 0.3],
        [0.2, -0.8, 0.5],
        [-0.2, 0.1, -0.9]
      ];

      hubs.forEach(position => {

        const hub =
          new THREE.Mesh(
            hubGeometry,
            hubMaterial
          );

        hub.position.set(
          position[0],
          position[1],
          position[2]
        );

        hub.lookAt(0, 0, 0);

        scene.add(hub);
      });

      // Animation
      function animate() {

        requestAnimationFrame(animate);

        earth.rotation.y += 0.0025;

        route.rotation.y += 0.0025;

        atmosphere.rotation.y += 0.002;

        renderer.render(
          scene,
          camera
        );
      }

      animate();

      // Responsive resize
      window.addEventListener(
        "resize",
        () => {

          const width =
            canvas.clientWidth;

          const height =
            canvas.clientHeight;

          camera.aspect =
            width / height;

          camera.updateProjectionMatrix();

          renderer.setSize(
            width,
            height
          );
        }
      );
    }
  );
}
