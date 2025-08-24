document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const submitBtn = document.getElementById("submitBtn");
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  // Validar campos
  if (!email || !senha) {
    showError("Por favor, preencha todos os campos");
    return;
  }

  if (!isValidEmail(email)) {
    showError("Por favor, insira um e-mail válido");
    return;
  }

  // Desabilitar botão
  submitBtn.disabled = true;

  // Simular login
  setTimeout(() => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const usuario = usuarios.find(
      (u) => u.email === email && u.senha === senha
    );

    if (usuario) {
      // Login bem-sucedido
      localStorage.setItem("usuario", JSON.stringify(usuario));
      showSuccess("Login realizado com sucesso! Redirecionando...");

      setTimeout(() => {
        CidadeEmDia.redirecionarParaDashboard();
      }, 1500);
    } else {
      // Credenciais inválidas
      showError("E-mail ou senha incorretos");
      submitBtn.disabled = false;
    }
  }, 1000);
});

function showError(message) {
  const errorAlert = document.getElementById("errorAlert");
  const successAlert = document.getElementById("successAlert");

  successAlert.style.display = "none";
  errorAlert.textContent = message;
  errorAlert.style.display = "block";

  setTimeout(() => {
    errorAlert.style.display = "none";
  }, 5000);
}

function showSuccess(message) {
  const errorAlert = document.getElementById("errorAlert");
  const successAlert = document.getElementById("successAlert");

  errorAlert.style.display = "none";
  successAlert.textContent = message;
  successAlert.style.display = "block";
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Verificar se já está logado
document.addEventListener("DOMContentLoaded", function () {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");
  if (usuario) {
    CidadeEmDia.redirecionarParaDashboard();
  }
});
