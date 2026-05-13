// 祝福语数组
const wishes = [
    "❤️ 520是我对你爱的表达方式，希望每一天都是你幸福的520。",
    "💕 在这个特殊的日子里，我想告诉你：你是我生命中最重要的人。",
    "🌹 爱你不需要任何理由，你的存在本身就是最好的理由。",
    "💑 与你相伴的每一刻，都是我生命中最闪耀的时光。",
    "✨ 520不只是一个数字，它代表了我对你永恒的爱和承诺。",
    "💝 你是我生活中的阳光，照亮了我所有黑暗的日子。",
    "🎀 想和你一起看日出、看日落、看遍世界的每一个角落。",
    "💗 爱你，就像爱生命本身一样深刻而坚定。",
    "🌟 感谢你出现在我的生命里，让我知道什么是真正的幸福。",
    "💕 520，我爱你！这是我最想对你说的话。"
];

// 表白语句
const confessionResponses = [
    "💕 你的表白已被星星记录，它会永远闪闪发光！",
    "🌹 这句话被爱神收藏，它会一直保护你们的爱！",
    "✨ 美好的话语已被宇宙听见，幸福会随之而来！",
    "💑 你们的爱情故事正在被记录成永恒的传说！",
    "🎀 这是一份来自宇宙的祝福，愿你们永远幸福！"
];

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    updateCountdown();
    setInterval(updateCountdown, 1000);
    initParticles();
    addClickHearts();
});

// 更新倒计时
function updateCountdown() {
    // 获取下一个520的日期（5月20日）
    const now = new Date();
    let nextDate = new Date(now.getFullYear(), 4, 20); // 5月20日
    
    // 如果今年的520已过，计算明年的
    if (now > nextDate) {
        nextDate = new Date(now.getFullYear() + 1, 4, 20);
    }
    
    const diff = nextDate - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// 生成随机祝福语
function generateWish() {
    const randomIndex = Math.floor(Math.random() * wishes.length);
    const wishText = document.getElementById('wish-text');
    
    wishText.style.animation = 'none';
    setTimeout(() => {
        wishText.textContent = wishes[randomIndex];
        wishText.style.animation = 'fadeIn 0.6s ease-in';
    }, 10);
}

// 打开表白弹窗
function openConfession() {
    document.getElementById('confessionModal').classList.add('show');
}

// 关闭表白弹窗
function closeConfession() {
    document.getElementById('confessionModal').classList.remove('show');
    document.getElementById('confessionText').value = '';
    document.getElementById('confessionResponse').textContent = '';
}

// 提交表白
function submitConfession() {
    const text = document.getElementById('confessionText').value;
    const response = document.getElementById('confessionResponse');
    
    if (text.trim() === '') {
        response.textContent = '💔 请先写下你的心里话哦~';
        response.className = '';
        return;
    }
    
    const randomResponse = confessionResponses[Math.floor(Math.random() * confessionResponses.length)];
    response.textContent = randomResponse;
    response.className = 'success';
    
    // 触发爱心雨
    triggerHearts();
    
    // 3秒后关闭
    setTimeout(closeConfession, 3000);
}

// 音乐控制
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
let isPlaying = false;

function toggleMusic() {
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.textContent = '🎵 音乐 (关)';
        isPlaying = false;
    } else {
        bgMusic.play();
        musicBtn.textContent = '🎵 音乐 (开)';
        isPlaying = true;
    }
}

// 触发爱心雨
function triggerHearts() {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createHeart();
        }, i * 50);
    }
}

// 创建爱心
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = '❤️';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = '-50px';
    heart.style.fontSize = Math.random() * 1 + 1.5 + 'em';
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 3000);
}

// 点击屏幕生成爱心
function addClickHearts() {
    document.addEventListener('click', function(e) {
        // 排除按钮点击
        if (e.target.tagName === 'BUTTON' || e.target.closest('button') || 
            e.target.tagName === 'TEXTAREA' || e.target.closest('textarea') ||
            e.target.className === 'close') {
            return;
        }
        
        createClickHeart(e.clientX, e.clientY);
    });
}

// 创建点击位置的爱心
function createClickHeart(x, y) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = ['❤️', '💕', '💖', '💗', '💝'][Math.floor(Math.random() * 5)];
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.fontSize = Math.random() * 1 + 1 + 'em';
    
    const vx = (Math.random() - 0.5) * 4;
    const vy = -Math.random() * 3 - 2;
    
    let currentX = x;
    let currentY = y;
    let currentVy = vy;
    let opacity = 1;
    
    const animate = () => {
        currentX += vx;
        currentY += currentVy;
        currentVy += 0.1; // 重力效果
        opacity -= 0.01;
        
        heart.style.left = currentX + 'px';
        heart.style.top = currentY + 'px';
        heart.style.opacity = opacity;
        
        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            heart.remove();
        }
    };
    
    document.body.appendChild(heart);
    animate();
}

// Canvas粒子效果
function initParticles() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.3;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // 创建粒子
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
    
    // 动画循环
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // 窗口大小变化
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// 关闭模态框的外部点击
document.addEventListener('click', function(e) {
    const modal = document.getElementById('confessionModal');
    if (e.target === modal) {
        closeConfession();
    }
});

// 按ESC关闭模态框
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeConfession();
    }
});
