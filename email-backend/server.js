require("dotenv").config(); // carrega as variáveis do arquivo .env
const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json()); // permite receber JSON no corpo das requisições

// configura o transporte SMTP usando as variáveis do .env
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // use true se for porta 465 (SSL)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// rota POST para envio de e-mails
app.post("/api/enviar-email", async (req, res) => {
  const { to, subject, body } = req.body;

  if (!to || !subject || !body) {
    return res.status(400).json({ error: "Campos obrigatórios faltando." });
  }

  try {
    await transporter.sendMail({
      from: `"Minha Loja" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text: body,
    });

    res.status(200).json({ message: "E-mail enviado com sucesso!" });
  } catch (err) {
    console.error("Erro ao enviar e-mail:", err);
    res.status(500).json({ error: "Falha ao enviar e-mail." });
  }
});

// inicia o servidor na porta definida ou na 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
