// Animation state tracking
let isAnimationPlaying = false;

// Function to disable all buttons during animations
function disableButtons() {
  isAnimationPlaying = true;
  document.querySelectorAll('.desktop-icon').forEach(container => {
    container.classList.add('disabled');
  });
}

// Function to enable all buttons after animations
function enableButtons() {
  isAnimationPlaying = false;
  document.querySelectorAll('.desktop-icon').forEach(container => {
    container.classList.remove('disabled');
  });
}

// Set up click event listeners for the desktop icons
function setupEventListeners() {
  // Glados event listener
  const gladosIcon = document.querySelector('.desktop-icon[data-icon="glados"]');
  if (gladosIcon) {
    gladosIcon.addEventListener('click', function() {
      if (!isAnimationPlaying) {
        disableButtons();
        spawnGladosEvent();
      }
    });
  }

  // Nyan cat event listener
  const nyanIcon = document.querySelector('.desktop-icon[data-icon="nyan"]');
  if (nyanIcon) {
    nyanIcon.addEventListener('click', function() {
      if (!isAnimationPlaying) {
        disableButtons();
        spawnNyanCatScroller();
      }
    });
  }

  // Gordon event listener
  const gordonIcon = document.querySelector('.desktop-icon[data-icon="gordon"]');
  if (gordonIcon) {
    gordonIcon.addEventListener('click', function() {
      if (!isAnimationPlaying) {
        disableButtons();
        spawnGordonDancing();
      }
    });
  }

  // Toriel event listener
  const torielIcon = document.querySelector('.desktop-icon[data-icon="toriel_static"]');
  if (torielIcon) {
    torielIcon.addEventListener('click', function() {
      if (!isAnimationPlaying) {
        disableButtons();
        spawnWalker();
      }
    });
  }
  
  // Sam event listener
  const samIcon = document.querySelector('.desktop-icon[data-icon="sam"]');
  if (samIcon) {
    samIcon.addEventListener('click', function() {
      if (!isAnimationPlaying) {
        disableButtons();
        spawnSamAndMax();
      }
    });
  }

  // Stolas event listener
  const stolasIcon = document.querySelector('.desktop-icon[data-icon="stolas"]');
  if (stolasIcon) {
    stolasIcon.addEventListener('click', function() {
      if (!isAnimationPlaying) {
        disableButtons();
        spawnStolasThrow();
      }
    });
  }
}

function spawnNyanCatScroller() {
  debugLog("spawnNyanCatScroller triggered");
  
  const nyanCat = document.createElement("img");
  nyanCat.src = "site_images/nyan-cat-scroller.gif";
  nyanCat.alt = "Nyan Cat";
  nyanCat.className = "walker";
  nyanCat.style.width = "200px"; // Nyan cat width
  
  nyanCat.onerror = function() {
    debugLog("Error loading nyan-cat-scroller.gif");
    enableButtons();
  };
  
  nyanCat.setAttribute("draggable", "false");
  nyanCat.addEventListener("dragstart", e => e.preventDefault());
  nyanCat.style.pointerEvents = "auto";
  
  const maxY = window.innerHeight - 200;
  nyanCat.style.top = Math.random() * maxY + "px";
  
  // Explicitly set transition before adding to DOM
  nyanCat.style.transitionProperty = "transform";
  nyanCat.style.transitionDuration = "6s";
  nyanCat.style.transitionTimingFunction = "linear";
  
  // Set initial position
  nyanCat.style.transform = "translateX(-200px)"; // Start exactly its width off screen
  
  document.body.appendChild(nyanCat);
  
  // Force reflow to ensure initial position is set
  nyanCat.offsetHeight;
  
  // Start animation immediately
  requestAnimationFrame(() => {
    nyanCat.style.transform = `translateX(${window.innerWidth + 200}px)`; // End completely off screen (width = 200px)
  });
  
  // Add a safety timeout to clean up if transition doesn't complete
  const cleanupTimeout = setTimeout(() => {
    if (document.body.contains(nyanCat)) {
      debugLog("Nyan Cat cleanup timeout triggered");
      nyanCat.remove();
      enableButtons();
    }
  }, 8000); // Set slightly longer than transition duration
  
  // When clicked, replace the nyan cat with an explosion gif and remove the nyan cat
  nyanCat.addEventListener("click", function(e) {
    e.stopPropagation();
    
    // Clear the safety timeout since we're handling cleanup manually
    clearTimeout(cleanupTimeout);
    
    const explosion = document.createElement("img");
    explosion.src = "site_images/explosion.gif";
    explosion.alt = "Explosion";
    explosion.style.position = "fixed";
    explosion.style.width = "200px";
    explosion.style.top = nyanCat.style.top;
    explosion.style.left = nyanCat.getBoundingClientRect().left + "px";
    explosion.style.zIndex = "3";
    
    explosion.onerror = function() {
      debugLog("Error loading explosion.gif");
    };
    
    document.body.appendChild(explosion);
    nyanCat.remove();
    setTimeout(function() {
      explosion.remove();
      enableButtons();
    }, 800);
  });
  
  // Handle transition completion
  nyanCat.addEventListener("transitionend", function(e) {
    if (e.propertyName === "transform") {
      debugLog("Nyan Cat transition ended properly");
      clearTimeout(cleanupTimeout);
      nyanCat.remove();
      enableButtons();
    }
  });
}

function spawnWalker() {
  debugLog("spawnWalker triggered");
  
  const walker = document.createElement("img");
  walker.src = "site_images/torielwalking.gif";
  walker.alt = "Toriel walking";
  walker.className = "walker";
  walker.style.width = "176px"; // Toriel width
  
  walker.onerror = function() {
    debugLog("Error loading torielwalking.gif");
    enableButtons();
  };
  
  walker.setAttribute("draggable", "false");
  walker.addEventListener("dragstart", e => e.preventDefault());
  walker.style.pointerEvents = "auto";
  
  const maxY = window.innerHeight - 216; // Account for Toriel height
  walker.style.top = Math.random() * maxY + "px";
  
  // Explicitly set transition before adding to DOM
  walker.style.transitionProperty = "transform";
  walker.style.transitionDuration = "6s";
  walker.style.transitionTimingFunction = "linear";
  
  // Set initial position
  walker.style.transform = "translateX(-176px)"; // Start exactly its width off screen
  
  document.body.appendChild(walker);
  
  // Force reflow to ensure initial position is set
  walker.offsetHeight;
  
  // Start animation immediately
  requestAnimationFrame(() => {
    walker.style.transform = `translateX(${window.innerWidth + 176}px)`; // End completely off screen (width = 176px)
  });
  
  // Add a safety timeout to clean up if transition doesn't complete
  const cleanupTimeout = setTimeout(() => {
    if (document.body.contains(walker)) {
      debugLog("Walker cleanup timeout triggered");
      walker.remove();
      enableButtons();
    }
  }, 8000); // Set slightly longer than transition duration
  
  walker.addEventListener("click", function(e) {
    e.stopPropagation();
    
    // Clear the safety timeout since we're handling cleanup manually
    clearTimeout(cleanupTimeout);
    
    const explosion = document.createElement("img");
    explosion.src = "site_images/explosion.gif";
    explosion.alt = "Explosion";
    explosion.style.position = "fixed";
    explosion.style.width = "200px";
    explosion.style.top = walker.style.top;
    explosion.style.left = walker.getBoundingClientRect().left + "px";
    explosion.style.zIndex = "3";
    
    explosion.onerror = function() {
      debugLog("Error loading explosion.gif");
    };
    
    document.body.appendChild(explosion);
    walker.remove();
    setTimeout(function() {
      explosion.remove();
      enableButtons();
    }, 800);
  });
  
  // Handle transition completion
  walker.addEventListener("transitionend", function(e) {
    if (e.propertyName === "transform") {
      debugLog("Walker transition ended properly");
      clearTimeout(cleanupTimeout);
      walker.remove();
      enableButtons();
    }
  });
}

function spawnGladosEvent() {
  debugLog("spawnGladosEvent triggered");
  
  const animationContainer = document.createElement("div");
  animationContainer.id = "glados-animation-container";
  animationContainer.style.position = "fixed";
  animationContainer.style.width = "372px";
  animationContainer.style.height = "393px";
  animationContainer.style.left = (window.innerWidth - 372) / 2 + "px";
  animationContainer.style.top = "-393px";
  animationContainer.style.zIndex = "10000";
  animationContainer.style.transition = "top 2s linear";
  document.body.appendChild(animationContainer);
  
  const glados = new Image();
  const cacheBuster = new Date().getTime();
  
  glados.src = `site_images/glados_rand.gif?nocache=${cacheBuster}`;
  glados.alt = "Glados";
  glados.style.width = "100%";
  glados.style.height = "100%";
  
  glados.onload = function() {
    debugLog("Glados_rand image loaded successfully");
    animationContainer.appendChild(glados);
    animationContainer.offsetHeight;
    
    requestAnimationFrame(() => {
      animationContainer.style.top = "0px";
    });
  };
  
  glados.onerror = function() {
    debugLog("Error loading glados_rand.gif, trying glados.gif as fallback");
    glados.src = `site_images/glados.gif?nocache=${cacheBuster}`;
    
    glados.onerror = function() {
      debugLog("Error loading both glados GIFs, using fallback div");
      animationContainer.style.backgroundColor = "purple";
      enableButtons();
      
      requestAnimationFrame(() => {
        animationContainer.style.top = "0px";
      });
    };
  };
  
  animationContainer.addEventListener("transitionend", function descendHandler(e) {
    if (e.propertyName === "top" && e.target === animationContainer) {
      debugLog("Glados descent complete, spawning crow");
      animationContainer.removeEventListener("transitionend", descendHandler);
      spawnCrow(animationContainer);
    }
  });
}

function spawnSamAndMax() {
  debugLog("spawnSamAndMax triggered");
  
  // Create container for the animation
  const samAndMaxContainer = document.createElement("div");
  samAndMaxContainer.className = "sam-and-max-container";
  samAndMaxContainer.style.position = "fixed";
  samAndMaxContainer.style.width = "300px"; // Width for the car
  samAndMaxContainer.style.height = "200px"; // Height for the car
  samAndMaxContainer.style.zIndex = "3";
  samAndMaxContainer.style.top = Math.random() * (window.innerHeight - 200) + "px"; // Random vertical position
  samAndMaxContainer.style.left = window.innerWidth + "px"; // Start off-screen to the right
  samAndMaxContainer.style.transition = "left 2.5s cubic-bezier(0.2, 0.0, 0.8, 1)"; // Fast to slow acceleration
  document.body.appendChild(samAndMaxContainer);
  
  // Create car element first (so smoke appears behind it in the DOM)
  const car = document.createElement("img");
  car.src = "site_images/sam_and_max.png";
  car.alt = "Sam and Max";
  car.style.position = "absolute";
  car.style.width = "100%";
  car.style.height = "auto";
  car.style.zIndex = "2"; // In front of smoke
  
  car.onerror = function() {
    debugLog("Error loading sam_and_max.png");
    enableButtons();
    samAndMaxContainer.remove();
  };
  
  // Create smoke element
  const smoke = document.createElement("img");
  smoke.src = "site_images/smoke.gif";
  smoke.alt = "Smoke";
  smoke.style.position = "absolute";
  smoke.style.width = "100px";
  smoke.style.right = "0"; // Position at the back of the car
  smoke.style.bottom = "75px"; // Position much higher
  smoke.style.transform = "scaleX(-1) rotate(15deg)"; // Flip horizontally and rotate slightly clockwise
  smoke.style.zIndex = "1"; // Behind the car
  
  smoke.onerror = function() {
    debugLog("Error loading smoke.gif");
  };
  
  // Add elements to container (smoke first, then car on top)
  samAndMaxContainer.appendChild(smoke);
  samAndMaxContainer.appendChild(car);
  
  // Force reflow to ensure initial position is set
  samAndMaxContainer.offsetHeight;
  
  // Start animation
  requestAnimationFrame(() => {
    samAndMaxContainer.style.left = -samAndMaxContainer.offsetWidth + "px"; // End off-screen to the left
  });
  
  // Clean up after animation
  samAndMaxContainer.addEventListener("transitionend", function cleanup(e) {
    if (e.propertyName === "left" && e.target === samAndMaxContainer) {
      debugLog("Sam and Max animation complete");
      samAndMaxContainer.removeEventListener("transitionend", cleanup);
      samAndMaxContainer.remove();
      enableButtons();
    }
  });
}

function spawnGordonDancing() {
  debugLog("spawnGordonDancing triggered");
  
  const gordonContainer = document.createElement("div");
  gordonContainer.style.position = "fixed";
  gordonContainer.style.width = "400px";
  gordonContainer.style.left = "50%";
  gordonContainer.style.transform = "translateX(-50%)";
  gordonContainer.style.bottom = "-400px";
  gordonContainer.style.zIndex = "10000";
  gordonContainer.style.transition = "bottom 2s ease-out";
  document.body.appendChild(gordonContainer);
  
  const gordon = new Image();
  gordon.src = "site_images/gordon_dancing.gif";
  gordon.alt = "Dancing Gordon";
  gordon.style.width = "100%";
  gordon.style.height = "auto";
  
  gordon.onload = function() {
    debugLog("Gordon dancing image loaded successfully");
    gordonContainer.appendChild(gordon);
    
    // Rise up animation
    requestAnimationFrame(() => {
      gordonContainer.style.bottom = "50%";
      gordonContainer.style.marginBottom = "-200px"; // Half of the container height to center vertically
      
      gordonContainer.addEventListener("transitionend", function riseHandler() {
        gordonContainer.removeEventListener("transitionend", riseHandler);
        
        // Wait 2 seconds then descend
        setTimeout(() => {
          gordonContainer.style.bottom = "-100%";
          
          gordonContainer.addEventListener("transitionend", function descendHandler() {
            gordonContainer.removeEventListener("transitionend", descendHandler);
            gordonContainer.remove();
            enableButtons();
          });
        }, 2000);
      });
    });
  };
  
  gordon.onerror = function() {
    debugLog("Error loading gordon_dancing.gif");
    gordonContainer.remove();
    enableButtons();
  };
}

function spawnStolasThrow() {
  debugLog("spawnStolasThrow triggered");
  
  // Create a container for the animation
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.top = "50%";
  container.style.left = "-200px"; // Start off-screen
  container.style.width = "200px";
  container.style.height = "200px";
  container.style.marginTop = "-100px"; // Center vertically
  container.style.zIndex = "3";
  container.style.transition = "left 3s linear";
  document.body.appendChild(container);
  
  // Create the stolas image that will rotate
  const stolas = document.createElement("img");
  stolas.src = "site_images/stolas_throw.gif";
  stolas.alt = "Stolas throwing";
  stolas.style.width = "100%";
  stolas.style.height = "100%";
  stolas.style.transition = "transform 3s linear";
  stolas.style.transformOrigin = "center center";
  stolas.style.transform = "rotate(0deg)";
  
  stolas.onerror = function() {
    debugLog("Error loading stolas_throw.gif");
    container.remove();
    enableButtons();
  };
  
  stolas.setAttribute("draggable", "false");
  stolas.addEventListener("dragstart", e => e.preventDefault());
  stolas.style.pointerEvents = "auto";
  
  // Add stolas to the container
  container.appendChild(stolas);
  
  // Force reflow to ensure initial position is set
  container.offsetHeight;
  
  // Start animation immediately
  requestAnimationFrame(() => {
    container.style.left = `${window.innerWidth}px`; // Move across screen
    stolas.style.transform = "rotate(720deg)"; // Two full rotations
  });
  
  // When clicked, replace with explosion gif
  container.addEventListener("click", function(e) {
    e.stopPropagation();
    
    const explosion = document.createElement("img");
    explosion.src = "site_images/explosion.gif";
    explosion.alt = "Explosion";
    explosion.style.position = "fixed";
    explosion.style.width = "200px";
    explosion.style.top = container.style.top;
    explosion.style.marginTop = container.style.marginTop;
    explosion.style.left = container.getBoundingClientRect().left + "px";
    explosion.style.zIndex = "3";
    
    explosion.onerror = function() {
      debugLog("Error loading explosion.gif");
    };
    
    document.body.appendChild(explosion);
    container.remove();
    setTimeout(function() {
      explosion.remove();
      enableButtons();
    }, 800);
  });
  
  // Clean up after animation
  container.addEventListener("transitionend", function() {
    debugLog("Stolas throw animation ended");
    container.remove();
    enableButtons();
  });
}

function spawnCrow(animationContainer) {
  debugLog("spawnCrow triggered");
  
  const crowContainer = document.createElement("div");
  crowContainer.style.position = "fixed";
  crowContainer.style.width = "150px";
  crowContainer.style.zIndex = "10001";
  
  const containerRect = animationContainer.getBoundingClientRect();
  const containerCenterY = containerRect.top + containerRect.height / 2;
  crowContainer.style.top = (containerCenterY - 50) + "px";
  crowContainer.style.left = "-150px";
  crowContainer.style.transition = "left 2s linear";
  document.body.appendChild(crowContainer);
  
  const crow = new Image();
  const cacheBuster = new Date().getTime();
  crow.src = `site_images/crow.gif?nocache=${cacheBuster}`;
  crow.alt = "Crow";
  crow.style.width = "100%";
  crow.style.height = "100%";
  
  crow.onload = function() {
    debugLog("Crow image loaded successfully");
    crowContainer.appendChild(crow);
    
    requestAnimationFrame(() => {
      crowContainer.style.left = window.innerWidth + "px";
    });
  };
  
  crow.onerror = function() {
    debugLog("Error loading crow.gif, using fallback div");
    crowContainer.style.backgroundColor = "black";
    crowContainer.style.height = "50px";
    
    requestAnimationFrame(() => {
      crowContainer.style.left = window.innerWidth + "px";
    });
  };
  
  crowContainer.addEventListener("transitionend", function(e) {
    if (e.propertyName === "left" && e.target === crowContainer) {
      debugLog("Crow flight complete, removing crow and ascending Glados");
      crowContainer.remove();
      
      animationContainer.style.transition = "top 2s linear";
      animationContainer.style.top = "-393px";
      
      animationContainer.addEventListener("transitionend", function ascendHandler(e) {
        if (e.propertyName === "top" && e.target === animationContainer) {
          debugLog("Glados ascent complete, removing Glados");
          animationContainer.removeEventListener("transitionend", ascendHandler);
          animationContainer.remove();
          enableButtons();
        }
      });
    }
  });
}
