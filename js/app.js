// Script principal do Cidade em Dia
// Funções globais e gerenciamento de dados

// Dados iniciais vazios
const DADOS_INICIAIS = {
  usuarios: [],
  denuncias: [],
  comentarios: [],
};

// Função para gerar IDs únicos
function gerarId() {
  return Date.now() + Math.random();
}

// Função para inicializar dados
function inicializarDados() {
  // Verificar se já existem dados
  if (!localStorage.getItem("usuarios")) {
    localStorage.setItem("usuarios", JSON.stringify(DADOS_INICIAIS.usuarios));
  }

  if (!localStorage.getItem("denuncias")) {
    localStorage.setItem("denuncias", JSON.stringify(DADOS_INICIAIS.denuncias));
  }

  if (!localStorage.getItem("comentarios")) {
    localStorage.setItem(
      "comentarios",
      JSON.stringify(DADOS_INICIAIS.comentarios)
    );
  }
}

// Funções de autenticação
function obterUsuarioLogado() {
  return JSON.parse(localStorage.getItem("usuario") || "null");
}

function verificarAutenticacao() {
  const usuario = obterUsuarioLogado();
  if (!usuario) {
    window.location.href = "./pages/login.html";
    return false;
  }
  return usuario;
}

function obterDashboardPorPerfil(perfil) {
  switch (perfil) {
    case "vereador":
      return "./vereador.html";
    case "prefeitura":
      return "./admin.html";
    case "cidadao":
    default:
      return "./dashboard.html";
  }
}

function redirecionarParaDashboard() {
  const usuario = obterUsuarioLogado();
  if (usuario) {
    const dashboard = obterDashboardPorPerfil(usuario.perfil);
    window.location.href = dashboard;
  } else {
    window.location.href = "./pages/login.html";
  }
}

function verificarPerfilEPermissao(perfilRequerido) {
  const usuario = verificarAutenticacao();
  if (!usuario) return false;

  if (perfilRequerido && usuario.perfil !== perfilRequerido) {
    // Redirecionar para o dashboard correto do usuário
    redirecionarParaDashboard();
    return false;
  }

  return usuario;
}

function logout() {
  if (confirm("Tem certeza que deseja sair?")) {
    localStorage.removeItem("usuario");
    // Verificar se está em uma página dentro de pages/
    const currentPath = window.location.pathname;
    if (currentPath.includes("/pages/")) {
      window.location.href = "../index.html";
    } else {
      window.location.href = "index.html";
    }
  }
}

// Funções para gerenciar denúncias
function obterDenuncias() {
  return JSON.parse(localStorage.getItem("denuncias") || "[]");
}

function salvarDenuncias(denuncias) {
  localStorage.setItem("denuncias", JSON.stringify(denuncias));
}

function criarDenuncia(dadosDenuncia) {
  const denuncias = obterDenuncias();
  const usuario = obterUsuarioLogado();

  const novaDenuncia = {
    id: gerarId(),
    ...dadosDenuncia,
    usuarioId: usuario.id,
    dataCriacao: new Date().toISOString(),
    status: "Recebida",
    likes: 0,
    comentarios: 0,
  };

  denuncias.push(novaDenuncia);
  salvarDenuncias(denuncias);

  return novaDenuncia;
}

function obterDenunciasUsuario(usuarioId) {
  const denuncias = obterDenuncias();
  return denuncias.filter((d) => d.usuarioId === usuarioId);
}

function obterEstatisticasDenuncias() {
  const denuncias = obterDenuncias();

  const total = denuncias.length;
  const resolvidas = denuncias.filter((d) => d.status === "Resolvida").length;
  const andamento = denuncias.filter((d) => d.status === "Em andamento").length;
  const recebidas = denuncias.filter((d) => d.status === "Recebida").length;

  // Estatísticas por categoria
  const porCategoria = {};
  denuncias.forEach((d) => {
    porCategoria[d.categoria] = (porCategoria[d.categoria] || 0) + 1;
  });

  // Estatísticas por bairro
  const porBairro = {};
  denuncias.forEach((d) => {
    if (d.bairro) {
      porBairro[d.bairro] = (porBairro[d.bairro] || 0) + 1;
    }
  });

  return {
    total,
    resolvidas,
    andamento,
    recebidas,
    porCategoria,
    porBairro,
  };
}

// Funções para gerenciar comentários
function obterComentarios() {
  return JSON.parse(localStorage.getItem("comentarios") || "[]");
}

function salvarComentarios(comentarios) {
  localStorage.setItem("comentarios", JSON.stringify(comentarios));
}

function obterComentariosDenuncia(denunciaId) {
  const comentarios = obterComentarios();
  return comentarios.filter((c) => c.denunciaId === denunciaId);
}

function adicionarComentario(denunciaId, texto) {
  const comentarios = obterComentarios();
  const usuario = obterUsuarioLogado();

  const novoComentario = {
    id: gerarId(),
    denunciaId: denunciaId,
    usuarioId: usuario.id,
    texto: texto,
    dataCriacao: new Date().toISOString(),
  };

  comentarios.push(novoComentario);
  salvarComentarios(comentarios);

  // Atualizar contador de comentários na denúncia
  const denuncias = obterDenuncias();
  const denuncia = denuncias.find((d) => d.id === denunciaId);
  if (denuncia) {
    denuncia.comentarios = (denuncia.comentarios || 0) + 1;
    salvarDenuncias(denuncias);
  }

  return novoComentario;
}

// Funções para gerenciar likes
function adicionarLike(denunciaId) {
  const denuncias = obterDenuncias();
  const denuncia = denuncias.find((d) => d.id === denunciaId);

  if (denuncia) {
    denuncia.likes = (denuncia.likes || 0) + 1;
    salvarDenuncias(denuncias);
    return denuncia.likes;
  }

  return 0;
}

// Funções para gerenciar status das denúncias
function atualizarStatusDenuncia(denunciaId, novoStatus) {
  const denuncias = obterDenuncias();
  const denuncia = denuncias.find((d) => d.id === denunciaId);

  if (denuncia) {
    denuncia.status = novoStatus;
    salvarDenuncias(denuncias);
    return true;
  }

  return false;
}

// Funções utilitárias
function obterIconeCategoria(categoria) {
  const icones = {
    Infraestrutura: "fas fa-road",
    Limpeza: "fas fa-trash",
    Iluminação: "fas fa-lightbulb",
    Segurança: "fas fa-shield-alt",
    Transporte: "fas fa-bus",
    Saúde: "fas fa-heartbeat",
    Educação: "fas fa-graduation-cap",
    Outros: "fas fa-exclamation-triangle",
  };
  return icones[categoria] || icones["Outros"];
}

function obterCorStatus(status) {
  const cores = {
    Recebida: "#f59e0b",
    "Em andamento": "#3b82f6",
    Resolvida: "#10b981",
    Cancelada: "#ef4444",
  };
  return cores[status] || "#6b7280";
}

function formatarData(data) {
  return new Date(data).toLocaleDateString("pt-BR");
}

function formatarDataHora(data) {
  return new Date(data).toLocaleString("pt-BR");
}

function obterNomeUsuario(usuarioId) {
  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
  const usuario = usuarios.find((u) => u.id === usuarioId);
  return usuario ? usuario.nome : "Usuário desconhecido";
}

// Funções de sistema
function limparDados() {
  if (
    confirm(
      "Tem certeza que deseja limpar todos os dados? Esta ação não pode ser desfeita."
    )
  ) {
    localStorage.clear();
    inicializarDados();
    alert("Dados limpos com sucesso!");
    window.location.reload();
  }
}

function exportarDados() {
  const dados = {
    usuarios: JSON.parse(localStorage.getItem("usuarios") || "[]"),
    denuncias: JSON.parse(localStorage.getItem("denuncias") || "[]"),
    comentarios: JSON.parse(localStorage.getItem("comentarios") || "[]"),
  };

  const blob = new Blob([JSON.stringify(dados, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "cidade-em-dia-dados.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Funções de validação
function validarEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validarSenha(senha) {
  return senha && senha.length >= 6;
}

function validarTelefone(telefone) {
  if (!telefone) return true; // Campo opcional
  const re = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
  return re.test(telefone);
}

// Função para mascarar telefone
function mascaraTelefone(value) {
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  return value;
}

// Inicializar dados quando a página carregar
document.addEventListener("DOMContentLoaded", function () {
  inicializarDados();
});

// Exportar funções para uso global
window.CidadeEmDia = {
  obterUsuarioLogado,
  verificarAutenticacao,
  verificarPerfilEPermissao,
  obterDashboardPorPerfil,
  redirecionarParaDashboard,
  logout,
  obterDenuncias,
  criarDenuncia,
  obterDenunciasUsuario,
  obterEstatisticasDenuncias,
  obterComentarios,
  obterComentariosDenuncia,
  adicionarComentario,
  adicionarLike,
  atualizarStatusDenuncia,
  obterIconeCategoria,
  obterCorStatus,
  formatarData,
  formatarDataHora,
  validarEmail,
  validarSenha,
  validarTelefone,
  mascaraTelefone,
  obterNomeUsuario,
  limparDados,
  exportarDados,
};
