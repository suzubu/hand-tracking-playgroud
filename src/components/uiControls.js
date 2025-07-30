import { settings } from "../store/settings.js";

// Create the menu container
const menuContainer = document.createElement("div");
menuContainer.style.position = "fixed";
menuContainer.style.top = "20px";
menuContainer.style.right = "20px";
menuContainer.style.background = "rgba(0, 0, 0, 0.7)";
menuContainer.style.color = "white";
menuContainer.style.padding = "12px";
menuContainer.style.borderRadius = "8px";
menuContainer.style.zIndex = "999";
menuContainer.style.fontFamily = "sans-serif";
menuContainer.style.fontSize = "14px";
menuContainer.style.display = "flex";
menuContainer.style.flexDirection = "column";
menuContainer.style.gap = "8px";
menuContainer.style.userSelect = "none";

// Helper function to update button styles
function updateButtonStyles(group, currentValue) {
  group.forEach((btn) => {
    btn.style.backgroundColor =
      btn.dataset.value === currentValue ? "#222" : "#444";
  });
}

// -------- Background Mode Controls --------
const bgLabel = document.createElement("div");
bgLabel.textContent = "Background:";
menuContainer.appendChild(bgLabel);

const bgButtons = [];

["video", "dark", "light"].forEach((mode) => {
  const btn = document.createElement("button");
  btn.textContent = mode;
  btn.dataset.value = mode;
  btn.style.padding = "4px 10px";
  btn.style.marginRight = "5px";
  btn.style.border = "none";
  btn.style.borderRadius = "4px";
  btn.style.cursor = "pointer";
  btn.style.backgroundColor = "#444";
  btn.style.color = "white";
  btn.onclick = () => {
    settings.backgroundMode = mode;
    updateButtonStyles(bgButtons, settings.backgroundMode);
    console.log(`Background mode set to: ${mode}`);
  };
  bgButtons.push(btn);
  menuContainer.appendChild(btn);
});

// -------- Interaction Mode Controls --------
const interactionLabel = document.createElement("div");
interactionLabel.textContent = "Interaction:";
interactionLabel.style.marginTop = "10px";
menuContainer.appendChild(interactionLabel);

const interactionButtons = [];

["gather", "repulse", "attract"].forEach((mode) => {
  const btn = document.createElement("button");
  btn.textContent = mode;
  btn.dataset.value = mode;
  btn.style.padding = "4px 10px";
  btn.style.marginRight = "5px";
  btn.style.border = "none";
  btn.style.borderRadius = "4px";
  btn.style.cursor = "pointer";
  btn.style.backgroundColor = "#444";
  btn.style.color = "white";
  btn.onclick = () => {
    settings.interactionMode = mode;
    updateButtonStyles(interactionButtons, settings.interactionMode);
    console.log(`Interaction mode set to: ${mode}`);
  };
  interactionButtons.push(btn);
  menuContainer.appendChild(btn);
});

// -------- Circle Style Controls --------
const circleStyleLabel = document.createElement("div");
circleStyleLabel.textContent = "Circle Style:";
circleStyleLabel.style.marginTop = "10px";
menuContainer.appendChild(circleStyleLabel);

const circleStyleButtons = [];

["default", "trails", "neon glow"].forEach((style) => {
  const btn = document.createElement("button");
  btn.textContent = style;
  btn.dataset.value = style;
  btn.style.padding = "4px 10px";
  btn.style.marginRight = "5px";
  btn.style.border = "none";
  btn.style.borderRadius = "4px";
  btn.style.cursor = "pointer";
  btn.style.backgroundColor = "#444";
  btn.style.color = "white";
  btn.onclick = () => {
    settings.circleStyle = style;
    updateButtonStyles(circleStyleButtons, settings.circleStyle);
    console.log(`Circle style set to: ${style}`);
  };
  circleStyleButtons.push(btn);
  menuContainer.appendChild(btn);
});

// Append the menu to the document
document.body.appendChild(menuContainer);

// Initialize styles
updateButtonStyles(bgButtons, settings.backgroundMode);
updateButtonStyles(interactionButtons, settings.interactionMode);
updateButtonStyles(circleStyleButtons, settings.circleStyle);
