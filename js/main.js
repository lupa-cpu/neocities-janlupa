// Function to initialize the website after preloading
function initializeWebsite() {
  debugLog("Initializing website");
  
  // Apply initial scale
  applyScale();
  
  // Check for collisions
  checkCollisions();
  
  // Set up Windows 7 window controls
  setupWindowControls();
  
  // Setup taskbar functionality
  setupTaskbarEvents();
  
  // Create debug elements
  createDebugTimer();
  if (debugMode.showScaleFactor) {
    createScaleFactorDisplay();
  }
  
  // Set up click event listeners for the interactive GIFs
  setupEventListeners();
}

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM fully loaded and parsed");
  
  // Add keyboard shortcuts
  document.addEventListener("keydown", function(e) {
    // Toggle debug timer (Ctrl+Shift+D)
    if (e.ctrlKey && e.shiftKey && e.key === "D") {
      toggleDebugTimer();
      e.preventDefault();
    }
    
    // Toggle scale factor display (Ctrl+Shift+S)
    if (e.ctrlKey && e.shiftKey && e.key === "S") {
      toggleScaleFactorDisplay();
      e.preventDefault();
    }
    
    // Toggle start menu with Windows key
    if (e.key === "Meta" || e.key === "OS") {
      toggleStartMenu();
      e.preventDefault();
    }
    
    // Close start menu with Escape key
    if (e.key === "Escape" && startMenuOpen) {
      toggleStartMenu();
      e.preventDefault();
    }
  });
  
  // Initialize website immediately
  initializeWebsite();
  
  // Initialize Windows 7 Media Player
  initializeMediaPlayer();
});

// Update debug timer when page becomes visible again
document.addEventListener("visibilitychange", function() {
  if (!document.hidden) {
    // Update the debug timer when page becomes visible again
    if (debugTimerElement && debugMode.enabled && debugMode.showDebugTimer) {
      updateDebugTimer();
    }
  }
});

// Run scale and collision check on window resize
window.addEventListener("resize", function() {
  applyScale();
  checkCollisions();
});
