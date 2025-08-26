# ✋ Hands Project

> An interactive p5.js + MediaPipe Hands + Matter.js playground where colorful circles react to hand movement.

---

## 🖼 Preview

![App Preview](media/hands-preview.gif)

---

## ⚙️ Getting Started

These instructions will get your project running locally.

```bash
# 1. Clone the repo
git clone https://github.com/suzubu/hand-tracking-playground.git

# 2. Navigate into the project folder
cd hand-tracking-playground

# 3. Install dependencies
npm install

# 4. Run the app
npm run dev
```

> Built with:  
> - [p5.js](https://p5js.org/)  
> - [MediaPipe Hands](https://developers.google.com/mediapipe/solutions/vision/hand_landmarker)  
> - [Matter.js](https://brm.io/matter-js/)  
> - [Vite](https://vitejs.dev/)

---

## ✨ Features

- 🖐️ Real-time hand tracking via webcam  
- 🎨 Interactive glassy circles that react to hand gestures  
- ⚡ Physics simulation with Matter.js  
- 🌗 Toggle between interaction modes (gather, repel, attract)  

---

## 💡 Dev Notes

- p5.js used for rendering and UI  
- MediaPipe Hands for detecting hand landmarks  
- Matter.js manages the circle physics  
- Custom UI controls stored in `components/uiControls.js`  
- Designed for modular clarity with folders for physics, graphics, render, utils, and store  

---

## 📚 Inspiration / Credits

This project was inspired by:  
- @costardrouge.jpg
- Interactive media art and coding playgrounds  
- Google’s MediaPipe demos  
- Creative coding influences like Daniel Shiffman’s *Coding Train*  

---

## 🧪 Known Issues

- ❌ Performance may lag on lower-end devices  
- 🔍 Some hand gestures may be misinterpreted in poor lighting  

---

## 🔭 Roadmap / TODO

- [ ] Add color customization for circles  
- [ ] Expand interaction types (e.g., swirl, magnetize)  
- [ ] Improve mobile responsiveness  
- [ ] Export canvas snapshots  


## 📜 License

MIT — feel free to use and adapt!

---

## 🙋‍♀️ Author

Made with ☕ + 🎧 by [suzubu](https://github.com/suzubu)  
