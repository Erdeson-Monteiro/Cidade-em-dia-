// Script de registro para Cidade em Dia
// Funções para gerenciar o processo de cadastro de usuários

// Variáveis globais
let currentStep = 1;
const totalSteps = 4;

// Função para atualizar a barra de progresso
function updateProgress() {
  const progress = (currentStep / totalSteps) * 100;
  document.getElementById("progressFill").style.width = progress + "%";

  // Atualizar indicadores
  for (let i = 1; i <= totalSteps; i++) {
    const indicator = document.getElementById("step" + i);
    if (i < currentStep) {
      indicator.classList.remove("active");
      indicator.classList.add("completed");
    } else if (i === currentStep) {
      indicator.classList.remove("completed");
      indicator.classList.add("active");
    } else {
      indicator.classList.remove("active", "completed");
    }
  }
}

// Função para mostrar um passo específico
function showStep(step) {
  // Esconder todos os passos
  for (let i = 1; i <= totalSteps; i++) {
    document.getElementById("step" + i + "-content").classList.remove("active");
  }

  // Mostrar o passo atual
  document.getElementById("step" + step + "-content").classList.add("active");

  updateProgress();
}

// Função para validar cada passo
function validateStep(step) {
  let isValid = true;

  switch (step) {
    case 1:
      const nome = document.getElementById("nome").value.trim();
      if (!nome || nome.length < 2) {
        showError("nome-error", "Por favor, digite seu nome completo");
        isValid = false;
      } else {
        hideError("nome-error");
      }
      break;

    case 2:
      const email = document.getElementById("email").value.trim();
      if (!email || !isValidEmail(email)) {
        showError("email-error", "Por favor, digite um e-mail válido");
        isValid = false;
      } else {
        hideError("email-error");
      }
      break;

    case 3:
      const senha = document.getElementById("senha").value;
      const confirmarSenha = document.getElementById("confirmar_senha").value;

      if (!senha || senha.length < 6) {
        showError("senha-error", "A senha deve ter pelo menos 6 caracteres");
        isValid = false;
      } else {
        hideError("senha-error");
      }

      if (senha !== confirmarSenha) {
        showError("confirmar_senha-error", "As senhas não conferem");
        isValid = false;
      } else {
        hideError("confirmar_senha-error");
      }
      break;

    case 4:
      const perfil = document.getElementById("perfil").value;
      if (!perfil) {
        showError("perfil-error", "Por favor, selecione um perfil");
        isValid = false;
      } else {
        hideError("perfil-error");

        // Validar campos específicos
        if (perfil === "vereador") {
          const numeroVereador = document
            .getElementById("numero-vereador")
            .value.trim();
          if (!numeroVereador) {
            showError(
              "numero-vereador-error",
              "Por favor, digite o número de vereador"
            );
            isValid = false;
          } else {
            hideError("numero-vereador-error");
          }
        } else if (perfil === "prefeitura") {
          const matricula = document
            .getElementById("matricula-prefeitura")
            .value.trim();
          if (!matricula) {
            showError(
              "matricula-prefeitura-error",
              "Por favor, digite a matrícula funcional"
            );
            isValid = false;
          } else {
            hideError("matricula-prefeitura-error");
          }
        }
      }
      break;
  }

  return isValid;
}

// Função para ir para o próximo passo
function nextStep() {
  if (validateStep(currentStep)) {
    if (currentStep < totalSteps) {
      currentStep++;
      showStep(currentStep);
    }
  }
}

// Função para voltar ao passo anterior
function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    showStep(currentStep);
  }
}

// Função para mostrar campos específicos baseado no perfil
function mostrarCampoEspecifico() {
  const perfil = document.getElementById("perfil").value;

  // Esconder todos os campos específicos
  document.getElementById("campo-vereador").style.display = "none";
  document.getElementById("campo-prefeitura").style.display = "none";

  // Mostrar campo específico baseado no perfil
  if (perfil === "vereador") {
    document.getElementById("campo-vereador").style.display = "block";
  } else if (perfil === "prefeitura") {
    document.getElementById("campo-prefeitura").style.display = "block";
  }
}

// Função para mostrar erro
function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
  errorElement.classList.add("show");

  const inputElement = errorElement.previousElementSibling;
  inputElement.classList.add("error");
}

// Função para esconder erro
function hideError(elementId) {
  const errorElement = document.getElementById(elementId);
  errorElement.classList.remove("show");

  const inputElement = errorElement.previousElementSibling;
  inputElement.classList.remove("error");
}

// Função para validar e-mail
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Função para mostrar alerta
function showAlert(type, message) {
  const alertElement = document.getElementById(type + "Alert");
  alertElement.textContent = message;
  alertElement.style.display = "block";

  setTimeout(() => {
    alertElement.style.display = "none";
  }, 5000);
}

// Função para criar novo usuário
function criarUsuario(dados) {
  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

  // Verificar se e-mail já existe
  if (usuarios.find((u) => u.email === dados.email)) {
    return { success: false, message: "Este e-mail já está cadastrado" };
  }

  // Criar novo usuário
  const novoUsuario = {
    id: Date.now(),
    nome: dados.nome,
    email: dados.email,
    senha: dados.senha,
    perfil: dados.perfil,
    cidade: "São Paulo", // Cidade padrão
    dataCadastro: new Date().toISOString(),
    ...dados.dadosEspecificos,
  };

  usuarios.push(novoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  return { success: true, usuario: novoUsuario };
}

// Função para processar o cadastro
function processarCadastro() {
  // Coletar dados
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;
  const perfil = document.getElementById("perfil").value;

  // Dados específicos por perfil
  let dadosEspecificos = {};
  if (perfil === "vereador") {
    dadosEspecificos.numeroVereador = document
      .getElementById("numero-vereador")
      .value.trim();
  } else if (perfil === "prefeitura") {
    dadosEspecificos.matriculaFuncional = document
      .getElementById("matricula-prefeitura")
      .value.trim();
  }

  const dados = {
    nome,
    email,
    senha,
    perfil,
    dadosEspecificos,
  };

  const resultado = criarUsuario(dados);

  if (resultado.success) {
    showAlert(
      "success",
      "Conta criada com sucesso! Redirecionando para o login..."
    );

    setTimeout(() => {
      window.location.href = "./pages/login.html";
    }, 2000);
  } else {
    showAlert("error", resultado.message);
  }
}

// Função para inicializar o formulário
function inicializarFormulario() {
  // Verificar se já está logado
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");
  if (usuario) {
    CidadeEmDia.redirecionarParaDashboard();
    return;
  }

  // Configurar evento de submissão
  document
    .getElementById("cadastroForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      if (!validateStep(4)) {
        return;
      }

      const submitBtn = document.getElementById("submitBtn");
      const btnText = document.getElementById("btnText");
      const loading = document.getElementById("loading");

      // Desabilitar botão
      submitBtn.disabled = true;
      loading.style.display = "inline-block";
      btnText.style.display = "none";

      // Simular processamento
      setTimeout(() => {
        processarCadastro();

        // Reabilitar botão
        submitBtn.disabled = false;
        loading.style.display = "none";
        btnText.style.display = "inline-block";
      }, 1000);
    });

  // Inicializar primeiro passo
  updateProgress();
}

// Exportar funções para uso global
window.Registre = {
  nextStep,
  prevStep,
  mostrarCampoEspecifico,
  showError,
  hideError,
  isValidEmail,
  showAlert,
  criarUsuario,
  processarCadastro,
  inicializarFormulario,
};

// Inicializar quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function () {
  inicializarFormulario();
});
