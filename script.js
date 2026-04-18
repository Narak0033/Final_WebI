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