# 3D Solar System

This project is a 3D solar system simulation built using Three.js. It features the sun and eight planets orbiting in real-time with realistic textures, rotations, and orbital speeds. The simulation includes interactive controls to adjust the speed of each planet's orbit in real-time, pause/resume the animation, and toggle between light and dark UI themes.

## How to Run

1. Clone or download the project files to your local machine.
2. Ensure all files including `index.html`, `script.js`, `styles.css`, and the planet texture images are in the same directory.
3. Open the `index.html` file in a modern web browser (such as Chrome, Firefox, or Edge) that supports WebGL.
4. The 3D solar system will load and start animating automatically.

## Features

- **3D Solar System in Motion:** The sun and planets are rendered as 3D spheres with realistic textures. Planets orbit the sun and rotate on their own axes.
- **Real-Time Speed Control:** Each planet has a slider control allowing you to adjust its orbital speed dynamically while the simulation is running.
- **Pause and Resume:** Use the Pause button to stop and resume the animation.
- **Light and Dark Mode:** Toggle the UI theme between light and dark modes.
- **Responsive UI:** The controls panel adapts to different screen sizes, with a hamburger button to toggle visibility on smaller screens.
- **Planet Tooltip:** Hover over a planet to see its name displayed.

## How the Planets and Orbits Were Created

- **Planets:** Each planet is created as a `THREE.Mesh` using a `SphereGeometry` with a size proportional to the planet's real size. Textures are loaded from image files and applied using `MeshStandardMaterial` for realistic lighting effects.
- **Orbits:** Each planet mesh is added to a parent `THREE.Object3D` which acts as the pivot point for orbit rotation around the sun. The planet's position is set along the x-axis at a distance representing its orbital radius.
- **Orbit Rings:** Visual orbit rings are created using `THREE.RingGeometry` and placed flat on the xz-plane to represent the orbital paths.
- **Saturn's Rings:** Saturn has an additional ring mesh created with a textured `RingGeometry` attached directly to the planet mesh.
- **Animation:** The animation loop updates each planet's self-rotation and orbit rotation based on their respective rotation and orbital periods. The speed multipliers from the sliders dynamically adjust the orbit speeds in real-time.
- **Lighting:** A bright point light represents the sun's light, and ambient light provides subtle illumination.

## Controls

- Use the sliders in the Controls panel to adjust the orbital speed of each planet.
- Click the Pause button to pause or resume the animation.
- Click the Light/Dark Mode button to toggle the UI theme.
- On smaller screens, use the hamburger button to show or hide the controls panel.
- Hover over planets to see their names.

## Dependencies

- [Three.js](https://threejs.org/) (loaded via CDN)

## License

This project is open source and free to use.
