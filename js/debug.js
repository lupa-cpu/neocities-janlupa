// Debug settings
const debugMode = {
  enabled: true,           // Master debug switch
  spawnTestElement: false,  // Show test element
  showConsoleMessages: true, // Show debug messages in console
  showScaleFactor: false   // Show scale factor in debug info
};

// Variables for debug
let debugTimerElement = null;
let scaleFactorElement = null;

// Debug logging function
function debugLog(message) {
  if (debugMode.showConsoleMessages) {
    console.log(`[DEBUG] ${message}`);
  }
}

// Function to toggle debug timer visibility
function toggleDebugTimer(show) {
  if (!debugTimerElement) return;
  
  debugMode.showDebugTimer = show !== undefined ? show : !debugMode.showDebugTimer;
  debugTimerElement.style.display = debugMode.enabled && debugMode.showDebugTimer ? "block" : "none";
  
  if (debugMode.enabled && debugMode.showDebugTimer) {
    updateDebugTimer();
  }
  
  debugLog(`Debug timer ${debugMode.showDebugTimer ? 'shown' : 'hidden'}`);
}

// Create scale factor debug element
function createScaleFactorDisplay() {
  if (scaleFactorElement) return;
  
  scaleFactorElement = document.createElement("div");
  scaleFactorElement.id = "scale-factor";
  scaleFactorElement.style.position = "fixed";
  scaleFactorElement.style.bottom = "10px";
  scaleFactorElement.style.right = "10px";
  scaleFactorElement.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  scaleFactorElement.style.color = "#fff";
  scaleFactorElement.style.padding = "10px";
  scaleFactorElement.style.borderRadius = "5px";
  scaleFactorElement.style.fontFamily = "monospace";
  scaleFactorElement.style.fontSize = "14px";
  scaleFactorElement.style.zIndex = "10000";
  scaleFactorElement.style.display = debugMode.enabled && debugMode.showScaleFactor ? "block" : "none";
  
  document.body.appendChild(scaleFactorElement);
  updateScaleFactorDisplay();
}

// Update scale factor display
function updateScaleFactorDisplay() {
  if (!scaleFactorElement || !debugMode.showScaleFactor) return;
  
  const scale = calculateScale();
  scaleFactorElement.innerHTML = `
    <div><strong>Scale Factor</strong></div>
    <div>Scale: ${scale.toFixed(4)}</div>
    <div>Viewport: ${window.innerWidth}x${window.innerHeight}</div>
  `;
}

// Toggle scale factor display
function toggleScaleFactorDisplay() {
  if (!scaleFactorElement) {
    createScaleFactorDisplay();
  }
  
  debugMode.showScaleFactor = !debugMode.showScaleFactor;
  scaleFactorElement.style.display = debugMode.enabled && debugMode.showScaleFactor ? "block" : "none";
  
  if (debugMode.enabled && debugMode.showScaleFactor) {
    updateScaleFactorDisplay();
  }
  
  debugLog(`Scale factor display ${debugMode.showScaleFactor ? 'shown' : 'hidden'}`);
}

// Update debug timer information
function updateDebugTimer() {
  if (!debugTimerElement) return;
  
  debugTimerElement.innerHTML = `
    <div><strong>Debug Timer</strong></div>
    <div>Animations only triggered by buttons</div>
  `;
}

// Create debug timer element
function createDebugTimer() {
  if (debugTimerElement) return;
  
  debugTimerElement = document.createElement("div");
  debugTimerElement.id = "debug-timer";
  debugTimerElement.style.position = "fixed";
  debugTimerElement.style.top = "10px";
  debugTimerElement.style.right = "10px";
  debugTimerElement.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  debugTimerElement.style.color = "#fff";
  debugTimerElement.style.padding = "10px";
  debugTimerElement.style.borderRadius = "5px";
  debugTimerElement.style.fontFamily = "monospace";
  debugTimerElement.style.fontSize = "14px";
  debugTimerElement.style.zIndex = "10000";
  debugTimerElement.style.display = debugMode.enabled && debugMode.showDebugTimer ? "block" : "none";
  
  document.body.appendChild(debugTimerElement);
  updateDebugTimer();
}
