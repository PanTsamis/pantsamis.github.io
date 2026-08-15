// --- ACTIVE SIDEBAR LINK ON SCROLL ---
// A fixed mid-viewport detection band (IntersectionObserver rootMargin
// approach) never triggers for the first/last section, since reaching the
// middle of the viewport for About would require scrolling above the top of
// the page, and there isn't enough room below Contact to scroll it that far
// up either. A top-of-viewport threshold with an explicit bottom-of-page
// fallback handles both edge cases.
const sections = Array.from(document.querySelectorAll('.content section[id]'));
const navLinkMap = new Map();
document.querySelectorAll('.side-link').forEach(link => {
    navLinkMap.set(link.getAttribute('href').slice(1), link);
});

function setActiveLink(id) {
    navLinkMap.forEach((link, key) => {
        link.classList.toggle('active', key === id);
    });
}

function updateActiveSection() {
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (atBottom) {
        setActiveLink(sections[sections.length - 1].id);
        return;
    }

    const threshold = window.innerHeight * 0.4;
    let current = sections[0];
    for (const section of sections) {
        if (section.getBoundingClientRect().top <= threshold) {
            current = section;
        }
    }
    setActiveLink(current.id);
}

window.addEventListener('scroll', updateActiveSection, { passive: true });
window.addEventListener('resize', updateActiveSection);
updateActiveSection();
