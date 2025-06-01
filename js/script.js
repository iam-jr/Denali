// Smooth page load effect
window.addEventListener("load", function () {
    document.body.classList.add('loaded');
});

// Smooth scrolling for internal page links
document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href');

        // Smooth scroll to the target section if the link points to an anchor (#)
        if (target.startsWith('#')) {
            document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
        } else {
            // For regular links (external or other pages), smoothly transition
            window.location.href = target;
        }
    });
});

// Toggle radio popup visibility
function toggleRadio() {
    const popup = document.getElementById('radioPopup');
    if (popup) {
        popup.style.display = (popup.style.display === 'block') ? 'none' : 'block';
    }
}
