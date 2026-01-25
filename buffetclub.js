$(function () {

  /* ===============================
     Slick carousel
  =============================== */
  $('.match-carousel').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    arrows: true,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } }
    ]
  });

  /* ===============================
     Cleave phone formatting
  =============================== */
  new Cleave('#phone', {
    phone: true,
    phoneRegionCode: 'US'
  });

  /* ===============================
     Live input validation
  =============================== */
  const inputs = document.querySelectorAll(
    "input[type='text'], input[type='email'], input[type='tel'], input[type='number']"
  );

  inputs.forEach(input => {
    input.addEventListener('input', () => validateInput(input));
  });

  function validateInput(input) {
    let isValid = false;
    let regex;

    if (input.type === 'text') {
      regex = /^[a-zA-Z\s]+$/;
    } else if (input.type === 'email') {
      regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    } else if (input.type === 'tel') {
      regex = /^\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/;
    } else if (input.type === 'number') {
      isValid = input.value !== '' && !isNaN(input.value);
    }

    if (regex) {
      isValid = regex.test(input.value);
    }

    input.classList.toggle('valid', isValid);
    input.classList.toggle('invalid', !isValid);
  }

  /* ===============================
     Formspree submission 
  =============================== */
  const form = document.getElementById("survey-form");
  const thankYou = document.getElementById("thank-you");
  const submitBtn = form.querySelector("#submit");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Disable button to prevent double submissions
    submitBtn.disabled = true;
    submitBtn.value = "Submitting…";

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" }
      });

      if (response.ok) {
        form.style.display = "none";
        thankYou.style.display = "block";
        thankYou.scrollIntoView({ behavior: "smooth" });
        form.reset();
      } else {
        submitBtn.disabled = false;
        submitBtn.value = "Submit";
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      submitBtn.disabled = false;
      submitBtn.value = "Submit";
      alert("Network error. Please try again later.");
    }
  });

});