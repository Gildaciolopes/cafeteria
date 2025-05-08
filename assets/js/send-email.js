import emailjs from "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";

emailjs.init("dWOYpwKxFm270JzLM");

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("subscribeForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Form interceptado!");

      const email = document.getElementById("email").value;
      const params = { email: email };

      const divMsg = document.getElementById("mensagem");
      if (divMsg) {
        divMsg.textContent = `Thanks for registering, ${email}! 🎉`;
        divMsg.style.color = "#fff";
      }

      emailjs
        .send("service_53htmdh", "template_0vv7b7j", params)
        .then(() => {
          alert("Email enviado com sucesso!");
          form.reset();
        })
        .catch((err) => {
          console.error("Erro ao enviar:", err);
          alert("Erro ao enviar e-mail.");
        });
    });
  } else {
    console.warn("Formulário não encontrado no DOM.");
  }
});
