/* For Sr */

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

// Tab switching
function showTab(name) {
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-' + name).classList.add('active');
    event.currentTarget.classList.add('active');
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
    
//Pop up image 
window.addEventListener("load", function () {
  setTimeout(function () {
    document.getElementById("adPopup").style.display = "flex";
  }, 4000);
});

function closePopup() {
  document.getElementById("adPopup").style.display = "none";
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

    if (!playerDiv) return;

    // Get settings from HTML
    var vidId = playerDiv.getAttribute('data-video-id');
    var vidStart = parseInt(playerDiv.getAttribute('data-start')) || 0;
    var vidEnd = parseInt(playerDiv.getAttribute('data-end')) || 0;
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

// Force loop back to the SPECIFIED start time
function onPlayerStateChange(event) {
    // 1. Check if the video has ended (YT.PlayerState.ENDED is 0)
    if (event.data === YT.PlayerState.ENDED) {
        var playerDiv = document.getElementById('player');  
        if (!playerDiv) return;      
        // 2. Get the original start time from your HTML attribute
        var vidStart = parseInt(playerDiv.getAttribute('data-start')) || 0;
        
         // Small delay prevents YouTube override
        setTimeout(() => {
            player.seekTo(vidStart, true);
            player.playVideo();
        }, 50);
    }
}

window.fbAsyncInit = function () {
    FB.init({ xfbml: true, version: 'v19.0' });

    FB.Event.subscribe('xfbml.ready', function (msg) {
        if (msg.type === 'video') {
            var playerDiv = document.getElementById('player');
            var vidStart = parseInt(playerDiv.getAttribute('data-start')) || 0;
            var vidSpeed = parseFloat(playerDiv.getAttribute('data-speed')) || 1;

            var fbPlayer = msg.instance;

            fbPlayer.seek(vidStart);       // Jump to your start time
            fbPlayer.setVolume(0);        // Mute (no direct mute method, use volume 0)
            fbPlayer.play();
            fbPlayer.subscribe('finishedPlaying', function () {
                setTimeout(() => {
                    fbPlayer.seek(vidStart);
                    fbPlayer.play();
                }, 50);
            });
        }
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
