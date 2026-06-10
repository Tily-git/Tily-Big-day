// --- 1. YouTube Music Logic ---
let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '0', width: '0',
    videoId: '5uR8_G6IAaw',
    playerVars: { 'autoplay': 1, 'loop': 1, 'playlist': '5uR8_G6IAaw' },
    events: {
      'onReady': (event) => {
        document.addEventListener('click', () => { event.target.playVideo(); }, { once: true });
      }
    }
  });
}

// --- 2. Navigation Logic ---
function goS(stepNumber) {
  document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
  document.getElementById('s' + stepNumber).classList.add('active');
  if (stepNumber === 5) buildSnap();
  if (player && typeof player.playVideo === 'function') player.playVideo();
}

// --- 3. Vibe Logic ---
function setVibe(vibe) {
  const card = document.getElementById('main-card');
  const wishHeader = document.querySelector('#s3 h1');
  const wishInput = document.getElementById('wish-input');

  card.classList.remove('vibe-funny', 'vibe-sweet', 'vibe-normal');
  card.classList.add('vibe-' + vibe);

  if (vibe === 'funny') {
    card.style.backgroundColor = '#FDE047';
    wishHeader.innerHTML = "😂 Funny Wish Time!";
    if (wishInput) wishInput.placeholder = "Write something hilarious...";
  } else if (vibe === 'sweet') {
    card.style.backgroundColor = '#C4B5FD';
    wishHeader.innerHTML = "💖 Something Sweet";
    if (wishInput) wishInput.placeholder = "Write a heartfelt wish...";
  } else if (vibe === 'normal') {
    card.style.backgroundColor = '#FCA5A5';
    wishHeader.innerHTML = "😊 Birthday Wishes";
    if (wishInput) wishInput.placeholder = "Write your message...";
  }
  goS(3);
}

// --- 4. Cake Data ---
const baseStyles = {
  chocolate:  { top:'linear-gradient(135deg,#3B1F0D,#6B3A1F)', mid:'linear-gradient(135deg,#5C3317,#8B4513)', bot:'linear-gradient(135deg,#4A2810,#6B3A1F)', drip:'#5C3317', label:'Chocolate' },
  banana:     { top:'linear-gradient(135deg,#F5D060,#FFE680)', mid:'linear-gradient(135deg,#ECC84A,#F5D060)', bot:'linear-gradient(135deg,#D4AC30,#ECC84A)', drip:'#ECC84A',  label:'Banana' },
  strawberry: { top:'linear-gradient(135deg,#F472B6,#FF8FAB)', mid:'linear-gradient(135deg,#E8415A,#F472B6)', bot:'linear-gradient(135deg,#C0203A,#E8415A)', drip:'#E8415A',  label:'Strawberry' },
};
const ganacheStyles = {
  vanilla:    { color:'rgba(255,248,231,.95)', label:'Vanilla Ganache' },
  chocolate:  { color:'#3D1A08',              label:'Choc Ganache' },
  strawberry: { color:'#FF8FAB',              label:'Strawberry Ganache' },
};
const toppingData = {
  chocolates: { emoji:'🍫🍬🍫', label:'Chocolate Curls' },
  pineapple:  { emoji:'🍍🌼🍍', label:'Pineapple' },
  fruits:     { emoji:'🍓🫐🍇', label:'Mixed Fruits' },
};
const comboNames = {
  'chocolate-vanilla':'Black & White Dream',
  'chocolate-chocolate':'Double Choc Overload',
  'chocolate-strawberry':'Choco Strawberry Bliss',
  'banana-vanilla':'Banana Cream Cloud',
  'banana-chocolate':'Banoffee Fantasy',
  'banana-strawberry':'Tropical Sunset',
  'strawberry-vanilla':'Strawberries & Cream',
  'strawberry-chocolate':'Strawberry Dark Magic',
  'strawberry-strawberry':'Full Strawberry Fiesta',
};

const cakeState = { base: null, ganache: null, topping: null };

// --- 5. Cake Logic ---
function updateCake(layer, choice, btn) {
  cakeState[layer] = choice;

  if (btn) {
    btn.closest('.builder-options').querySelectorAll('button').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  }

  if (cakeState.base) {
    const s = baseStyles[cakeState.base];
    document.getElementById('cake-layer-top').style.background = s.top;
    document.getElementById('cake-layer-mid').style.background = s.mid;
    document.getElementById('cake-layer-bot').style.background = s.bot;
    document.getElementById('cake-drip').style.background = s.drip;
  }
  if (cakeState.ganache) {
    document.getElementById('cake-drip').style.background = ganacheStyles[cakeState.ganache].color;
  }
  if (cakeState.topping) {
    document.getElementById('cake-toppings').textContent = toppingData[cakeState.topping].emoji;
  }

  const key = cakeState.base && cakeState.ganache ? cakeState.base + '-' + cakeState.ganache : null;
  const name = key && comboNames[key] ? comboNames[key] : (cakeState.base ? baseStyles[cakeState.base].label + ' Cake' : 'Choose below…');
  document.getElementById('cake-name-tag').textContent = name;
}

// --- 6. Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  const ni = document.getElementById('name-input');
  if (ni) {
    ni.addEventListener('input', () => {
      const wName = ni.value.trim();
      const btn = document.getElementById('btn-s1');
      const strip = document.getElementById('preview-strip');
      const previewText = document.getElementById('preview-text');

      if (wName) {
        if (btn) btn.disabled = false;
        if (previewText) previewText.textContent = 'Wishing you a happy birthday, from ' + wName + '!';
        if (strip) strip.style.display = 'block';
      } else {
        if (btn) btn.disabled = true;
        if (strip) strip.style.display = 'none';
      }
    });
  }
});

// --- 7. Build Snapshot Card ---
function buildSnap() {
  if (cakeState.base) {
    const s = baseStyles[cakeState.base];
    document.getElementById('snap-layer-top').style.background = s.top;
    document.getElementById('snap-layer-mid').style.background = s.mid;
    document.getElementById('snap-layer-bot').style.background = s.bot;
    document.getElementById('snap-drip').style.background = s.drip;
  }
  if (cakeState.ganache) {
    document.getElementById('snap-drip').style.background = ganacheStyles[cakeState.ganache].color;
  }
  if (cakeState.topping) {
    document.getElementById('snap-toppings').textContent = toppingData[cakeState.topping].emoji;
  }

  const key = cakeState.base && cakeState.ganache ? cakeState.base + '-' + cakeState.ganache : null;
  document.getElementById('snap-cake-name').textContent = key && comboNames[key] ? comboNames[key] : 'Birthday Cake';

  const vibeLabels = { funny: '😂 Funny', sweet: '💖 Sweet', normal: '😊 Normal' };
  const currentVibe = ['funny', 'sweet', 'normal'].find(v => document.getElementById('main-card').classList.contains('vibe-' + v)) || 'sweet';
  document.getElementById('snap-vibe-badge').textContent = vibeLabels[currentVibe];

  const wish = document.getElementById('wish-input').value.trim();
  document.getElementById('snap-wish-text').textContent = '"' + (wish || 'Happy Birthday Tily!') + '"';

  const name = document.getElementById('name-input').value.trim();
  document.getElementById('snap-wish-from').textContent = '— ' + (name || 'A friend') + ', with love 💖';
}

// --- 8. Reset ---
function resetAll() {
  document.getElementById('name-input').value = '';
  document.getElementById('wish-input').value = '';
  document.getElementById('preview-strip').style.display = 'none';
  document.getElementById('btn-s1').disabled = true;
  document.getElementById('main-card').classList.remove('vibe-funny', 'vibe-sweet', 'vibe-normal');
  document.getElementById('main-card').style.backgroundColor = '';
  document.querySelectorAll('.builder-options button').forEach(b => b.classList.remove('selected'));
  Object.assign(cakeState, { base: null, ganache: null, topping: null });
  goS(1);
}