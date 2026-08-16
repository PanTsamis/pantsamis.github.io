// --- ACTIVE SIDEBAR LINK ON SCROLL ---
// Highlights whichever section currently occupies the most vertical space in
// the viewport, instead of checking whether a section's top edge has crossed
// some fixed line. A top-edge/threshold approach breaks down for sections
// near the end of the page: there isn't enough content after Achievements
// (just the short Contact section + footer) to ever scroll it flush with the
// top, or even past a small threshold, at normal zoom — the browser clamps
// the scroll first, so its top edge never crosses the line and its nav link
// never lights up. Picking the most-visible section sidesteps that: it
// doesn't matter where a section's edges sit, only which one dominates the
// screen. This depends on there being enough trailing space after the last
// section for it to become dominant in its own right (see the `.content`
// bottom padding in style.css) — otherwise Contact could never outweigh
// Achievements either.
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
    const viewportHeight = window.innerHeight;
    let current = sections[0];
    let mostVisible = -Infinity;
    for (const section of sections) {
        const rect = section.getBoundingClientRect();
        const visible = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
        if (visible > mostVisible) {
            mostVisible = visible;
            current = section;
        }
    }
    setActiveLink(current.id);
}

window.addEventListener('scroll', updateActiveSection, { passive: true });
window.addEventListener('resize', updateActiveSection);
updateActiveSection();
