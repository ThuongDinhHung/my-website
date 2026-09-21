const navbar = document.querySelector(".navbar");

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