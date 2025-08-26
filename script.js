// Loading Screen
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
    // Always remove loading class to enable scrolling
    document.body.classList.remove('loading');
}

// Hide loading screen after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(hideLoadingScreen, 1500);
});

// Backup - hide loading screen after window load
window.addEventListener('load', function() {
    setTimeout(hideLoadingScreen, 500);
});

// Emergency backup - hide loading screen after 3 seconds no matter what
setTimeout(hideLoadingScreen, 3000);

// Emergency backup - ensure scrolling is enabled after 1 second
setTimeout(() => {
    document.body.classList.remove('loading');
    document.body.style.overflow = '';
}, 1000);

// Navigation
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

// Navbar scroll effect
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Removed counter animation for minimal design

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attributes
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Removed stats section observation
});

// FAQ functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
});

// Particle background effect
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(79, 172, 254, 0.5);
            border-radius: 50%;
            animation: float ${Math.random() * 10 + 10}s infinite linear;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 10}s;
        `;
        
        particleContainer.appendChild(particle);
    }
}

// Add particle animation CSS
const particleCSS = `
    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;

const style = document.createElement('style');
style.textContent = particleCSS;
document.head.appendChild(style);

// Initialize particles
document.addEventListener('DOMContentLoaded', createParticles);

// Simple MSMP fade in animation
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.title-main');
    if (heroTitle && (window.location.pathname.includes('index.html') || window.location.pathname === '/')) {
        heroTitle.textContent = 'MSMP';
    }
});

// Real Minecraft server status checker
async function updateServerStatus() {
    const statusIndicator = document.querySelector('.status-indicator');
    const statusText = document.querySelector('.status-text');
    const playerCount = document.querySelector('.player-count');
    const serverIP = document.getElementById('server-ip');
    
    if (!statusIndicator || !statusText) return;
    
    // Get server IP from the page
    const ip = serverIP ? serverIP.textContent.trim() : 's1.ssnetwork.io:52353';
    
    try {
        // Using a CORS proxy to access Minecraft server API
        const response = await fetch(`https://api.mcsrvstat.us/3/${ip}`);
        const data = await response.json();
        
        console.log('Server API response:', data); // デバッグ用
        
        if (data.online) {
            statusIndicator.className = 'status-indicator online';
            statusText.textContent = 'オンライン';
            if (playerCount && data.players) {
                const onlinePlayers = data.players.online || 0;
                const maxPlayers = data.players.max;
                
                // maxPlayersが存在しない、null、undefined、0の場合は接続確認できない
                if (!maxPlayers || maxPlayers === 0) {
                    statusIndicator.className = 'status-indicator offline';
                    statusText.textContent = '接続確認できません';
                    playerCount.textContent = '- / -';
                } else {
                    playerCount.textContent = `${onlinePlayers} / ${maxPlayers}`;
                }
            } else {
                // playersデータが存在しない場合
                statusIndicator.className = 'status-indicator offline';
                statusText.textContent = '接続確認できません';
                if (playerCount) {
                    playerCount.textContent = '- / -';
                }
            }
        } else {
            statusIndicator.className = 'status-indicator offline';
            statusText.textContent = 'オフライン';
            if (playerCount) {
                playerCount.textContent = '- / -';
            }
        }
    } catch (error) {
        console.log('Server status check failed:', error);
        // Fallback to connection error status
        statusIndicator.className = 'status-indicator offline';
        statusText.textContent = '接続確認できません';
        if (playerCount) {
            playerCount.textContent = '- / -';
        }
    }
}

// Update server status every 30 seconds
setInterval(updateServerStatus, 30000);

// Copy IP functionality
function copyIP() {
    const ip = document.getElementById('server-ip');
    if (ip) {
        const text = ip.textContent;
        navigator.clipboard.writeText(text).then(() => {
            const btn = document.querySelector('.copy-btn');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i>';
            btn.style.background = '#10b981';
            
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
            }, 2000);
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
            } catch (err) {
                console.log('Copy failed');
            }
            document.body.removeChild(textArea);
            
            const btn = document.querySelector('.copy-btn');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i>';
            
            setTimeout(() => {
                btn.innerHTML = originalHTML;
            }, 2000);
        });
    }
}

// Make copyIP function globally available
window.copyIP = copyIP;

// Parallax effect for hero background
window.addEventListener('scroll', function() {
    const scrolled = window.scrollY;
    const heroBackground = document.querySelector('.hero-bg-img');
    
    if (heroBackground) {
        const speed = scrolled * 0.5;
        heroBackground.style.transform = `translateY(${speed}px)`;
    }
});

// Add hover effects to cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.feature-card, .staff-card, .rule-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});



// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Ensure scrolling is enabled on all pages
    document.body.classList.remove('loading');
    

    
    // Update server status on page load
    updateServerStatus();
    
    // Add loading animation to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1000);
            }
        });
    });
});

const DISCORD_CONFIG = {
    // Discord Bot Token (実際のトークンに置き換えてください)
    botToken: 'YOUR_DISCORD_BOT_TOKEN',
    // Discord Guild ID (サーバーID)
    guildId: 'YOUR_DISCORD_GUILD_ID',
    // スタッフのDiscord ID マッピング（実際の情報に置き換え可能）
    staffInfo: {
        '1265989125685641359': {
            name: 'めたすけ',
            role: 'オーナー',
            status: 'online',
            avatar: 'https://via.placeholder.com/150x150/4f46e5/ffffff?text=Owner' // 実際のDiscordアバターURLに置き換え可能
        },
        '1113470496374267914': {
            name: 'もさむしゃ',
            role: '管理者',
            status: 'online',
            avatar: 'https://via.placeholder.com/150x150/dc2626/ffffff?text=Admin'
        },
        '1050319886720712714': {
            name: 'しんニャ',
            role: '管理者',
            status: 'offline',
            avatar: 'https://via.placeholder.com/150x150/dc2626/ffffff?text=Admin'
        },
        '1403179144849915914': {
            name: 'rihitar',
            role: '管理者',
            status: 'online',
            avatar: 'https://via.placeholder.com/150x150/dc2626/ffffff?text=Admin'
        },
        '1197083093903888465': {
            name: 'tatsu_games2025',
            role: '管理者',
            status: 'offline',
            avatar: 'https://via.placeholder.com/150x150/dc2626/ffffff?text=Admin'
        },
        '1322040375204122701': {
            name: 'musashi910',
            role: '管理者',
            status: 'online',
            avatar: 'https://via.placeholder.com/150x150/dc2626/ffffff?text=Admin'
        },
        '1332955518183932059': {
            name: 'osushi_japan',
            role: '管理者',
            status: 'offline',
            avatar: 'https://via.placeholder.com/150x150/dc2626/ffffff?text=Admin'
        }
    }
};

// スタッフアバターを設定する関数
async function updateStaffAvatars() {
    const staffCards = document.querySelectorAll('[data-discord-id]');
    
    console.log('Found staff cards:', staffCards.length);
    
    staffCards.forEach(async (card) => {
        const discordId = card.getAttribute('data-discord-id');
        const avatarElement = card.querySelector('.staff-avatar img');
        
        if (!avatarElement) return;
        
        // HTMLのdata-avatar-url属性をチェック
        const customAvatarUrl = avatarElement.getAttribute('data-avatar-url');
        
        if (customAvatarUrl && customAvatarUrl.trim() !== '') {
            // カスタムアバターURLが設定されている場合
            console.log('Using custom avatar for', discordId, ':', customAvatarUrl);
            avatarElement.src = customAvatarUrl;
            return;
        }
        
        // カスタムアバターがない場合はランダム生成
        console.log('Generating random avatar for', discordId);
        
        // Discordの初期アバターのみを使用（0-4の5種類）
        const randomAvatarId = Math.floor(Math.random() * 5);
        const randomAvatar = `https://cdn.discordapp.com/embed/avatars/${randomAvatarId}.png`;
        avatarElement.src = randomAvatar;
        console.log('Set random avatar:', randomAvatar);
    });
}

// 不要になったDiscord API関数は削除

// Discord Widget APIを使用した代替実装（アバターとステータス両方取得）
async function updateStaffStatusWithWidget() {
    const widgetId = 'YOUR_DISCORD_SERVER_ID'; // 実際のサーバーIDに置き換え
    
    console.log('Trying to fetch Discord widget data for server:', widgetId);
    
    try {
        const response = await fetch(`https://discord.com/api/guilds/${widgetId}/widget.json`);
        const data = await response.json();
        
        if (data.members) {
            const staffCards = document.querySelectorAll('[data-discord-id]');
            
            staffCards.forEach(card => {
                const discordId = card.getAttribute('data-discord-id');
                
                // data-discord-id="unknown"の場合はスキップ
                if (discordId === 'unknown') {
                    return;
                }
                
                const statusElement = card.querySelector('.staff-status');
                const avatarElement = card.querySelector('.staff-avatar img');
                const nameElement = card.querySelector('.staff-name');
                
                if (!statusElement) return;
                
                // Widget APIからメンバー情報を検索
                const memberInfo = data.members.find(member => member.id === discordId);
                
                if (memberInfo) {
                    // オンライン状態
                    statusElement.className = 'staff-status online';
                    statusElement.title = 'オンライン';
                    
                    // 名前更新
                    if (nameElement && memberInfo.username) {
                        nameElement.textContent = memberInfo.username;
                    }
                    
                    // アバター更新
                    if (avatarElement && memberInfo.avatar_url) {
                        avatarElement.src = memberInfo.avatar_url;
                        avatarElement.onerror = () => {
                            // フォールバック: デフォルトDiscordアバター
                            const defaultAvatar = Math.floor(Math.random() * 5);
                            avatarElement.src = `https://cdn.discordapp.com/embed/avatars/${defaultAvatar}.png`;
                        };
                    }
                } else {
                    // オフライン状態
                    statusElement.className = 'staff-status offline';
                    statusElement.title = 'オフライン';
                }
            });
        }
    } catch (error) {
        console.log('Discord widget API failed:', error);
        console.log('Falling back to demo mode with real Discord avatars...');
        
        // フォールバック: 実際のDiscord CDNからアバターを取得
        await updateStaffStatusWithDirectAPI();
    }
}

// 実際のDiscord APIを使用してアバターを取得する関数
async function getDiscordAvatar(userId) {
    try {
        // Discord CDNから直接アバターを取得
        // ユーザーIDがわかっている場合の直接URL構築
        const response = await fetch(`https://discord.com/api/v10/users/${userId}`, {
            headers: {
                'Authorization': `Bot ${DISCORD_CONFIG.botToken}`
            }
        });
        
        if (response.ok) {
            const userData = await response.json();
            if (userData.avatar) {
                return `https://cdn.discordapp.com/avatars/${userId}/${userData.avatar}.png?size=256`;
            } else {
                // デフォルトアバター
                const discriminator = userData.discriminator || '0000';
                return `https://cdn.discordapp.com/embed/avatars/${parseInt(discriminator) % 5}.png`;
            }
        }
    } catch (error) {
        console.log('Failed to get Discord avatar:', error);
    }
    
    // フォールバック: ランダムなデフォルトアバター
    const defaultAvatar = Math.floor(Math.random() * 5);
    return `https://cdn.discordapp.com/embed/avatars/${defaultAvatar}.png`;
}

// スタッフページでのみ実行
if (window.location.pathname.includes('staff.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Staff page loaded, updating avatars...');
        
        // アバターを更新
        updateStaffAvatars();
        
        // 5分ごとにアバターを再生成（ランダム要素のため）
        setInterval(updateStaffAvatars, 300000);
        
        // ページが再表示された時に更新
        document.addEventListener('visibilitychange', function() {
            if (!document.hidden) {
                updateStaffAvatars();
            }
        });
    });
}

//Discord CDNから直接アバターを取得する関数（Widget API失敗時のフォールバック）
async function updateStaffStatusWithDirectAPI() {
    const staffCards = document.querySelectorAll('[data-discord-id]');
    
    console.log('Found staff cards:', staffCards.length);
    
    for (const card of staffCards) {
        const discordId = card.getAttribute('data-discord-id');
        
        console.log('Processing staff with Discord ID:', discordId);
        
        // data-discord-id="unknown"の場合はランダムアイコンを設定
        if (discordId === 'unknown') {
            console.log('Setting random icon for unknown staff');
            const avatarElement = card.querySelector('.staff-avatar img');
            const statusElement = card.querySelector('.staff-status');
            
            if (avatarElement) {
                // 複数のランダムアイコンオプション
                const iconOptions = [
                    // Discordデフォルトアバター
                    `https://cdn.discordapp.com/embed/avatars/0.png`,
                    `https://cdn.discordapp.com/embed/avatars/1.png`,
                    `https://cdn.discordapp.com/embed/avatars/2.png`,
                    `https://cdn.discordapp.com/embed/avatars/3.png`,
                    `https://cdn.discordapp.com/embed/avatars/4.png`,
                    // プレースホルダーアイコン（Minecraftテーマ）
                    `https://via.placeholder.com/150x150/4f46e5/ffffff?text=Admin`,
                    `https://via.placeholder.com/150x150/dc2626/ffffff?text=Staff`,
                    `https://via.placeholder.com/150x150/059669/ffffff?text=Mod`,
                    `https://via.placeholder.com/150x150/7c3aed/ffffff?text=Helper`,
                    `https://via.placeholder.com/150x150/ea580c/ffffff?text=Team`
                ];
                
                const randomIcon = iconOptions[Math.floor(Math.random() * iconOptions.length)];
                avatarElement.src = randomIcon;
                console.log('Set random icon:', randomIcon);
            }
            
            if (statusElement) {
                // ランダムなオンライン・オフライン状態
                const isOnline = Math.random() > 0.5;
                statusElement.className = isOnline ? 'staff-status online' : 'staff-status offline';
                statusElement.title = isOnline ? 'オンライン' : 'オフライン';
                console.log('Set random status:', isOnline ? 'online' : 'offline');
            }
            
            continue;
        }
        
        // その他の無効なIDはスキップ
        if (discordId === 'YOUR_DISCORD_SERVER_ID' || !discordId) {
            console.log('Skipping staff with invalid ID:', discordId);
            continue;
        }
        
        const statusElement = card.querySelector('.staff-status');
        const avatarElement = card.querySelector('.staff-avatar img');
        const nameElement = card.querySelector('.staff-name');
        
        if (!statusElement) continue;
        
        try {
            // 事前定義された情報があるかチェック
            const staffInfo = DISCORD_CONFIG.staffInfo[discordId];
            if (staffInfo) {
                console.log('Using predefined staff info for:', discordId, staffInfo);
                
                // 名前を更新
                if (nameElement) {
                    nameElement.textContent = staffInfo.name;
                    console.log('Updated name to:', staffInfo.name);
                }
                
                // アバターを更新
                if (avatarElement && staffInfo.avatar) {
                    avatarElement.src = staffInfo.avatar;
                    console.log('Updated avatar to:', staffInfo.avatar);
                }
                
                // ステータスを更新
                const isOnline = staffInfo.status === 'online';
                statusElement.className = isOnline ? 'staff-status online' : 'staff-status offline';
                statusElement.title = isOnline ? 'オンライン' : 'オフライン';
                console.log('Set predefined status:', staffInfo.status);
            }
            
            // Discord CDNから直接アバターを試行取得
            if (avatarElement && discordId.match(/^\d{17,19}$/)) {
                console.log('Attempting to get Discord avatar for:', discordId);
                
                // CORS制限のため、代替アバターを使用
                console.log('Using alternative avatar for:', discordId);
                
                if (avatarElement) {
                    // スタッフ情報に基づいたカスタムアバターまたはデフォルトアバター
                    const staffInfo = DISCORD_CONFIG.staffInfo[discordId];
                    
                    if (staffInfo) {
                        // 役職に基づいたアバター
                        const roleAvatars = {
                            'オーナー': `https://via.placeholder.com/150x150/4f46e5/ffffff?text=Owner`,
                            '管理者': `https://via.placeholder.com/150x150/dc2626/ffffff?text=Admin`
                        };
                        
                        const avatarUrl = roleAvatars[staffInfo.role] || `https://via.placeholder.com/150x150/059669/ffffff?text=Staff`;
                        avatarElement.src = avatarUrl;
                        console.log('Set role-based avatar:', avatarUrl);
                    } else {
                        // デフォルトDiscordアバター
                        const defaultAvatar = parseInt(discordId.slice(-1)) % 5;
                        avatarElement.src = `https://cdn.discordapp.com/embed/avatars/${defaultAvatar}.png`;
                        console.log('Using default Discord avatar:', defaultAvatar);
                    }
                }
            }
            
        } catch (error) {
            console.log('Failed to get Discord data for', discordId, error);
            
            // 完全なフォールバック: ランダムステータス
            const isOnline = Math.random() > 0.5;
            statusElement.className = isOnline ? 'staff-status online' : 'staff-status offline';
            statusElement.title = isOnline ? 'オンライン' : 'オフライン';
        }
    }
}