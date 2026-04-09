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

// Load the YouTube IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    var playerDiv = document.getElementById('player');
    
    // 2. Extract settings from data attributes
    var vidId = playerDiv.getAttribute('data-video-id');
    var vidStart = parseInt(playerDiv.getAttribute('data-start')) || 0;
    var vidEnd = parseInt(playerDiv.getAttribute('data-end')) || 0;
    var vidSpeed = parseFloat(playerDiv.getAttribute('data-speed')) || 1;

    player = new YT.Player('player', {
        videoId: 'J_0u6Y5PPgA', // Your video ID
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'autohide': 1,
            'wmode': 'opaque',
            'origin': window.location.origin,
            'rel': 0,
            'mute': 1, // Must be muted to autoplay in most browsers
            'loop': 1,
            'playlist': 'J_0u6Y5PPgA', // Required for loop
            'start': 0,
            'end': 103 // 1:43 in seconds (60 + 43 = 103)
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playbackRate(vidSpeed);
    event.target.playVideo();

    setTimeout(function() {
        event.target.setPlaybackRate(vidSpeed);
        console.log("Speed set to: " + event.target.getPlaybackRate()); // Check your console!
    }, 500);
}

// Ensure it loops exactly at 1:43 if the 'loop' var fails
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        player.seekTo(0);
        player.playVideo();
    }
}