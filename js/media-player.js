// Windows 7 Media Player implementation
function initializeMediaPlayer() {
  const audioElement = document.getElementById('win7-audio');
  if (!audioElement) return;
  
  const playBtn = document.getElementById('play-btn');
  const pauseBtn = document.getElementById('pause-btn');
  const stopBtn = document.getElementById('stop-btn');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const progressSlider = document.getElementById('progress-slider');
  const volumeSlider = document.getElementById('volume-slider');
  
  // Initialize audio
  audioElement.volume = 1.0;
  
  // Event listeners for controls
  playBtn.addEventListener('click', () => {
    audioElement.play();
  });
  
  pauseBtn.addEventListener('click', () => {
    audioElement.pause();
  });
  
  stopBtn.addEventListener('click', () => {
    audioElement.pause();
    audioElement.currentTime = 0;
  });
  
  prevBtn.addEventListener('click', () => {
    // For demo purposes, just jump back 10 seconds
    audioElement.currentTime = Math.max(0, audioElement.currentTime - 10);
  });
  
  nextBtn.addEventListener('click', () => {
    // For demo purposes, just jump ahead 10 seconds
    audioElement.currentTime = Math.min(audioElement.duration || 0, audioElement.currentTime + 10);
  });
  
  // Update progress slider as audio plays
  audioElement.addEventListener('timeupdate', () => {
    if (audioElement.duration) {
      const percentage = (audioElement.currentTime / audioElement.duration) * 100;
      progressSlider.value = percentage;
    }
  });
  
  // Allow seeking with progress slider
  progressSlider.addEventListener('input', () => {
    if (audioElement.duration) {
      const seekTime = (progressSlider.value / 100) * audioElement.duration;
      audioElement.currentTime = seekTime;
    }
  });
  
  // Volume control
  volumeSlider.addEventListener('input', () => {
    audioElement.volume = volumeSlider.value / 100;
  });
}
