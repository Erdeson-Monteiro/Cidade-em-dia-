# Cidade em Dia - Sistema de Denúncias (Versão Estática)

## 📋 Sobre o Projeto

O **Cidade em Dia** é um sistema web moderno para gerenciamento de denúncias urbanas, permitindo que cidadãos reportem problemas na cidade de forma simples e eficiente. Esta é uma versão estática desenvolvida com HTML, CSS e JavaScript, utilizando LocalStorage para simular funcionalidades de banco de dados.

![Cidade em Dia](https://img.shields.io/badge/Status-Demo-brightgreen)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## 🚀 Funcionalidades

### ✅ Já Implementadas

- **Sistema de Autenticação**
  - Login e cadastro de usuários
  - Diferentes perfis (Cidadão, Vereador, Prefeitura)
  - Sessão persistente com LocalStorage

- **Gestão de Denúncias**
  - Criação de denúncias com categorização
  - Upload de imagens (preview)
  - Geolocalização com mapa interativo
  - Status de acompanhamento (Recebida, Em Andamento, Resolvida)

- **Dashboard Interativo**
  - Estatísticas pessoais do usuário
  - Lista de denúncias recentes
  - Ações rápidas

- **Mapa Interativo**
  - Visualização de todas as denúncias
  - Filtros por categoria e status
  - Popups informativos
  - Estatísticas em tempo real

- **Interface Responsiva**
  - Design moderno e intuitivo
  - Totalmente responsivo para mobile
  - Animações e transições suaves

## 🎯 Categorias de Denúncias

- 🕳️ **Buracos** - Problemas na pavimentação
- 🗑️ **Lixo** - Descarte irregular e limpeza urbana
- 💡 **Iluminação** - Problemas na iluminação pública
- 🔥 **Queimadas** - Focos de incêndio e queimadas
- ⚠️ **Outros** - Demais problemas urbanos

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilização moderna com CSS Variables
- **JavaScript (Vanilla)** - Lógica da aplicação
- **Leaflet.js** - Mapas interativos
- **Font Awesome** - Ícones
- **Google Fonts** - Tipografia (Inter)

### Recursos Externos
- **OpenStreetMap** - Tiles do mapa
- **Geolocation API** - Localização do usuário
- **LocalStorage API** - Persistência de dados

## 📁 Estrutura do Projeto

```
cidadeemdia-static/
├── index.html              # Página inicial
├── login.html              # Página de login
├── cadastro.html           # Página de cadastro
├── dashboard.html          # Dashboard do usuário
├── denuncia.html           # Formulário de nova denúncia
├── mapa.html               # Mapa interativo
├── js/
│   └── app.js              # JavaScript principal
└── README.md               # Este arquivo
```

## 🚀 Como Usar

### 1. Clone/Download do Projeto
```bash
git clone https://github.com/seu-usuario/cidadeemdia-static.git
cd cidadeemdia-static
```

### 2. Executar Localmente
- Abra o arquivo `index.html` em seu navegador
- Ou use um servidor local como Live Server (VSCode)

### 3. Contas de Teste
O sistema vem com usuários pré-cadastrados para teste:

**Cidadão:**
- Email: `joao@email.com`
- Senha: `123456`

**Vereador:**
- Email: `maria@email.com`
- Senha: `123456`

**Prefeitura:**
- Email: `admin@prefeitura.sp.gov.br`
- Senha: `123456`

### 4. Navegação
1. **Página Inicial** - Apresentação do sistema
2. **Cadastro** - Criar nova conta
3. **Login** - Acessar o sistema
4. **Dashboard** - Visão geral das denúncias
5. **Nova Denúncia** - Reportar problema urbano
6. **Mapa** - Visualizar denúncias na cidade

## 💾 Dados Simulados

O sistema utiliza LocalStorage para simular um banco de dados, incluindo:

- **Usuários** - Dados de login e perfil
- **Denúncias** - Relatórios com geolocalização
- **Estatísticas** - Contadores e métricas

### Dados Iniciais
- 3 usuários de teste (diferentes perfis)
- 5 denúncias de exemplo
- Várias categorias e status

## 🎨 Design System

### Cores Principais
- **Azul Primário:** `#1e40af`
- **Azul Secundário:** `#3b82f6`
- **Azul Claro:** `#eff6ff`
- **Verde Sucesso:** `#10b981`
- **Laranja Aviso:** `#f59e0b`
- **Vermelho Erro:** `#ef4444`

### Tipografia
- **Fonte:** Inter (Google Fonts)
- **Pesos:** 300, 400, 500, 600, 700

## 📱 Responsividade

O sistema é totalmente responsivo, adaptando-se a:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (até 767px)

## 🔧 Funcionalidades Técnicas

### Geolocalização
- Detecção automática da localização do usuário
- Seleção manual no mapa
- Coordenadas precisas (latitude/longitude)

### Validações
- Validação de email
- Confirmação de senha
- Campos obrigatórios
- Tipos de arquivo (imagens)

### Persistência
- Dados salvos no LocalStorage
- Sessão de usuário persistente
- Sincronização entre páginas

## 🎯 Próximas Melhorias

Para uma versão completa, poderiam ser implementadas:

- Backend com banco de dados real
- Sistema de notificações
- Upload real de imagens
- Comentários e interações
- Sistema de avaliações
- Relatórios e analytics
- API para integração mobile
- Sistema de notificações push

## 🤝 Contribuição

Este é um projeto de demonstração. Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Faça um push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

Desenvolvido como demonstração técnica do sistema Cidade em Dia.

---

## 🌐 Demo Online

Para ver o projeto funcionando, acesse: [Demo do Cidade em Dia](https://seu-usuario.github.io/cidadeemdia-static)

---

**Nota:** Esta é uma versão estática para demonstração. Para uso em produção, recomenda-se implementar um backend robusto com banco de dados, autenticação segura e APIs adequadas.