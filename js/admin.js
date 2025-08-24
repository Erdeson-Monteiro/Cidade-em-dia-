// Verificar autenticação (apenas prefeitura pode acessar)
const usuario = CidadeEmDia.verificarPerfilEPermissao("prefeitura");

// Carregar estatísticas
function carregarEstatisticas() {
  const stats = CidadeEmDia.obterEstatisticasDenuncias();
  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

  document.getElementById("total-denuncias").textContent = stats.total;
  document.getElementById("total-usuarios").textContent = usuarios.length;
  document.getElementById("resolvidas").textContent = stats.resolvidas;
  document.getElementById("andamento").textContent = stats.andamento;
}

// Carregar denúncias
function carregarDenuncias() {
  const tbody = document.getElementById("denuncias-tbody");
  const denuncias = CidadeEmDia.obterDenuncias();

  tbody.innerHTML = denuncias
    .map(
      (denuncia) => `
                <tr>
                    <td>${denuncia.id}</td>
                    <td>${denuncia.titulo}</td>
                    <td>${CidadeEmDia.obterIconeCategoria(
                      denuncia.categoria
                    )} ${denuncia.categoria}</td>
                    <td><span class="status-badge status-${denuncia.status
                      .toLowerCase()
                      .replace(/\s+/g, "-")}">${denuncia.status}</span></td>
                    <td>${CidadeEmDia.obterNomeUsuario(denuncia.usuarioId)}</td>
                    <td>${CidadeEmDia.formatarData(denuncia.dataCriacao)}</td>
                    <td class="actions">
                        <button class="btn btn-success btn-small" onclick="atualizarStatus(${
                          denuncia.id
                        }, 'Resolvida')">
                            <i class="fas fa-check"></i>
                            </button>
                        <button class="btn btn-warning btn-small" onclick="atualizarStatus(${
                          denuncia.id
                        }, 'Em andamento')">
                            <i class="fas fa-clock"></i>
                            </button>
                    </td>
                </tr>
            `
    )
    .join("");
}

// Atualizar status
function atualizarStatus(id, novoStatus) {
  if (CidadeEmDia.atualizarStatusDenuncia(id, novoStatus)) {
    alert("Status atualizado com sucesso!");
    carregarDenuncias();
    carregarEstatisticas();
  } else {
    alert("Erro ao atualizar status!");
  }
}

// Exportar dados
function exportarDados() {
  CidadeEmDia.exportarDados();
}

// Limpar dados
function limparDados() {
  CidadeEmDia.limparDados();
}

// Mostrar informações do sistema
function mostrarInfoSistema() {
  const info = `
Sistema: Cidade em Dia
Versão: 1.0.0
Armazenamento: localStorage
Usuários: ${JSON.parse(localStorage.getItem("usuarios") || "[]").length}
Denúncias: ${CidadeEmDia.obterDenuncias().length}
Comentários: ${CidadeEmDia.obterComentarios().length}
Data: ${new Date().toLocaleString("pt-BR")}
            `;
  alert(info);
}

// Inicializar
document.addEventListener("DOMContentLoaded", function () {
  carregarEstatisticas();
  carregarDenuncias();
});
