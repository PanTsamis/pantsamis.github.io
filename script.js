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
// The last section (Contact) gets special treatment: there's a fixed check
// for having scrolled all the way to the bottom of the page, which forces it
// active regardless of where its top edge sits. It can't rely on the same
// threshold as everything else — that would require enough blank space after
// the footer to scroll Contact's top edge all the way to the top of the
// viewport (a full extra viewport height, in the worst case), which leaves a
// visibly empty screen once you scroll past it. `.content`'s trailing padding
// (see style.css) only needs to be tall enough for the *second-to-last*
// section (Achievements) to reach the threshold, which is far less space.
const sections = Array.from(document.querySelectorAll('.content section[id]'));
const lastSection = sections[sections.length - 1];
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
        setActiveLink(lastSection.id);
        return;
    }

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
