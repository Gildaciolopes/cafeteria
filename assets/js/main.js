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
    }, 5000);
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
