const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        entry.target.classList.add("visible");
        entry.target.classList.remove("disapear");
      } else if (!entry.isIntersecting || entry.intersectionRatio < 0.4) {
        entry.target.classList.add("disapear");
        entry.target.classList.remove("visible");
      }
    });
  },
  {
    threshold: [0.4, 0.5],
  }
);

reveals.forEach((el) => observer.observe(el));

(function () {
  const slides = document.querySelectorAll(".slide");
  const slidesContainer = document.querySelector(".slides");
  const dots = document.querySelectorAll(".dot");
  let currentIndex = 1; // começa no segundo slide
  const total = slides.length;
  let autoSlideInterval;

  // Move para o slide de índice `index`
  function goToSlide(index) {
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    slidesContainer.style.transform = `translateX(-${index * 40}%)`;
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[index].classList.add("active");
    currentIndex = index;
  }

  // Inicia o auto‑slide
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 3000);
  }

  // Reinicia o auto‑slide (após interação manual)
  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  // Eventos de clique nos dots
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const idx = parseInt(dot.getAttribute("data-index"), 10);
      goToSlide(idx);
      resetAutoSlide();
    });
  });

  // Ajuste inicial: posiciona no segundo slide antes de começar
  goToSlide(currentIndex);

  // Dispara auto‑slide
  startAutoSlide();
})();

document
  .getElementById("subscribeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // evita o reload da página

    const emailInput = document.getElementById("email");
    const email = emailInput.value;

    // mensagem personalizada
    const mensagemPersonalizada = `Obrigado pelo cadastro, ${email}! 🎉\nEm breve você receberá nosso cupom de 15%.`;

    // exibe dentro da página
    const divMsg = document.getElementById("mensagem");
    divMsg.textContent = mensagemPersonalizada;
    divMsg.style.color = "#fff";

    // limpar o campo após o envio:
    emailInput.value = "";
  });
