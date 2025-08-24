# Cidade em Dia - Sistema de Denúncias

Um sistema completo de denúncias urbanas que funciona totalmente no navegador usando localStorage. Permite que cidadãos reportem problemas, vereadores acompanhem suas regiões e a prefeitura gerencie todo o sistema.

## 🚀 Funcionalidades

### 👥 Sistema de Usuários
- **Cidadãos**: Podem fazer denúncias e acompanhar o status
- **Vereadores**: Acompanham denúncias de suas regiões
- **Prefeitura**: Gerencia todo o sistema

### 📝 Sistema de Denúncias
- Categorias: Buraco, Lixo, Iluminação, Queimada, Outros
- Status: Recebida, Em andamento, Resolvida
- Localização com mapa interativo
- Sistema de likes e comentários
- Filtros por categoria, status e bairro

### 🗺️ Mapa Interativo
  - Visualização de todas as denúncias
  - Filtros por categoria e status
  - Estatísticas em tempo real
- Detecção automática de localização

### 📊 Dashboard Administrativo
- Estatísticas completas
- Gerenciamento de denúncias
- Exportação de dados
- Reset do sistema

## 🛠️ Como Usar

### 1. Acesse o Sistema
Abra o arquivo `index.html` em qualquer navegador moderno.

### 2. Faça Login
Use uma das contas pré-cadastradas:

**Cidadão:**
- Email: `joao@email.com`
- Senha: `123456`

**Vereador:**
- Email: `maria@email.com`
- Senha: `123456`

**Admin (Prefeitura):**
- Email: `admin@prefeitura.sp.gov.br`
- Senha: `123456`

### 3. Crie uma Nova Conta
- Acesse "Criar conta" na página de login
- Preencha seus dados
- Escolha seu perfil (Cidadão, Vereador ou Prefeitura)

### 4. Faça Denúncias (Cidadãos)
- Faça login como cidadão
- Clique em "Nova Denúncia"
- Preencha os dados do problema
- Marque a localização no mapa
- Envie a denúncia

### 5. Acompanhe Denúncias (Vereadores)
- Faça login como vereador
- Veja todas as denúncias da cidade
- Use filtros para encontrar problemas específicos
- Atualize o status das denúncias

### 6. Gerencie o Sistema (Prefeitura)
- Faça login como admin
- Veja estatísticas completas
- Gerencie todas as denúncias
- Exporte dados do sistema

## 📁 Estrutura do Projeto

```
Cidade-em-dia-/
├── index.html          # Página inicial
├── login.html          # Sistema de login
├── cadastro.html       # Cadastro de usuários
├── dashboard.html      # Dashboard do cidadão
├── vereador.html       # Painel do vereador
├── admin.html          # Painel administrativo
├── denuncia.html       # Formulário de denúncia
├── mapa.html           # Mapa interativo
├── js/
│   └── app.js          # Lógica principal do sistema
└── README.md           # Este arquivo
```

## 💾 Armazenamento de Dados

O sistema usa **localStorage** do navegador para armazenar:

- **Usuários**: Dados dos usuários cadastrados
- **Denúncias**: Todas as denúncias criadas
- **Comentários**: Comentários nas denúncias
- **Sessão**: Usuário logado atualmente

### Dados Iniciais
O sistema vem com dados mockados para demonstração:
- 3 usuários (cidadão, vereador, admin)
- 5 denúncias de exemplo
- 3 comentários de exemplo

## 🔧 Funcionalidades Técnicas

### Sistema de Autenticação
- Login com email e senha
- Verificação de perfil e permissões
- Redirecionamento automático por perfil
- Logout seguro

### Gerenciamento de Denúncias
- Criação de denúncias com localização
- Atualização de status
- Sistema de likes
- Comentários
- Filtros avançados

### Estatísticas
- Total de denúncias
- Status por categoria
- Denúncias por bairro
- Usuários cadastrados

### Exportação e Backup
- Exportar todos os dados em JSON
- Backup completo do sistema
- Reset para dados iniciais

## 🎨 Interface

- Design moderno e responsivo
- Cores consistentes e acessíveis
- Ícones intuitivos
- Animações suaves
- Compatível com mobile

## 🌐 Tecnologias Utilizadas

- **HTML5**: Estrutura das páginas
- **CSS3**: Estilização e responsividade
- **JavaScript**: Lógica do sistema
- **localStorage**: Armazenamento de dados
- **Leaflet.js**: Mapas interativos
- **Font Awesome**: Ícones
- **Google Fonts**: Tipografia

## 🔒 Segurança

- Validação de dados no frontend
- Verificação de permissões por página
- Proteção contra acesso não autorizado
- Sanitização de inputs

## 📱 Responsividade

O sistema funciona perfeitamente em:
- Desktop
- Tablet
- Smartphone

## 🚀 Como Executar

1. **Download**: Baixe todos os arquivos
2. **Navegador**: Abra `index.html` em qualquer navegador
3. **Login**: Use uma das contas de demonstração
4. **Explore**: Teste todas as funcionalidades

## 📊 Dados de Demonstração

### Usuários Pré-cadastrados
- João Silva (Cidadão)
- Maria Santos (Vereador)
- Carlos Admin (Prefeitura)

### Denúncias de Exemplo
- Buraco na Rua das Flores
- Lixo acumulado na praça
- Poste de luz queimado
- Queimada em terreno baldio
- Calçada quebrada

## 🔄 Atualizações Futuras

- Sistema de notificações
- Upload de imagens
- Relatórios em PDF
- Integração com APIs externas
- Sistema de pontuação para cidadãos

## 📞 Suporte

Para dúvidas ou sugestões:
- Verifique este README
- Teste todas as funcionalidades
- Use as contas de demonstração

## 📄 Licença

Este projeto é de uso livre para fins educacionais e de demonstração.

---

**Cidade em Dia** - Tornando sua cidade melhor, uma denúncia de cada vez! 🏙️✨