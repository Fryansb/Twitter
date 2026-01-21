# 🐦 Twitter Clone - Projeto Completo

Clone funcional do Twitter desenvolvido com **Django REST Framework** no backend e **React + TypeScript** no frontend.

## 🌐 **Links de Acesso**

- **🖥️ Aplicação em Produção**: https://twitter-iota-sepia.vercel.app
- **🔧 API Backend**: https://twitter-b01m.onrender.com/api
- **📂 Repositório GitHub**: https://github.com/Fryansb/Twitter

---

## 🚀 Funcionalidades Implementadas

### ✅ **Sistema de Autenticação**
- Cadastro e Login com JWT
- Logout e gestão de sessões
- Tokens de acesso e refresh

### ✅ **Sistema de Posts (Tweets)**
- Criar tweets
- Feed personalizado (mostra apenas quem você segue)
- Curtir tweets
- Comentar em posts
- Contador de curtidas e comentários

### ✅ **Sistema Social**
- **Seguir/deixar de seguir usuários**
- **Buscar usuários por email**
- Feed mostra apenas tweets de quem você segue
- Lista de seguidores e seguidos
- Indicador visual de "Seguindo" vs "Seguir"

### ✅ **Perfil de Usuário**
- Editar perfil (email, bio, senha)
- Upload de avatar (foto de perfil)
- Visualização de estatísticas
- Todas as alterações são opcionais

---

## 🛠️ Tecnologias Utilizadas

### **Backend**
- **Python 3.10** (Render)
- **Django 5.2.4**
- **Django REST Framework 3.16.0**
- **PostgreSQL** (Render)
- **JWT Authentication** (djangorestframework-simplejwt)
- **CORS Headers**
- **WhiteNoise** (arquivos estáticos)
- **Gunicorn** (servidor WSGI)

### **Frontend**
- **React 18 + TypeScript**
- **Vite** (Build tool)
- **TailwindCSS** (Styling)
- **Zustand** (State Management)
- **React Router** (Navigation)
- **Lucide React** (Ícones)

### **Infraestrutura**
- **Deploy Backend**: Render.com
- **Deploy Frontend**: Vercel
- **Banco de Dados**: PostgreSQL (Render)
- **Desenvolvimento Local**: Docker + Docker Compose

---

## 🎮 **Como Usar a Aplicação (Produção)**

### **1. Acesse a Aplicação**
👉 **https://twitter-iota-sepia.vercel.app**

### **2. Crie sua Conta**
1. Clique em **"Sign up"**
2. Preencha seu **email** e **senha**
3. Confirme a senha
4. Clique em **"Cadastrar"**

### **3. Faça Login**
1. Use o email e senha cadastrados
2. Clique em **"Entrar"**

### **4. Como Seguir Usuários**
Como o feed mostra apenas tweets de quem você segue, primeiro você precisa seguir alguém:

1. Clique em **"Buscar"** no menu lateral
2. Digite o **email completo** ou parte dele de outro usuário
3. Clique em **"Seguir"** ao lado do usuário encontrado
4. Volte para **"Home"** 
5. ✅ Agora você verá os tweets dessa pessoa no seu feed!

### **5. Publicar um Tweet**
1. No campo **"What's happening?"** no topo
2. Digite sua mensagem
3. Clique em **"Tweet"**

### **6. Interagir com Posts**
- ❤️ **Curtir**: Clique no coração
- 💬 **Comentar**: Digite no campo abaixo do tweet
- 👤 **Seguir autor**: Clique no botão ao lado do nome

### **7. Editar seu Perfil**
1. Clique em **"Profile"** no menu
2. Altere **email**, **bio**, ou **senha**
3. Faça upload de uma **foto de perfil**
4. Clique em **"Salvar"**

---

## 📝 **Endpoints da API**

### **Autenticação**
- `POST /api/users/signup/` - Criar conta
- `POST /api/users/token/` - Login (obter JWT)
- `POST /api/users/token/refresh/` - Refresh token

### **Usuários**
- `GET /api/users/profile/` - Ver perfil do usuário logado
- `PATCH /api/users/profile/` - Atualizar perfil
- `GET /api/users/search/?q=<email>` - Buscar usuários por email
- `GET /api/users/followers-following/` - Ver seguidores e seguindo
- `POST /api/users/toggle-follow/<user_id>/` - Seguir/desseguir

### **Tweets**
- `GET /api/tweets/` - Listar tweets do feed
- `POST /api/tweets/` - Criar tweet
- `POST /api/tweets/<id>/like_tweet/` - Curtir/descurtir
- `GET /api/tweets/<id>/comments/` - Listar comentários
- `POST /api/tweets/<id>/add_comment/` - Adicionar comentário

---

## 🏗️ **Arquitetura**

```
┌─────────────────────────────────────┐
│   Frontend (Vercel)                 │
│   https://twitter-iota-sepia...     │
│                                     │
│   React + TypeScript + TailwindCSS  │
└──────────────┬──────────────────────┘
               │ HTTPS/REST API
               │ JWT Authentication
               ▼
┌─────────────────────────────────────┐
│   Backend API (Render)              │
│   https://twitter-b01m.onrender...  │
│                                     │
│   Django REST Framework             │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│   PostgreSQL Database (Render)      │
│                                     │
│   Usuários, Tweets, Comentários     │
└─────────────────────────────────────┘
```

---

## 📦 Como Executar Localmente

### **Pré-requisitos**
- Python 3.12+
- Node.js 18+
- Docker & Docker Compose
- Git

### **1. Clone o repositório**
```bash
git clone <repository-url>
cd twiter
```

### **2. Configure o Backend**
```bash
# Entre na pasta backend
cd backend

# Crie e ative o ambiente virtual
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate     # Windows

# Instale as dependências
pip install -r requirements.txt

# Inicie o PostgreSQL no Docker
docker-compose up -d db

# Execute as migrações
export $(cat .env.local | xargs) && python manage.py migrate

# Crie um superusuário
python manage.py createsuperuser

# Inicie o servidor
export $(cat .env.local | xargs) && python manage.py runserver 8001
```

### **3. Configure o Frontend**
```bash
# Em outro terminal, entre na pasta frontend
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### **4. Acesse a aplicação**
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8001
- **Admin Django**: http://localhost:8001/admin

## 📁 Estrutura do Projeto

```
twiter/
├── backend/                 # Backend Django
│   ├── twitter_clone/      # Configurações do Django
│   ├── users/              # App de usuários
│   ├── tweets/             # App de tweets
│   ├── docker-compose.yml  # PostgreSQL container
│   ├── requirements.txt    # Dependências Python
│   └── .env.local          # Variáveis de ambiente (dev)
│
├── frontend/               # Frontend React
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── hooks/          # Custom hooks
│   │   ├── config/         # Configurações (API endpoints)
│   │   └── routes/         # Roteamento
│   ├── package.json        # Dependências Node.js
│   └── tailwind.config.js  # Configuração do Tailwind
│
├── .gitignore              # Arquivos ignorados pelo Git
├── README.md               # Este arquivo
└── package.json            # Configuração geral do projeto
```

## 🚢 Deploy---

## ✅ **Requisitos da Atividade Atendidos**

- [x] **Sistema de Autenticação e Criação de Conta** ✅
  - Cadastro e login seguros com JWT
  - Gestão de sessões e tokens
  
- [x] **Configuração de Perfil** ✅
  - Alteração de foto de perfil, nome e senha
  - Todas as alterações são opcionais
  - Upload de imagens funcional
  
- [x] **Sistema de Seguir e Feed de Notícias** ✅
  - Seguir outros usuários
  - Ver lista de seguidos e seguidores
  - Feed mostra **apenas** postagens de quem você segue
  - Página de busca de usuários por email
  
- [x] **Interações nas Postagens** ✅
  - Curtidas em tweets
  - Comentários em posts
  - Contadores de interações
  
- [x] **Deploy e Entrega Final** ✅
  - Aplicação hospedada e online
  - Código no GitHub com instruções
  - README completo

---

## 🤝 Contribuição

Projeto desenvolvido como trabalho acadêmico - Clone educacional do Twitter.

## 📄 Licença

Este projeto está sob a licença MIT.

## 🏆 Desenvolvido com

- ❤️ **Django REST Framework** - Backend robusto
- ⚛️ **React + TypeScript** - Frontend moderno
- 🎨 **TailwindCSS** - Estilização profissional
- 🐘 **PostgreSQL** - Banco de dados confiável
- 🚀 **Render + Vercel** - Deploy em produção
- 🔐 **JWT** - Autenticação segura

---

## 📬 **Contato**

Projeto desenvolvido como trabalho acadêmico.

**GitHub**: https://github.com/Fryansb/Twitter

