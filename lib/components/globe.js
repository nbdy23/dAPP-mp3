(function() {
    // Wait for Three.js to load
    if (typeof THREE === 'undefined') {
        console.error('Three.js not loaded!');
        return;
    }

    const canvas = document.getElementById('globe-canvas');
    if (!canvas) {
        console.error('Globe canvas not found!');
        return;
    }

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create texture canvas for animated text
    const textureCanvas = document.createElement('canvas');
    textureCanvas.width = 3000;
    textureCanvas.height = 1500;
    const textureContext = textureCanvas.getContext('2d');

    // Create Three.js texture from canvas
    const canvasTexture = new THREE.CanvasTexture(textureCanvas);
    canvasTexture.needsUpdate = true;

    // Create sphere geometry
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.MeshBasicMaterial({
        map: canvasTexture,
        transparent: true,
        opacity: 0.8
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Characters for random text
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    // Update texture with animated text
    function updateTexture() {
        // Fade effect
        textureContext.fillStyle = 'rgba(0, 0, 0, 0.1)';
        textureContext.fillRect(0, 0, textureCanvas.width, textureCanvas.height);

        // Draw random characters
        for (let i = 0; i < 100; i++) {
            const char = chars.charAt(Math.floor(Math.random() * chars.length));
            const x = Math.random() * textureCanvas.width;
            const y = Math.random() * textureCanvas.height;
            
            textureContext.fillStyle = `rgba(29, 185, 84, ${Math.random() * 0.5 + 0.5})`;
            textureContext.font = '32px monospace';
            textureContext.fillText(char, x, y);
        }

        canvasTexture.needsUpdate = true;
    }

    // Animation variables
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    // Mouse interaction
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        targetRotationY = mouseX * 0.5;
        targetRotationX = mouseY * 0.5;
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Update texture
        updateTexture();

        // Smooth rotation
        sphere.rotation.y += (targetRotationY - sphere.rotation.y) * 0.05;
        sphere.rotation.x += (targetRotationX - sphere.rotation.x) * 0.05;
        
        // Auto-rotate slowly
        sphere.rotation.y += 0.001;

        renderer.render(scene, camera);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Start animation
    animate();

    console.log('🌍 Text Globe initialized');
})();