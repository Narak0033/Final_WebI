// Hamburger menu
function toggleNav() {
    document.getElementById('navList').classList.toggle('open');
}

// Close menu when a link is clicked
document.querySelectorAll('.nav-list li a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navList').classList.remove('open');
    });
});

// Tab switching — 'e' is passed in so 'event' is not needed as a global
function showTab(name, e) {
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-' + name).classList.add('active');
    e.currentTarget.classList.add('active');
}

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 80);
            obs.unobserve(e.target);
        }
    });
}, { threshold: 0.1 });
reveals.forEach(el => obs.observe(el));

// Pop up image — only runs on pages that have the popup (homepage)
window.addEventListener("load", function () {
    setTimeout(function () {
        var popup = document.getElementById("adPopup");
        if (!popup) return; // ← skip safely on province pages
        popup.style.display = "flex";
    }, 4000);
});

function closePopup() {
    var popup = document.getElementById("adPopup");
    if (!popup) return;
    popup.style.display = "none";
}

// ===============================
// YOUTUBE HERO BACKGROUND VIDEO
// ===============================

// Load YouTube API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(tag);

var player;

function onYouTubeIframeAPIReady() {
    var playerDiv = document.getElementById('player');
    if (!playerDiv) return; // ← skip on homepage (no video player there)

    var vidId    = playerDiv.getAttribute('data-video-id');
    var vidStart = parseInt(playerDiv.getAttribute('data-start'))  || 0;
    var vidEnd   = parseInt(playerDiv.getAttribute('data-end'))    || 0;
    var vidSpeed = parseFloat(playerDiv.getAttribute('data-speed')) || 1;

    player = new YT.Player('player', {
        videoId: vidId,
        playerVars: {
            autoplay: 1,
            controls: 0,
            mute: 1,
            start: vidStart,
            end: vidEnd,
            rel: 0,
            showinfo: 0,
            modestbranding: 1
        },
        events: {
            onReady: function (event) {
                event.target.setPlaybackRate(vidSpeed);
                event.target.playVideo();
            },
            onStateChange: onPlayerStateChange
        }
    });
}

// Force loop back to the specified start time
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        var playerDiv = document.getElementById('player');
        if (!playerDiv) return;
        var vidStart = parseInt(playerDiv.getAttribute('data-start')) || 0;
        setTimeout(() => {
            player.seekTo(vidStart, true);
            player.playVideo();
        }, 50);
    }
}
