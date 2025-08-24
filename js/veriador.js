let todasDenuncias = [];
let denunciasFiltradas = [];

// Verificar autenticação (apenas vereador pode acessar)
const usuario = CidadeEmDia.verificarPerfilEPermissao("vereador");

// Carregar dados do usuário
function carregarUsuario() {
  document.getElementById("user-name").textContent = usuario.nome;
  document.getElementById("user-role").textContent = usuario.perfil;

  // Definir avatar com iniciais
  const iniciais = usuario.nome
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  document.getElementById("user-avatar").innerHTML = iniciais;
}

// Carregar estatísticas
function carregarEstatisticas() {
  const stats = CidadeEmDia.obterEstatisticasDenuncias();

  document.getElementById("total-denuncias").textContent = stats.total;
  document.getElementById("resolvidas").textContent = stats.resolvidas;
  document.getElementById("andamento").textContent = stats.andamento;
  document.getElementById("recebidas").textContent = stats.recebidas;
}

// Carregar estatísticas por bairro
function carregarEstatisticasBairro() {
  const denuncias = CidadeEmDia.obterDenuncias();

  const bairros = ["Centro", "Liberdade", "Vila Madalena", "Itaquera", "Moema"];
  bairros.forEach((bairro) => {
    const count = denuncias.filter((d) => d.bairro === bairro).length;
    const elementId = bairro.toLowerCase().replace(/\s+/g, "-") + "-count";
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = count;
    }
  });
}

// Carregar denúncias
function carregarDenuncias() {
  todasDenuncias = CidadeEmDia.obterDenuncias();
  denunciasFiltradas = [...todasDenuncias];
  atualizarTabela();
}

// Filtrar denúncias
function filtrarDenuncias() {
  const statusFilter = document.getElementById("filter-status").value;
  const categoriaFilter = document.getElementById("filter-categoria").value;
  const bairroFilter = document.getElementById("filter-bairro").value;

  denunciasFiltradas = todasDenuncias.filter((denuncia) => {
    const statusMatch = !statusFilter || denuncia.status === statusFilter;
    const categoriaMatch =
      !categoriaFilter || denuncia.categoria === categoriaFilter;
    const bairroMatch = !bairroFilter || denuncia.bairro === bairroFilter;

    return statusMatch && categoriaMatch && bairroMatch;
  });

  atualizarTabela();
}

// Atualizar tabela
function atualizarTabela() {
  const tbody = document.getElementById("denuncias-tbody");

  tbody.innerHTML = denunciasFiltradas
    .map(
      (denuncia) => `
                <tr>
                    <td>${denuncia.id}</td>
                    <td>${denuncia.titulo}</td>
                    <td>${CidadeEmDia.obterIconeCategoria(
                      denuncia.categoria
                    )} ${denuncia.categoria}</td>
                    <td>${denuncia.bairro || "Não informado"}</td>
                    <td><span class="status-badge status-${denuncia.status
                      .toLowerCase()
                      .replace(/\s+/g, "-")}">${denuncia.status}</span></td>
                    <td>${CidadeEmDia.obterNomeUsuario(denuncia.usuarioId)}</td>
                    <td>${CidadeEmDia.formatarData(denuncia.dataCriacao)}</td>
                    <td>${denuncia.likes || 0}</td>
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
                        <button class="btn btn-primary btn-small" onclick="verDetalhes(${
                          denuncia.id
                        })">
                            <i class="fas fa-eye"></i>
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
    carregarEstatisticasBairro();
  } else {
    alert("Erro ao atualizar status!");
  }
}

// Ver detalhes da denúncia
function verDetalhes(id) {
  const denuncia = todasDenuncias.find((d) => d.id === id);
  if (denuncia) {
    const comentarios = CidadeEmDia.obterComentariosDenuncia(id);
    const detalhes = `
Detalhes da Denúncia #${denuncia.id}

Título: ${denuncia.titulo}
Categoria: ${denuncia.categoria}
Status: ${denuncia.status}
Bairro: ${denuncia.bairro || "Não informado"}
Rua: ${denuncia.rua || "Não informado"}
Descrição: ${denuncia.descricao}

Cidadão: ${CidadeEmDia.obterNomeUsuario(denuncia.usuarioId)}
Data: ${CidadeEmDia.formatarDataHora(denuncia.dataCriacao)}
Likes: ${denuncia.likes || 0}
Comentários: ${comentarios.length}

Comentários:
${comentarios
  .map((c) => `- ${CidadeEmDia.obterNomeUsuario(c.usuarioId)}: ${c.texto}`)
  .join("\n")}
                `;
    alert(detalhes);
  }
}

// Inicializar
document.addEventListener("DOMContentLoaded", function () {
  carregarUsuario();
  carregarEstatisticas();
  carregarEstatisticasBairro();
  carregarDenuncias();
});
