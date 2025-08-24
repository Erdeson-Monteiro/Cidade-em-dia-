let map, marker;
let selectedCategory = "";

// Verificar autenticação (apenas cidadãos podem fazer denúncias)
const usuario = CidadeEmDia.verificarPerfilEPermissao("cidadao");

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
      addMarker(lat, lng);
    });
  }

  // Adicionar marcador ao clicar no mapa
  map.on("click", function (e) {
    addMarker(e.latlng.lat, e.latlng.lng);
  });
}

// Adicionar marcador
function addMarker(lat, lng) {
  if (marker) {
    map.removeLayer(marker);
  }

  marker = L.marker([lat, lng]).addTo(map);
  document.getElementById("latitude").value = lat;
  document.getElementById("longitude").value = lng;
}

// Seleção de categoria
document.querySelectorAll(".category-option").forEach((option) => {
  option.addEventListener("click", function () {
    // Remover seleção anterior
    document.querySelectorAll(".category-option").forEach((opt) => {
      opt.classList.remove("selected");
    });

    // Selecionar nova categoria
    this.classList.add("selected");
    selectedCategory = this.dataset.value;
    document.getElementById("categoria").value = selectedCategory;
  });
});

// Submissão do formulário
document
  .getElementById("denunciaForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = document.getElementById("submitBtn");
    const btnText = document.getElementById("btnText");
    const loading = document.getElementById("loading");
    const errorAlert = document.getElementById("errorAlert");
    const successAlert = document.getElementById("successAlert");

    // Limpar alertas
    errorAlert.style.display = "none";
    successAlert.style.display = "none";

    // Validações
    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;

    if (!titulo || !descricao || !selectedCategory) {
      showError("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    // Mostrar loading
    submitBtn.disabled = true;
    loading.classList.add("show");
    btnText.textContent = "Enviando...";

    // Criar denúncia
    const dadosDenuncia = {
      titulo,
      categoria: selectedCategory,
      descricao,
      bairro: document.getElementById("bairro").value,
      rua: document.getElementById("rua").value,
      latitude: document.getElementById("latitude").value,
      longitude: document.getElementById("longitude").value,
    };

    // Simular envio
    setTimeout(() => {
      try {
        CidadeEmDia.criarDenuncia(dadosDenuncia);
        showSuccess("Denúncia enviada com sucesso! Redirecionando...");

        setTimeout(() => {
          window.location.href = "./dashboard.html";
        }, 2000);
      } catch (error) {
        showError("Erro ao enviar denúncia. Tente novamente.");
        submitBtn.disabled = false;
        loading.classList.remove("show");
        btnText.textContent = "Enviar Denúncia";
      }
    }, 1000);
  });

function showError(message) {
  const errorAlert = document.getElementById("errorAlert");
  errorAlert.textContent = message;
  errorAlert.style.display = "block";
}

function showSuccess(message) {
  const successAlert = document.getElementById("successAlert");
  successAlert.textContent = message;
  successAlert.style.display = "block";
}

// Inicializar mapa quando a página carregar
document.addEventListener("DOMContentLoaded", function () {
  initMap();
});
