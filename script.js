// --- ACTIVE SIDEBAR LINK ON SCROLL ---
const sections = document.querySelectorAll('.content section[id]');
const navLinkMap = new Map();
document.querySelectorAll('.side-link').forEach(link => {
    navLinkMap.set(link.getAttribute('href').slice(1), link);
});

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const link = navLinkMap.get(entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
            navLinkMap.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
}, { rootMargin: '-45% 0px -45% 0px' });

sections.forEach(section => navObserver.observe(section));
