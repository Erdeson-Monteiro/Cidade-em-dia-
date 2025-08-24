let map;
let markers = [];
let denuncias = [];

// Verificar autenticação (todos os perfis podem acessar o mapa)
const usuario = CidadeEmDia.verificarAutenticacao();

// Carregar links do header baseado no perfil
function carregarHeaderActions() {
  const headerActions = document.getElementById("header-actions");
  const dashboard = CidadeEmDia.obterDashboardPorPerfil(usuario.perfil);

  let links = "";

  // Apenas cidadãos podem fazer denúncias
  if (usuario.perfil === "cidadao") {
    links += `
                    <a href="denuncia.html" class="btn btn-primary">
                        <i class="fas fa-plus"></i>
                        Nova Denúncia
                    </a>
                `;
  }

  links += `
                <a href="${dashboard}" class="btn btn-secondary">
                    <i class="fas fa-arrow-left"></i>
                    Voltar
                </a>
            `;

  headerActions.innerHTML = links;
}

// Inicializar mapa
function initMap() {
  map = L.map("map").setView([-23.5505, -46.6333], 13); // São Paulo

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  // Detectar localização do usuário
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      map.setView([lat, lng], 15);
    });
  }

  // Carregar denúncias
  carregarDenuncias();
}

// Carregar denúncias
function carregarDenuncias() {
  const loading = document.getElementById("loading");
  loading.style.display = "block";

  setTimeout(() => {
    denuncias = CidadeEmDia.obterDenuncias();
    loading.style.display = "none";
    atualizarMapa();
    atualizarEstatisticas();
  }, 500);
}

// Atualizar mapa com filtros
function atualizarMapa() {
  // Limpar marcadores existentes
  markers.forEach((marker) => map.removeLayer(marker));
  markers = [];

  // Obter filtros ativos
  const categoriasAtivas = getCategoriasAtivas();
  const statusAtivos = getStatusAtivos();

  // Filtrar denúncias
  const denunciasFiltradas = denuncias.filter((denuncia) => {
    return (
      categoriasAtivas.includes(denuncia.categoria) &&
      statusAtivos.includes(denuncia.status)
    );
  });

  // Adicionar marcadores
  denunciasFiltradas.forEach((denuncia) => {
    if (denuncia.latitude && denuncia.longitude) {
      const marker = L.marker([denuncia.latitude, denuncia.longitude])
        .addTo(map)
        .bindPopup(criarPopupContent(denuncia));

      markers.push(marker);
    }
  });
}

// Obter categorias ativas
function getCategoriasAtivas() {
  const categorias = [];
  document
    .querySelectorAll('.filter-option input[type="checkbox"]:checked')
    .forEach((checkbox) => {
      if (
        ["buraco", "lixo", "iluminacao", "queimada", "outros"].includes(
          checkbox.value
        )
      ) {
        categorias.push(checkbox.value);
      }
    });
  return categorias;
}

// Obter status ativos
function getStatusAtivos() {
  const status = [];
  document
    .querySelectorAll('.filter-option input[type="checkbox"]:checked')
    .forEach((checkbox) => {
      if (["Recebida", "Em andamento", "Resolvida"].includes(checkbox.value)) {
        status.push(checkbox.value);
      }
    });
  return status;
}

// Criar conteúdo do popup
function criarPopupContent(denuncia) {
  const data = CidadeEmDia.formatarData(denuncia.dataCriacao);
  const icone = CidadeEmDia.obterIconeCategoria(denuncia.categoria);

  return `
                <div class="popup-title">${denuncia.titulo}</div>
                <div class="popup-category">${icone} ${denuncia.categoria}</div>
                <div class="popup-description">${denuncia.descricao}</div>
                <div class="popup-meta">
                    <div class="popup-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${denuncia.bairro || "Localização não informada"}
                    </div>
                    <div class="popup-date">
                        <i class="fas fa-calendar"></i>
                        ${data}
                    </div>
                </div>
                <div class="popup-actions">
                    <button class="popup-btn popup-btn-like" onclick="reagir(${
                      denuncia.id
                    }, 'like')">
                        <i class="fas fa-thumbs-up"></i> ${denuncia.likes || 0}
                    </button>
                    <button class="popup-btn popup-btn-comment" onclick="comentar(${
                      denuncia.id
                    })">
                        <i class="fas fa-comment"></i> Status: ${
                          denuncia.status
                        }
                    </button>
                </div>
            `;
}

// Atualizar estatísticas
function atualizarEstatisticas() {
  const stats = CidadeEmDia.obterEstatisticasDenuncias();

  document.getElementById("total-denuncias").textContent = stats.total;
  document.getElementById("resolvidas").textContent = stats.resolvidas;
  document.getElementById("andamento").textContent = stats.andamento;
  document.getElementById("recebidas").textContent = stats.recebidas;
}

// Reagir a uma denúncia
function reagir(denunciaId, tipo) {
  const denuncias = CidadeEmDia.obterDenuncias();
  const denuncia = denuncias.find((d) => d.id === denunciaId);

  if (denuncia) {
    denuncia.likes = (denuncia.likes || 0) + 1;
    localStorage.setItem("denuncias", JSON.stringify(denuncias));
    carregarDenuncias(); // Recarregar para refletir as mudanças
  }
}

// Comentar em uma denúncia
function comentar(denunciaId) {
  alert(
    "Funcionalidade de comentários disponível na versão completa do sistema!"
  );
}

// Event listeners para filtros
document
  .querySelectorAll('.filter-option input[type="checkbox"]')
  .forEach((checkbox) => {
    checkbox.addEventListener("change", atualizarMapa);
  });

// Inicializar mapa quando a página carregar
document.addEventListener("DOMContentLoaded", function () {
  carregarHeaderActions();
  initMap();
});
