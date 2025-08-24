// Carregar dados do usuário
function carregarUsuario() {
  const usuario = CidadeEmDia.verificarPerfilEPermissao("cidadao");
  if (!usuario) return;

  document.getElementById("user-name").textContent = usuario.nome;
  document.getElementById("user-role").textContent = usuario.perfil;

  // Definir avatar com iniciais
  const iniciais = usuario.nome
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  document.getElementById("user-avatar").innerHTML = iniciais;

  // Carregar estatísticas
  carregarEstatisticas();
  carregarDenuncias();
}

// Carregar estatísticas
function carregarEstatisticas() {
  const usuario = CidadeEmDia.obterUsuarioLogado();
  const minhasDenuncias = CidadeEmDia.obterDenunciasUsuario(usuario.id);

  const total = minhasDenuncias.length;
  const resolvidas = minhasDenuncias.filter(
    (d) => d.status === "Resolvida"
  ).length;
  const andamento = minhasDenuncias.filter(
    (d) => d.status === "Em andamento"
  ).length;
  const recebidas = minhasDenuncias.filter(
    (d) => d.status === "Recebida"
  ).length;

  document.getElementById("total-denuncias").textContent = total;
  document.getElementById("resolvidas").textContent = resolvidas;
  document.getElementById("andamento").textContent = andamento;
  document.getElementById("recebidas").textContent = recebidas;
}

// Carregar denúncias recentes
function carregarDenuncias() {
  const loading = document.getElementById("denuncias-loading");
  const list = document.getElementById("denuncias-list");

  loading.classList.add("show");

  setTimeout(() => {
    const usuario = CidadeEmDia.obterUsuarioLogado();
    const minhasDenuncias = CidadeEmDia.obterDenunciasUsuario(usuario.id);

    loading.classList.remove("show");

    if (minhasDenuncias.length > 0) {
      const recentes = minhasDenuncias
        .sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao))
        .slice(0, 5); // Últimas 5

      list.innerHTML = recentes
        .map((denuncia) => criarCardDenuncia(denuncia))
        .join("");
    } else {
      list.innerHTML = `
                        <div class="empty-state">
                            <i class="fas fa-inbox"></i>
                            <p>Você ainda não fez nenhuma denúncia.</p>
                            <a href="denuncia.html" class="btn btn-primary" style="margin-top: 1rem;">
                                <i class="fas fa-plus"></i>
                                Fazer Primeira Denúncia
                            </a>
                        </div>
                    `;
    }
  }, 500);
}

// Criar card de denúncia
function criarCardDenuncia(denuncia) {
  const statusClass = `status-${denuncia.status
    .toLowerCase()
    .replace(/\s+/g, "-")}`;
  const data = CidadeEmDia.formatarData(denuncia.dataCriacao);
  const icone = CidadeEmDia.obterIconeCategoria(denuncia.categoria);

  return `
                <div class="denuncia-card">
                    <div class="denuncia-header">
                        <div>
                            <div class="denuncia-title">${denuncia.titulo}</div>
                            <div class="denuncia-category">${icone} ${
    denuncia.categoria
  }</div>
                        </div>
                        <div class="denuncia-status ${statusClass}">${
    denuncia.status
  }</div>
                    </div>
                    <div class="denuncia-description">${
                      denuncia.descricao
                    }</div>
                    <div class="denuncia-meta">
                        <div class="denuncia-location">
                            <i class="fas fa-map-marker-alt"></i>
                            ${denuncia.bairro || "Localização não informada"}
                        </div>
                        <div class="denuncia-date">
                            <i class="fas fa-calendar"></i>
                            ${data}
                        </div>
                    </div>
                </div>
            `;
}

// Inicializar
document.addEventListener("DOMContentLoaded", function () {
  carregarUsuario();
});
