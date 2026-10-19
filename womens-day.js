const petalField = document.querySelector("#petalField");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion) {
    const petalColors = ["#f8c4be", "#f3a9a4", "#f5d3b1", "#e9a7bd"];
    for (let index = 0; index < 25; index += 1) {
        const petal = document.createElement("i");
        petal.className = "falling-petal";
        petal.style.setProperty("--petal-left", `${Math.random() * 100}%`);
        petal.style.setProperty("--petal-size", `${7 + Math.random() * 9}px`);
        petal.style.setProperty("--petal-color", petalColors[index % petalColors.length]);
        petal.style.setProperty("--fall-duration", `${9 + Math.random() * 11}s`);
        petal.style.setProperty("--fall-delay", `${-Math.random() * 18}s`);
        petal.style.setProperty("--petal-drift", `${-90 + Math.random() * 180}px`);
        petal.style.setProperty("--petal-spin", `${180 + Math.random() * 600}deg`);
        petalField.append(petal);
    }
}

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
    });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const hero = document.querySelector(".women-hero");
const heroImage = document.querySelector(".women-hero-image");
let pointerFrame = 0;

hero.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse" || reduceMotion) return;
    cancelAnimationFrame(pointerFrame);
    pointerFrame = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - 0.5) * -12;
        const y = (event.clientY / window.innerHeight - 0.5) * -8;
        heroImage.style.setProperty("--hero-x", `${x}px`);
        heroImage.style.setProperty("--hero-y", `${y}px`);
    });
});

const voiceSlides = [...document.querySelectorAll(".voice-slide")];
const voiceImages = [...document.querySelectorAll(".voice-image")];
const voiceSlider = document.querySelector("#voiceSlider");
const voiceCurrent = document.querySelector("#voiceCurrent");
const sliderProgress = document.querySelector("#sliderProgress");
const voiceImageNote = document.querySelector("#voiceImageNote");
const imageNotes = ["LIGHT THE WAY", "A PRACTICE OF CARE", "ROOM FOR WHAT'S NEXT"];
let activeVoice = 0;

const showVoice = (nextIndex) => {
    activeVoice = (nextIndex + voiceSlides.length) % voiceSlides.length;
    voiceSlider.value = String(activeVoice);
    voiceSlides.forEach((slide, index) => {
        const active = index === activeVoice;
        slide.hidden = !active;
        slide.classList.toggle("is-active", active);
    });
    voiceImages.forEach((image, index) => image.classList.toggle("voice-image--active", index === activeVoice));
    voiceCurrent.textContent = String(activeVoice + 1).padStart(2, "0");
    sliderProgress.style.width = `${((activeVoice + 1) / voiceSlides.length) * 100}%`;
    voiceImageNote.textContent = imageNotes[activeVoice];
};

voiceSlider.addEventListener("input", () => showVoice(Number(voiceSlider.value)));
document.querySelectorAll(".voice-arrow").forEach((button) => {
    button.addEventListener("click", () => showVoice(activeVoice + Number(button.dataset.step)));
});

const galleryCaptions = ["THE GARDEN AT DUSK", "ROOM TO BLOOM", "LIGHT LEFT FOR LATER"];
const galleryDialog = document.querySelector("#galleryDialog");
const galleryLargeImage = document.querySelector("#galleryLargeImage");
const galleryCaption = document.querySelector("#galleryCaption");

document.querySelectorAll(".gallery-frame").forEach((frame) => {
    frame.addEventListener("click", () => {
        const index = Number(frame.dataset.gallery);
        const image = frame.querySelector("img");
        galleryLargeImage.src = image.currentSrc || image.src;
        galleryLargeImage.alt = image.alt;
        galleryCaption.textContent = galleryCaptions[index];
        galleryDialog.showModal();
    });
});

document.querySelector(".dialog-close").addEventListener("click", () => galleryDialog.close());
galleryDialog.addEventListener("click", (event) => {
    if (event.target === galleryDialog) galleryDialog.close();
});

const flowerTypes = {
    camellia: { label: "Camellia", color: "#d77d79" },
    sakura: { label: "Sakura", color: "#eda6b7" },
    iris: { label: "Iris", color: "#8587ad" }
};
let selectedFlower = "camellia";
let plantedCount = 0;

document.querySelectorAll(".seed-choice").forEach((button) => {
    button.addEventListener("click", () => {
        selectedFlower = button.dataset.flower;
        document.querySelectorAll(".seed-choice").forEach((choice) => {
            const selected = choice === button;
            choice.classList.toggle("is-selected", selected);
            choice.setAttribute("aria-pressed", String(selected));
        });
    });
});

const plantFlower = (event) => {
    const gardenBed = document.querySelector("#gardenBed");
    const bounds = gardenBed.getBoundingClientRect();
    const x = Math.min(94, Math.max(6, ((event.clientX - bounds.left) / bounds.width) * 100));
    const type = flowerTypes[selectedFlower];
    const flower = document.createElement("span");
    flower.className = "garden-flower";
    flower.style.left = `${x}%`;
    flower.style.setProperty("--flower-color", type.color);

    const stem = document.createElement("i");
    stem.className = "garden-stem";
    const leftLeaf = document.createElement("i");
    leftLeaf.className = "garden-leaf";
    const rightLeaf = document.createElement("i");
    rightLeaf.className = "garden-leaf garden-leaf--right";
    const head = document.createElement("span");
    head.className = "garden-head";
    for (let petal = 0; petal < 5; petal += 1) head.append(document.createElement("i"));
    head.append(document.createElement("b"));
    const label = document.createElement("span");
    label.className = "garden-flower-label";
    label.textContent = type.label;

    flower.append(stem, leftLeaf, rightLeaf, head, label);
    gardenBed.append(flower);
    plantedCount += 1;
    document.querySelector("#gardenCount").textContent = String(plantedCount).padStart(2, "0");
    document.querySelector("#bloomCount").textContent = String(plantedCount).padStart(2, "0");
    document.querySelector("#gardenHint").classList.add("is-hidden");
    document.querySelector("#gardenLive").textContent = `${type.label} planted. ${plantedCount} flowers in the garden.`;
};

const gardenBed = document.querySelector("#gardenBed");
gardenBed.addEventListener("click", plantFlower);
gardenBed.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    const bounds = gardenBed.getBoundingClientRect();
    plantFlower({ clientX: bounds.left + bounds.width * 0.5 });
});

document.querySelector("#clearGarden").addEventListener("click", () => {
    gardenBed.querySelectorAll(".garden-flower").forEach((flower) => flower.remove());
    plantedCount = 0;
    document.querySelector("#gardenCount").textContent = "00";
    document.querySelector("#bloomCount").textContent = "00";
    document.querySelector("#gardenHint").classList.remove("is-hidden");
    document.querySelector("#gardenLive").textContent = "Garden cleared. Choose another flower to begin again.";
});
