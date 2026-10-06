const storyTrack = document.querySelector("#storyTrack");
const storyPanels = [...document.querySelectorAll(".story-panel")];
const chapterCurrent = document.querySelector("#chapter-current");
const progressFill = document.querySelector("#journey-progress-fill");
const progressBar = document.querySelector(".journey-progress");

document.querySelectorAll(".arrow-control").forEach((button) => {
    button.addEventListener("click", () => {
        const direction = Number(button.dataset.direction);
        storyTrack.scrollBy({ left: direction * storyTrack.clientWidth * 0.84, behavior: "smooth" });
    });
});

const updateStoryProgress = () => {
    const maxScroll = storyTrack.scrollWidth - storyTrack.clientWidth;
    const progress = maxScroll > 0 ? storyTrack.scrollLeft / maxScroll : 0;
    const activeIndex = Math.min(storyPanels.length - 1, Math.round(progress * (storyPanels.length - 1)));
    chapterCurrent.textContent = String(activeIndex + 1).padStart(2, "0");
    progressFill.style.width = `${((activeIndex + 1) / storyPanels.length) * 100}%`;
    progressBar.setAttribute("aria-valuenow", String(activeIndex + 1));
};

storyTrack.addEventListener("scroll", updateStoryProgress, { passive: true });
storyTrack.addEventListener("wheel", (event) => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

    const nextPosition = storyTrack.scrollLeft + event.deltaY;
    const maxPosition = storyTrack.scrollWidth - storyTrack.clientWidth;
    if (nextPosition < 0 || nextPosition > maxPosition) return;

    event.preventDefault();
    storyTrack.scrollLeft = nextPosition;
}, { passive: false });

updateStoryProgress();

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
    });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const hero = document.querySelector(".moon-hero");
const heroArt = document.querySelector(".hero-art");
let pointerFrame = 0;

hero.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse") return;
    cancelAnimationFrame(pointerFrame);
    pointerFrame = requestAnimationFrame(() => {
        const offset = (event.clientX / window.innerWidth - 0.5) * -14;
        heroArt.style.setProperty("--pointer-x", `${offset}px`);
    });
});

window.addEventListener("scroll", () => {
    const shift = Math.min(window.scrollY * 0.035, 35);
    heroArt.style.setProperty("--hero-y", `${shift}px`);
}, { passive: true });

const wishForm = document.querySelector("#wishForm");
const wishInput = document.querySelector("#wishInput");
const wishSky = document.querySelector("#wishSky");
const wishCount = document.querySelector("#wishCount");
const wishEmpty = document.querySelector("#wishEmpty");
let wishesSent = 0;

wishForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = wishInput.value.trim();
    if (!message) return;

    const note = document.createElement("span");
    note.className = "wish-note";
    note.textContent = message;
    note.style.left = `${12 + Math.random() * 62}%`;
    note.style.bottom = `${8 + Math.random() * 18}%`;
    wishSky.append(note);
    window.setTimeout(() => note.remove(), 5200);

    wishesSent += 1;
    wishCount.textContent = String(wishesSent);
    wishEmpty.hidden = true;
    wishInput.value = "";
    wishInput.focus();
});
