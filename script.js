// --- ACTIVE SIDEBAR LINK ON SCROLL ---
// Highlights the last section whose top edge has crossed a line near the top
// of the viewport. ("Most-visible-area" was tried instead, but it favors
// whichever section is tallest — Projects/Achievements are long lists, while
// About/Skills/Contact are a few lines of prose, so the short sections could
// never out-cover their taller neighbors and their nav links never lit up.)
//
// The threshold has to sit close to the viewport top (not further down):
// several sections are shorter than that, so a lower line would let a
// section's *next* sibling also cross it, and the loop's last match (the
// wrong, later section) would win.
//
// This only works because `.content` now reserves enough viewport-relative
// trailing space (see style.css) for the last section (Contact) to actually
// scroll its top past the line — without that room the browser clamps the
// scroll before Contact's top ever crosses it.
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
    const threshold = 120;
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
