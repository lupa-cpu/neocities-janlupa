// Design constants
const DESIGN_WIDTH = 1920;  // Original design width
const DESIGN_HEIGHT = 991;  // Original design height

// Taskbar and Start Menu Variables
let startMenuOpen = false;

// Calculate scale factor based on viewport size
function calculateScale() {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  // Calculate scale factors for width and height
  const widthScale = viewportWidth / DESIGN_WIDTH;
  const heightScale = viewportHeight / DESIGN_HEIGHT;
  
  // Use the smaller scale factor to ensure the entire content fits
  return Math.min(widthScale, heightScale);
}

// Apply scale to the fixed container
function applyScale() {
  const container = document.querySelector('.fixed-container');
  if (!container) return;
  
  const scale = calculateScale();
  
  // Apply the scale and center the container
  container.style.transform = `translate(-50%, -50%) scale(${scale})`;
  
  // Update scale factor display if enabled
  updateScaleFactorDisplay();
}

// Setup Windows 7 window control buttons and draggable functionality
function setupWindowControls() {
  // Close buttons functionality
  document.querySelectorAll('.title-bar-controls button[aria-label="Close"]').forEach(button => {
    button.addEventListener('click', function() {
      // Find the parent window
      const parentWindow = this.closest('.window');
      if (parentWindow) {
        parentWindow.style.display = 'none';
      }
    });
  });
  
  // Make main container draggable
  setupDraggableWindows();
}

// Make windows draggable by their title bars
function setupDraggableWindows() {
  // Find the main container window
  const mainContainer = document.querySelector('.fixed-container > .container.window');
  if (!mainContainer) {
    debugLog("Main container not found for draggable setup");
    return;
  }
  
  const titleBar = mainContainer.querySelector('.title-bar');
  if (!titleBar) {
    debugLog("Title bar not found for draggable setup");
    return;
  }
  
  // Variables to track dragging
  let isDragging = false;
  let offsetX, offsetY;
  
  // Ensure the container has the right positioning to be moved
  mainContainer.style.position = 'absolute';
  
  // Change cursor to indicate draggable area
  titleBar.style.cursor = 'move';
  
  // Mouse down event starts the drag
  titleBar.addEventListener('mousedown', function(e) {
    // Don't start drag if clicking on control buttons
    if (e.target.closest('.title-bar-controls')) {
      return;
    }
    
    isDragging = true;
    
    // Add dragging class for enhanced shadow effect
    mainContainer.classList.add('dragging');
    
    // Get the current position of the window
    const rect = mainContainer.getBoundingClientRect();
    
    // Calculate offset of mouse position from the top-left corner of the window
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    
    debugLog(`Drag started at position (${e.clientX}, ${e.clientY})`);
    
    // Prevent text selection during drag
    e.preventDefault();
  });
  
  // Mouse move event handles the dragging
  document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    
    // Calculate new position
    let newX = e.clientX - offsetX;
    let newY = e.clientY - offsetY;
    
    // Get container dimensions and viewport dimensions
    const containerWidth = mainContainer.offsetWidth;
    const containerHeight = mainContainer.offsetHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Keep container within viewport bounds (with a bit of margin)
    // Allow a portion of the window to go off-screen, but ensure at least 100px is always visible
    const minVisible = 100;
    
    // Ensure the window doesn't go too far off any edge
    newX = Math.max(-containerWidth + minVisible, Math.min(newX, windowWidth - minVisible));
    newY = Math.max(0, Math.min(newY, windowHeight - minVisible));
    
    // Apply the new position
    mainContainer.style.top = `${newY}px`;
    mainContainer.style.left = `${newX}px`;
    
    // Reset transform to avoid conflicts with the original positioning
    mainContainer.style.transform = 'none';
  });
  
  // Mouse up and mouse leave events end the drag
  document.addEventListener('mouseup', function() {
    if (isDragging) {
      mainContainer.classList.remove('dragging'); // Remove dragging class
      isDragging = false;
      debugLog('Drag ended');
    }
  });
  
  document.addEventListener('mouseleave', function() {
    if (isDragging) {
      mainContainer.classList.remove('dragging'); // Remove dragging class
      isDragging = false;
      debugLog('Drag ended (left window)');
    }
  });
  
  debugLog("Draggable functionality set up for main container");
}

// Function to reset the main container to default position and scale
function resetMainContainer() {
  const mainContainer = document.querySelector('.fixed-container > .container.window');
  if (!mainContainer) {
    debugLog("Main container not found for reset");
    return;
  }
  
  // Check if the container is hidden
  if (mainContainer.style.display === 'none') {
    // Make it visible
    mainContainer.style.display = 'block';
  }
  
  // Reset position to center
  mainContainer.style.top = '50%';
  mainContainer.style.left = '50%';
  
  // Reset transform to original centered position with proper scale
  mainContainer.style.transform = 'translate(-50%, -50%)';
  
  // Apply proper scale
  applyScale();
  
  // Close the start menu
  if (startMenuOpen) {
    toggleStartMenu();
  }
  
  debugLog("Main container reset to default position and scale");
}

// Toggle start menu functionality
function toggleStartMenu() {
  const startMenu = document.querySelector('.start-menu');
  if (!startMenu) return;
  
  startMenuOpen = !startMenuOpen;
  if (startMenuOpen) {
    startMenu.classList.add('show');
  } else {
    startMenu.classList.remove('show');
  }
}

// Update system tray time
function updateSystemTime() {
  const timeDisplay = document.querySelector('.time-display');
  if (!timeDisplay) return;
  
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
  timeDisplay.textContent = `${formattedHours}:${formattedMinutes} ${ampm}`;
}

// Setup taskbar event listeners
function setupTaskbarEvents() {
  // Start button functionality
  const startButton = document.querySelector('.start-button-inner');
  if (startButton) {
    startButton.addEventListener('click', toggleStartMenu);
  }
  
  // Home button functionality
  const homeButton = document.getElementById('home-button');
  if (homeButton) {
    homeButton.addEventListener('click', function(e) {
      e.preventDefault();
      resetMainContainer();
    });
  }
  
  // Close start menu when clicking elsewhere
  document.addEventListener('click', function(event) {
    if (startMenuOpen) {
      const startMenu = document.querySelector('.start-menu');
      const startButton = document.querySelector('.start-button-inner');
      
      // Check if click is outside the start menu and start button
      if (startMenu && startButton && 
          !startMenu.contains(event.target) && 
          !startButton.contains(event.target)) {
        toggleStartMenu();
      }
    }
  });
  
  // Update time initially and set interval
  updateSystemTime();
  setInterval(updateSystemTime, 60000); // Update every minute
}

function checkCollisions() {
  // Function now does nothing - all icons remain visible regardless of position
  // This creates a more natural desktop feel where icons can be anywhere
  return;
}
