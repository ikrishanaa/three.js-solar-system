# 🌌 Three.js Solar System

_A timeless voyage through code and cosmos._

![Solar System Preview](./Screenshot%202025-07-05%20044416.png)

---

## 📜 Table of Contents

1. [📖 Introduction](#-introduction)  
2. [🚀 Live Demo](#-live-demo)  
3. [🎯 Why It Matters](#-why-it-matters)  
4. [🌍 Features](#-features)  
5. [🔧 How It Works](#-how-it-works)  
6. [🕹️ Controls](#-controls)  
7. [🛠️ Getting Started](#-getting-started)  
8. [🧭 Roadmap](#-roadmap)  
9. [📚 Credits & Inspiration](#-credits--inspiration)  
10. [📝 License](#-license)

---

## 📖 Introduction

Welcome, cosmic traveler. This is a 3D interactive simulation of our solar system, beautifully rendered using [Three.js](https://threejs.org/).  
Each planet orbits in real-time, with realistic lighting, orbital speeds, and mouse-controlled camera interaction — all running live in your browser.

---

## 🚀 Live Demo

🌐 **Explore the Universe Now →** [Launch Live Simulation](https://ikrishanaa.github.io/three.js-solar-system/)

---

## 🎯 Why It Matters

- 🔬 **Science meets code** — bring astronomical models to life  
- 🎨 **Visual & interactive** — great for learning and demoing  
- 🧠 **Ideal for students** — blend of coding, 3D graphics, and space education  
- 💼 **Portfolio-worthy** — standout project using WebGL + JavaScript  

---

## 🌍 Features

- 🪐 3D sun + 8 orbiting planets with textures  
- 🌀 Real-time animations and self-rotations  
- 🎛️ Sidebar sliders to adjust orbital speeds live  
- ⏸️ Pause and resume simulation  
- 🌗 Toggle between Light and Dark mode  
- 🧭 Interactive camera controls (zoom, pan, rotate)  
- 📱 Responsive UI for all screen sizes  
- 🛰️ Hover tooltips showing planet names  
- 🌌 Starfield background for galactic immersion

---

## 🔧 How It Works

### 🪐 Planets & Orbits
- Each planet is a `THREE.Mesh` using `SphereGeometry`, sized proportionally and textured with `MeshStandardMaterial`.
- Planet meshes are nested in `THREE.Object3D` containers that orbit around the sun by rotating around the y-axis.

### 🔁 Orbit Rings
- Rings are created using `THREE.RingGeometry` for each planet's path, laid flat in the xz-plane.

### 💫 Saturn’s Rings
- Custom `RingGeometry` mesh with texture is added to Saturn's body for realistic visuals.

### 🔦 Lighting
- A bright point light simulates the sun, with subtle ambient light for balanced shading.

### 🔄 Animation
- The render loop updates both axial and orbital rotation using individual speed multipliers controlled by sliders.

---

## 🕹️ Controls

- 🎚 Adjust each planet's orbit speed in real-time  
- ⏯ Pause/resume the animation with a single button  
- 🌗 Switch between light/dark themes  
- 📱 On mobile, use the hamburger menu to toggle controls  
- 🛰 Hover over planets to reveal their names

---

## 🛠️ Getting Started

### 1. Prerequisites

- Node.js (v14+ recommended)
- Modern WebGL-supported browser (Chrome, Firefox, Edge)

### 2. Clone the Repository

```bash
git clone https://github.com/ikrishanaa/three.js-solar-system.git
cd three.js-solar-system
```

### 3. Run Locally (Optional if just opening HTML)

You can simply open `index.html` directly in your browser, or for live server:

```bash
npm install
npm start
```

Then open:  
**`http://localhost:3000`**

---

## 🧭 Roadmap

- [ ] Planet info panels with real data  
- [ ] Add asteroid belt and comet animations  
- [ ] Add moons for Jupiter, Earth, etc.  
- [ ] Background audio with toggle  
- [ ] Mobile UI optimization  
- [ ] "Realism Mode" for true scale & orbit speed

---

## 📚 Credits & Inspiration

- [Three.js](https://threejs.org/) — main WebGL engine  
- [NASA](https://solarsystem.nasa.gov/resources/) — planet textures and data  
- Inspired by:
  - [Sanderblue/solar-system-threejs](https://github.com/sanderblue/solar-system-threejs)
  - [dumitrux/solar-system-threejs](https://github.com/dumitrux/solar-system-threejs)
  - [N3rson/Solar-System-3D](https://github.com/N3rson/Solar-System-3D)

---

## 📝 License

This project is licensed under the **MIT License**.  
Feel free to use, modify, and share with credit.

---

> ✨ _"To confine our attention to terrestrial matters would be to limit the human spirit."_  
> — **Stephen Hawking**
