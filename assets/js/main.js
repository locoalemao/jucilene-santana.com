/*============ EMAIL JS (Only for index.html) ============*/
if (window.location.pathname === "/index.html") {
  const contactForm = document.getElementById("contact-form");
  const contactMessage = document.getElementById("contact-message");

  const sendEmail = (e) => {
    e.preventDefault();

    // serviceID - templateID - #form - publicKey
    emailjs
      .sendForm(
        "service_4tt96nn",
        "template_w2ss0xk",
        "#contact-form",
        "x0ZoDPnFTryopFqGH"
      )
      .then(() => {
        // Show sent message
        contactMessage.textContent = "Mensagem enviada com sucesso ✔️";

        // Remove message after five seconds
        setTimeout(() => {
          contactMessage.textContent = "";
        }, 5000);

        // Clear input fields
        contactForm.reset();
      })
      .catch(() => {
        // Show error message
        contactMessage.textContent = "Message not sent (service error) ❌";
      });
  };

  contactForm.addEventListener("submit", sendEmail);
}

/*============ SHOW SCROLL UP ============*/
const scrollUp = () => {
  const scrollUpButton = document.getElementById("scroll-up");
  // When the scroll is higher than 350 viewport height, add the show-scroll class to the scrollUpButton
  window.scrollY >= 350
    ? scrollUpButton.classList.add("show-scroll")
    : scrollUpButton.classList.remove("show-scroll");
};

const scrollToTop = () => {
  const scrollUpButton = document.getElementById("scroll-up");
  scrollUpButton.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent the default anchor behavior
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
};

window.addEventListener("scroll", scrollUp);
scrollToTop();

/*============ SCROLL SECTIONS ACTIVE LINK ============*/
document.addEventListener("DOMContentLoaded", (event) => {
  document.addEventListener("click", function (e) {
    if (e.target.tagName === "A" && e.target.hash) {
      e.preventDefault();
      const targetId = e.target.hash;
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerOffset = 50; // desired offset
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  });
});

/*============ CARD HOVER ============*/
const videoPreviews = document.querySelectorAll(".video__preview");

videoPreviews.forEach((preview) => {
  const thumbnailRow = preview.querySelector(".thumbnail__row");

  preview.addEventListener("mouseenter", () => {
    thumbnailRow.style.transition = "transform 0.4s";
    thumbnailRow.style.transform = "scale(1.05) translateY(-5px)";
  });

  preview.addEventListener("mouseleave", () => {
    thumbnailRow.style.transition = "transform 0.4s";
    thumbnailRow.style.transform = "none";
  });
});
