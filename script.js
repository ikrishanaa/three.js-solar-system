import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene, camera, renderer, controls, clock;
let isPaused = false;
const planets = [];
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let sun;

const tooltipElement = document.getElementById('tooltip');
const slidersContainer = document.getElementById('sliders');
const pauseButton = document.getElementById('pause-button');
const themeButton = document.getElementById('theme-button');
const controlsContainer = document.getElementById('controls-container');
const hamburgerButton = document.getElementById('hamburger-button');

const textureBaseUrl = './images/';

const PLANET_DATA = [
    { name: 'Mercury', size: 3.2, texture: 'mercury_hd.jpg', position: 28, orbitalPeriod: 88, rotationPeriod: 58.6 },
    { name: 'Venus', size: 5.8, texture: 'venus_hd.jpg', position: 44, orbitalPeriod: 225, rotationPeriod: -243 },
    { name: 'Earth', size: 6, texture: 'earth_hd.jpg', position: 62, orbitalPeriod: 365, rotationPeriod: 1.0 },
    { name: 'Mars', size: 4, texture: 'mars_hd.jpg', position: 78, orbitalPeriod: 687, rotationPeriod: 1.03 },
    { name: 'Jupiter', size: 12, texture: 'jupiter_hd.jpg', position: 100, orbitalPeriod: 4333, rotationPeriod: 0.41 },
    { name: 'Saturn', size: 10, texture: 'saturn_hd.jpg', position: 138, orbitalPeriod: 10759, rotationPeriod: 0.45, ring: { inner: 10, outer: 20, texture: 'saturn_ring.jpg' } },
    { name: 'Uranus', size: 7, texture: 'uranus_hd.jpg', position: 176, orbitalPeriod: 30687, rotationPeriod: -0.72 },
    { name: 'Neptune', size: 7, texture: 'neptune_hd.jpg', position: 200, orbitalPeriod: 60190, rotationPeriod: 0.67 },
];

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(-90, 140, 140);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    document.body.appendChild(renderer.domElement);

    clock = new THREE.Clock();
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const pointLight = new THREE.PointLight(0xFFFFFF, 50000);
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 1024;
    pointLight.shadow.mapSize.height = 1024;
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    createStarfield();

    const sunGeo = new THREE.SphereGeometry(16, 64, 64);
    const sunMat = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(`${textureBaseUrl}sun_texture.jpg`) });
    sun = new THREE.Mesh(sunGeo, sunMat);
    sun.name = "Sun";
    scene.add(sun);

    PLANET_DATA.forEach(data => createPlanet(data));

    setupUI();
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('pointermove', onPointerMove);

    hamburgerButton.addEventListener('click', () => {
        controlsContainer.classList.toggle('hidden');
    });

    document.addEventListener('click', (event) => {
        const isClickInside = controlsContainer.contains(event.target) || hamburgerButton.contains(event.target);
        if (!isClickInside && window.innerWidth <= 600) {
            controlsContainer.classList.add('hidden');
        }
    });

    controlsContainer.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    animate();
}

function createStarfield() {
    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
        const x = THREE.MathUtils.randFloatSpread(2000);
        const y = THREE.MathUtils.randFloatSpread(2000);
        const z = THREE.MathUtils.randFloatSpread(2000);
        starVertices.push(x, y, z);
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7 });
    scene.add(new THREE.Points(starGeometry, starMaterial));
}

function createPlanet(data) {
    const geo = new THREE.SphereGeometry(data.size, 30, 30);
    const mat = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load(`${textureBaseUrl}${data.texture}`),
        emissive: new THREE.Color(0x222222),
        emissiveIntensity: 0.3
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.name = data.name;

    const obj = new THREE.Object3D();
    obj.add(mesh);
    scene.add(obj);
    mesh.position.x = data.position;

    const ringGeo = new THREE.RingGeometry(data.position - 0.2, data.position + 0.2, 128);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide, opacity: 0.35, transparent: true });
    const orbitRing = new THREE.Mesh(ringGeo, ringMat);
    orbitRing.rotation.x = -0.5 * Math.PI;
    scene.add(orbitRing);

    if (data.ring) {
        const ringGeo = new THREE.RingGeometry(data.ring.inner, data.ring.outer, 64);
        const ringMat = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(`${textureBaseUrl}${data.ring.texture}`),
            side: THREE.DoubleSide, transparent: true, opacity: 0.9
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = -0.5 * Math.PI;
        mesh.add(ring);
    }

    planets.push({
        name: data.name,
        mesh,
        obj,
        baseOrbitSpeed: 1 / data.orbitalPeriod,
        selfRotationSpeed: (1 / data.rotationPeriod) * 5,
        speedMultiplier: 1.0
    });
}

function setupUI() {
    controlsContainer.className = 'dark-mode';

    planets.forEach(planet => {
        const sliderDiv = document.createElement('div');
        sliderDiv.className = 'slider-container';
        const label = document.createElement('label');
        label.htmlFor = `slider-${planet.name}`;
        label.innerText = planet.name;
        const slider = document.createElement('input');
        slider.type = 'range';
        slider.id = `slider-${planet.name}`;
        slider.min = 0;
        slider.max = 8;
        slider.step = 0.1;
        slider.value = planet.speedMultiplier;
        slider.addEventListener('input', (e) => {
            planet.speedMultiplier = parseFloat(e.target.value);
        });
        sliderDiv.appendChild(label);
        sliderDiv.appendChild(slider);
        slidersContainer.appendChild(sliderDiv);
    });

    pauseButton.addEventListener('click', () => {
        isPaused = !isPaused;
        pauseButton.textContent = isPaused ? 'Resume' : 'Pause';
    });

    themeButton.addEventListener('click', () => {
        controlsContainer.classList.toggle('light-mode');
        controlsContainer.classList.toggle('dark-mode');
        const isLight = controlsContainer.classList.contains('light-mode');
        themeButton.textContent = isLight ? 'Dark Mode' : 'Light Mode';
    });
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onPointerMove(event) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const planetMeshes = planets.map(p => p.mesh);
    const intersects = raycaster.intersectObjects(planetMeshes);

    if (intersects.length > 0) {
        tooltipElement.style.display = 'block';
        tooltipElement.textContent = intersects[0].object.name;
        tooltipElement.style.left = `${event.clientX + 15}px`;
        tooltipElement.style.top = `${event.clientY + 15}px`;
    } else {
        tooltipElement.style.display = 'none';
    }
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();

    const delta = clock.getDelta();

    if (!isPaused) {
        planets.forEach(p => {
            p.mesh.rotation.y += p.selfRotationSpeed * delta;

            if (p.obj) {
                p.obj.rotation.y += p.baseOrbitSpeed * p.speedMultiplier * delta * 50;
            }
        });

        if (sun) {
            sun.rotation.y += 0.11 * delta;
        }
    }

    renderer.render(scene, camera);
}

init();
