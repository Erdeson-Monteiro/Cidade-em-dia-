// Verificar se usuário está logado
function verificarLogin() {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");
  const userBtn = document.getElementById("userBtn");
  const userText = document.getElementById("userText");
  const primaryBtn = document.getElementById("primaryBtn");

  if (usuario) {
    userText.textContent = usuario.nome || "Usuário";
    const dashboard = CidadeEmDia.obterDashboardPorPerfil(usuario.perfil);
    userBtn.href = dashboard;
    // Apenas cidadãos podem fazer denúncias diretamente
    if (usuario.perfil === "cidadao") {
      primaryBtn.href = "./pages/denuncia.html";
    } else {
      primaryBtn.href = dashboard;
    }
  } else {
    userText.textContent = "Entrar";
    userBtn.href = "./pages/login.html";
    primaryBtn.href = "./pages/login.html";
  }
}

// Inicializar página
document.addEventListener("DOMContentLoaded", function () {
  verificarLogin();
});
