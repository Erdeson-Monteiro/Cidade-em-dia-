// Cidade em Dia - Sistema de Denúncias (Versão Estática)
// JavaScript principal com simulação de dados

// Dados iniciais mockados
const DADOS_INICIAIS = {
    usuarios: [
        {
            id: 1,
            nome: 'João Silva',
            email: 'joao@email.com',
            senha: '123456',
            telefone: '(11) 99999-9999',
            idade: 35,
            cidade: 'São Paulo',
            perfil: 'cidadao',
            dataCadastro: '2024-01-15T10:30:00.000Z'
        },
        {
            id: 2,
            nome: 'Maria Santos',
            email: 'maria@email.com',
            senha: '123456',
            telefone: '(11) 88888-8888',
            idade: 42,
            cidade: 'São Paulo',
            perfil: 'vereador',
            dataCadastro: '2024-01-10T14:20:00.000Z'
        },
        {
            id: 3,
            nome: 'Carlos Admin',
            email: 'admin@prefeitura.sp.gov.br',
            senha: '123456',
            telefone: '(11) 77777-7777',
            idade: 45,
            cidade: 'São Paulo',
            perfil: 'prefeitura',
            dataCadastro: '2024-01-05T09:15:00.000Z'
        }
    ],
    denuncias: [
        {
            id: 1,
            titulo: 'Buraco na Rua das Flores',
            categoria: 'buraco',
            descricao: 'Buraco grande na via principal que está causando acidentes e danos aos veículos.',
            bairro: 'Centro',
            rua: 'Rua das Flores, 123',
            latitude: -23.5505,
            longitude: -46.6333,
            status: 'Recebida',
            usuarioId: 1,
            dataCriacao: '2024-03-15T10:30:00.000Z',
            imagem: null,
            likes: 15,
            comentarios: 3
        },
        {
            id: 2,
            titulo: 'Lixo acumulado na praça',
            categoria: 'lixo',
            descricao: 'Muito lixo acumulado na Praça da Liberdade, causando mau cheiro e atraindo animais.',
            bairro: 'Liberdade',
            rua: 'Praça da Liberdade',
            latitude: -23.5489,
            longitude: -46.6388,
            status: 'Em andamento',
            usuarioId: 1,
            dataCriacao: '2024-03-14T14:20:00.000Z',
            imagem: null,
            likes: 8,
            comentarios: 1
        },
        {
            id: 3,
            titulo: 'Poste de luz queimado',
            categoria: 'iluminacao',
            descricao: 'Poste de iluminação pública não está funcionando há mais de uma semana.',
            bairro: 'Vila Madalena',
            rua: 'Rua Harmonia, 456',
            latitude: -23.5598,
            longitude: -46.6918,
            status: 'Resolvida',
            usuarioId: 2,
            dataCriacao: '2024-03-10T16:45:00.000Z',
            imagem: null,
            likes: 5,
            comentarios: 2
        },
        {
            id: 4,
            titulo: 'Queimada em terreno baldio',
            categoria: 'queimada',
            descricao: 'Queimada descontrolada em terreno baldio, gerando fumaça e risco aos moradores.',
            bairro: 'Itaquera',
            rua: 'Av. Itaquera, 789',
            latitude: -23.5419,
            longitude: -46.4565,
            status: 'Recebida',
            usuarioId: 2,
            dataCriacao: '2024-03-13T08:15:00.000Z',
            imagem: null,
            likes: 22,
            comentarios: 5
        },
        {
            id: 5,
            titulo: 'Calçada quebrada',
            categoria: 'outros',
            descricao: 'Calçada com grandes buracos e desníveis, dificultando a passagem de pedestres.',
            bairro: 'Moema',
            rua: 'Av. Ibirapuera, 321',
            latitude: -23.5731,
            longitude: -46.6499,
            status: 'Em andamento',
            usuarioId: 1,
            dataCriacao: '2024-03-12T11:30:00.000Z',
            imagem: null,
            likes: 12,
            comentarios: 4
        }
    ]
};

// Funções de utilidade
function inicializarDados() {
    // Inicializar dados apenas se não existirem
    if (!localStorage.getItem('usuarios')) {
        localStorage.setItem('usuarios', JSON.stringify(DADOS_INICIAIS.usuarios));
    }
    
    if (!localStorage.getItem('denuncias')) {
        localStorage.setItem('denuncias', JSON.stringify(DADOS_INICIAIS.denuncias));
    }
}

function formatarData(dataString) {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function formatarDataHora(dataString) {
    const data = new Date(dataString);
    return data.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function gerarId() {
    return Date.now();
}

function obterUsuarioLogado() {
    return JSON.parse(localStorage.getItem('usuario') || 'null');
}

function verificarAutenticacao() {
    const usuario = obterUsuarioLogado();
    if (!usuario) {
        window.location.href = 'login.html';
        return false;
    }
    return usuario;
}

function obterDashboardPorPerfil(perfil) {
    switch(perfil) {
        case 'vereador':
            return 'vereador.html';
        case 'prefeitura':
            return 'admin.html';
        case 'cidadao':
        default:
            return 'dashboard.html';
    }
}

function redirecionarParaDashboard() {
    const usuario = obterUsuarioLogado();
    if (usuario) {
        const dashboard = obterDashboardPorPerfil(usuario.perfil);
        window.location.href = dashboard;
    } else {
        window.location.href = 'login.html';
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
    if (confirm('Tem certeza que deseja sair?')) {
        localStorage.removeItem('usuario');
        window.location.href = 'index.html';
    }
}

// Funções para gerenciar denúncias
function obterDenuncias() {
    return JSON.parse(localStorage.getItem('denuncias') || '[]');
}

function salvarDenuncias(denuncias) {
    localStorage.setItem('denuncias', JSON.stringify(denuncias));
}

function criarDenuncia(dadosDenuncia) {
    const denuncias = obterDenuncias();
    const usuario = obterUsuarioLogado();
    
    const novaDenuncia = {
        id: gerarId(),
        ...dadosDenuncia,
        usuarioId: usuario.id,
        dataCriacao: new Date().toISOString(),
        status: 'Recebida',
        likes: 0,
        comentarios: 0
    };
    
    denuncias.push(novaDenuncia);
    salvarDenuncias(denuncias);
    
    return novaDenuncia;
}

function obterDenunciasUsuario(usuarioId) {
    const denuncias = obterDenuncias();
    return denuncias.filter(d => d.usuarioId === usuarioId);
}

function obterEstatisticasDenuncias() {
    const denuncias = obterDenuncias();
    
    const total = denuncias.length;
    const resolvidas = denuncias.filter(d => d.status === 'Resolvida').length;
    const andamento = denuncias.filter(d => d.status === 'Em andamento').length;
    const recebidas = denuncias.filter(d => d.status === 'Recebida').length;
    
    // Estatísticas por categoria
    const porCategoria = {};
    denuncias.forEach(d => {
        porCategoria[d.categoria] = (porCategoria[d.categoria] || 0) + 1;
    });
    
    // Estatísticas por bairro
    const porBairro = {};
    denuncias.forEach(d => {
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
        porBairro: Object.keys(porBairro).length
    };
}

// Funções para categorias
function obterIconeCategoria(categoria) {
    const icones = {
        'buraco': '🕳️',
        'lixo': '🗑️',
        'iluminacao': '💡',
        'queimada': '🔥',
        'outros': '⚠️'
    };
    return icones[categoria] || '⚠️';
}

function obterCorStatus(status) {
    const cores = {
        'Recebida': '#3b82f6',
        'Em andamento': '#f59e0b',
        'Resolvida': '#10b981'
    };
    return cores[status] || '#6b7280';
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
    value = value.replace(/\D/g, '');
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
    value = value.replace(/(\d)(\d{4})$/, '$1-$2');
    return value;
}

// Inicializar dados quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
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
    obterIconeCategoria,
    obterCorStatus,
    formatarData,
    formatarDataHora,
    validarEmail,
    validarSenha,
    validarTelefone,
    mascaraTelefone
};