const navbar = document.querySelector(".navbar");
const menuButton = document.querySelector("#menuButton");
const primaryNav = document.querySelector("#primaryNav");

menuButton.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("menu-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

primaryNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
        navbar.classList.remove("menu-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
    }
});

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    alert("Thank you for reaching out to Re:Tune!");

    contactForm.reset();

});


const sideNavLinks = document.querySelectorAll(".side-nav-link");
const trackedSections = document.querySelectorAll(
    "#home, #mission, #festival-mid-autumn, #festival-womens-day, #festival-teachers-day, #schedule, #contact"
);

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        sideNavLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${entry.target.id}`;
            link.classList.toggle("is-active", isActive);

            if (isActive) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    });
}, {
    rootMargin: "-38% 0px -52% 0px",
    threshold: 0
});

trackedSections.forEach((section) => sectionObserver.observe(section));