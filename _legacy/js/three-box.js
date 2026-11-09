/**
 * SORA LUXURY 3D INTERACTIVE GIFT BOX (Three.js WebGL & CSS 3D Fallback)
 * Safe initialization with zero unhandled errors.
 */

class Sora3DBox {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    // Defensive check: Three.js must be loaded
    if (typeof THREE === 'undefined') {
      console.warn('Three.js library is not loaded yet; using CSS 3D fallback.');
      return;
    }

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.boxGroup = null;
    this.lidGroup = null;
    this.baseBox = null;
    this.particles = null;
    this.isUnboxed = false;
    this.targetRotation = { x: 0.2, y: -0.4 };
    this.currentRotation = { x: 0.2, y: -0.4 };
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.isReady = false;

    try {
      this.init();
    } catch (err) {
      console.warn('Could not initialize WebGL 3D Box:', err);
    }
  }

  init() {
    const width = this.canvas.clientWidth || this.canvas.parentElement.clientWidth || 450;
    const height = this.canvas.clientHeight || this.canvas.parentElement.clientHeight || 450;

    // 1. Scene
    this.scene = new THREE.Scene();

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.set(0, 2.5, 7.5);

    // 3. Renderer with antialiasing and alpha
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.95);
    this.scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xFFE4F0, 1.4);
    dirLight1.position.set(5, 10, 7);
    this.scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xA78BFA, 1.2);
    dirLight2.position.set(-6, -2, -4);
    this.scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xF472B6, 1.8, 12);
    pointLight.position.set(0, 3, 2);
    this.scene.add(pointLight);

    // 5. Build 3D Gift Box
    this.buildBox();

    // 6. Build Sparkle Field
    this.buildSparkles();

    // 7. Event Listeners
    this.setupEvents();

    this.isReady = true;
    window.threeReady = true;

    // Start Animation Loop
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  buildBox() {
    this.boxGroup = new THREE.Group();
    this.scene.add(this.boxGroup);

    // Box Body Material - Soft Lilac
    const boxMat = new THREE.MeshStandardMaterial({
      color: 0xB79CE6,
      roughness: 0.35,
      metalness: 0.1
    });

    // Ribbon Material - Rose Satin
    const ribbonMat = new THREE.MeshStandardMaterial({
      color: 0xE0567A,
      roughness: 0.25,
      metalness: 0.25
    });

    // 1. Lower Box Body
    const baseGeo = new THREE.BoxGeometry(3.2, 2.2, 3.2);
    this.baseBox = new THREE.Mesh(baseGeo, boxMat);
    this.baseBox.position.y = -0.3;
    this.boxGroup.add(this.baseBox);

    // Ribbons wrapped around base
    const ribbonV = new THREE.Mesh(new THREE.BoxGeometry(0.55, 2.22, 3.24), ribbonMat);
    ribbonV.position.y = -0.3;
    this.boxGroup.add(ribbonV);

    const ribbonH = new THREE.Mesh(new THREE.BoxGeometry(3.24, 2.22, 0.55), ribbonMat);
    ribbonH.position.y = -0.3;
    this.boxGroup.add(ribbonH);

    // 2. Lid Group
    this.lidGroup = new THREE.Group();
    this.lidGroup.position.set(0, 0.85, 0);

    const lidMesh = new THREE.Mesh(new THREE.BoxGeometry(3.38, 0.55, 3.38), boxMat);
    this.lidGroup.add(lidMesh);

    // Lid Ribbon Cross
    this.lidGroup.add(new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.58, 3.4), ribbonMat));
    this.lidGroup.add(new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.58, 0.56), ribbonMat));

    // 3. 3D Bow Center
    const bowCenter = new THREE.Mesh(new THREE.SphereGeometry(0.32, 16, 16), ribbonMat);
    bowCenter.position.set(0, 0.38, 0);
    this.lidGroup.add(bowCenter);

    // 4 Bow Loops
    const loopGeo = new THREE.TorusGeometry(0.55, 0.16, 16, 32);
    const loopPositions = [
      { pos: [0.5, 0.55, 0.5], rot: [0.6, 0.8, -0.4] },
      { pos: [-0.5, 0.55, -0.5], rot: [-0.6, -0.8, 0.4] },
      { pos: [-0.5, 0.55, 0.5], rot: [0.6, -0.8, 0.4] },
      { pos: [0.5, 0.55, -0.5], rot: [-0.6, 0.8, -0.4] }
    ];

    loopPositions.forEach(cfg => {
      const loop = new THREE.Mesh(loopGeo, ribbonMat);
      loop.position.set(...cfg.pos);
      loop.rotation.set(...cfg.rot);
      this.lidGroup.add(loop);
    });

    this.boxGroup.add(this.lidGroup);

    this.boxGroup.rotation.x = this.currentRotation.x;
    this.boxGroup.rotation.y = this.currentRotation.y;
  }

  buildSparkles() {
    const particleCount = 50;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;
      positions[i + 1] = (Math.random() - 0.5) * 6 + 1;
      positions[i + 2] = (Math.random() - 0.5) * 6;

      colors[i] = 0.95;
      colors[i + 1] = 0.8;
      colors[i + 2] = 0.95;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  setupEvents() {
    const onPointerDown = (e) => {
      this.isDragging = true;
      this.previousMousePosition = {
        x: e.clientX || (e.touches && e.touches[0].clientX) || 0,
        y: e.clientY || (e.touches && e.touches[0].clientY) || 0
      };
    };

    const onPointerMove = (e) => {
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

      if (this.isDragging) {
        const deltaX = clientX - this.previousMousePosition.x;
        const deltaY = clientY - this.previousMousePosition.y;

        this.targetRotation.y += deltaX * 0.008;
        this.targetRotation.x += deltaY * 0.008;
        this.targetRotation.x = Math.max(-0.6, Math.min(0.8, this.targetRotation.x));

        this.previousMousePosition = { x: clientX, y: clientY };
      } else {
        const rect = this.canvas.getBoundingClientRect();
        const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);
        if (normX >= -1 && normX <= 1 && normY >= -1 && normY <= 1) {
          this.targetRotation.y = -0.4 + normX * 0.35;
          this.targetRotation.x = 0.2 - normY * 0.25;
        }
      }
    };

    const onPointerUp = () => {
      this.isDragging = false;
    };

    this.canvas.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    this.canvas.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    this.canvas.addEventListener('click', () => {
      this.toggleUnbox();
    });

    window.addEventListener('resize', () => {
      if (!this.canvas || !this.renderer || !this.camera) return;
      const w = this.canvas.clientWidth;
      const h = this.canvas.clientHeight;
      if (w > 0 && h > 0) {
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
      }
    });
  }

  toggleUnbox() {
    if (!this.lidGroup) return;

    if (!this.isUnboxed) {
      if (window.gsap) {
        gsap.to(this.lidGroup.position, { y: 2.8, z: -0.6, duration: 1.1, ease: 'power3.out' });
        gsap.to(this.lidGroup.rotation, { x: -0.5, z: 0.15, duration: 1.1, ease: 'power3.out' });
      } else {
        this.lidGroup.position.set(0, 2.8, -0.6);
        this.lidGroup.rotation.x = -0.5;
      }

      if (window.confetti) {
        window.confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#A78BFA', '#F472B6', '#FFF', '#8B5CF6']
        });
      }

      this.isUnboxed = true;
      const tag = document.getElementById('unboxHintText');
      if (tag) tag.textContent = '✨ Click to Close Box';
    } else {
      if (window.gsap) {
        gsap.to(this.lidGroup.position, { y: 0.85, z: 0, duration: 0.9, ease: 'bounce.out' });
        gsap.to(this.lidGroup.rotation, { x: 0, z: 0, duration: 0.7, ease: 'power2.out' });
      } else {
        this.lidGroup.position.set(0, 0.85, 0);
        this.lidGroup.rotation.x = 0;
      }
      this.isUnboxed = false;
      const tag = document.getElementById('unboxHintText');
      if (tag) tag.textContent = '✨ Tap Box to Unbox';
    }
  }

  animate() {
    requestAnimationFrame(this.animate);

    if (!this.isDragging) {
      this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.05;
      this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.05;
      const time = Date.now() * 0.0015;
      if (this.boxGroup) this.boxGroup.position.y = Math.sin(time) * 0.08;
    } else {
      this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.15;
      this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.15;
    }

    if (this.boxGroup) {
      this.boxGroup.rotation.x = this.currentRotation.x;
      this.boxGroup.rotation.y = this.currentRotation.y;
    }

    if (this.particles) {
      this.particles.rotation.y += 0.0015;
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }
}

window.Sora3DBox = Sora3DBox;
