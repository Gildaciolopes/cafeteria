document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("subscribeForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const params = { email: email };

      const divMsg = document.getElementById("mensagem");
      if (divMsg) {
        divMsg.textContent = `Thanks for registering, ${email}! 🎉\ncheck your inbox to receive the discount`;
        divMsg.style.color = "#fff";
      }

      emailjs
        .send("service_53htmdh", "template_0vv7b7j", params)
        .then(() => {
          form.reset();
        })
        .catch((err) => {
          console.error("Erro ao enviar:", err);
          divMsg.textContent = `We were unable to send the email, we are sorry for what happened`;
          divMsg.style.color = "#fff";
        });
    });
  } else {
    console.warn("Formulário não encontrado no DOM.");
  }
});
