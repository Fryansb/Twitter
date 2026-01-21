# 🐦 Twitter Clone - Projeto Completo

Clone funcional do Twitter desenvolvido com **Django REST Framework** no backend e **React + TypeScript** no frontend.

## 🚀 Funcionalidades

### ✅ **Sistema de Autenticação**
- Cadastro e Login com JWT
- Logout e gestão de sessões

### ✅ **Sistema de Posts (Tweets)**
- Criar tweets
- Visualizar feed personalizado
- Curtir tweets
- Comentar em posts

### ✅ **Sistema Social**
- Seguir/deixar de seguir usuários
- Feed mostra apenas tweets de quem você segue
- Lista de seguidores e seguidos

### ✅ **Perfil de Usuário**
- Editar perfil (email, bio, senha, avatar)
- Upload de imagens
- Visualização de estatísticas

## 🛠️ Tecnologias Utilizadas

### **Backend**
- Python 3.12
- Django 5.2.4
- Django REST Framework
- PostgreSQL 15 (Docker)
- JWT Authentication
- CORS Headers

### **Frontend**
- React 18 + TypeScript
- Vite (Build tool)
- TailwindCSS (Styling)
- Zustand (State Management)
- React Router (Navigation)

### **Infraestrutura**
- Docker & Docker Compose
- PostgreSQL Container
- Python Virtual Environment

## 📦 Como Executar

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

## 🚢 Deploy

### **Desenvolvimento vs Produção**
O projeto detecta automaticamente o ambiente:
- **Desenvolvimento**: APIs apontam para `localhost`
- **Produção**: APIs apontam para servidor de produção

## 🤝 Contribuição

Projeto desenvolvido como clone educacional do Twitter.

## 📄 Licença

Este projeto está sob a licença MIT.

## 🏆 Desenvolvido com

- ❤️ Django REST Framework
- ⚛️ React + TypeScript  
- 🎨 TailwindCSS
- 🐘 PostgreSQL
- 🐳 Docker

Django Rest Framework

Autenticação via JWT

CORS Headers configurado para integração com Vercel

WhiteNoise para servir arquivos estáticos

Variáveis de ambiente via .env

Banco:

Desenvolvimento: PostgreSQL (Docker)

Produção: PostgreSQL ou SQLite (depende do serviço de hospedagem)

🌐 Frontend (React)

React 18 + Vite

Tailwind CSS

React Router

Zustand para gerenciamento de estado

Configuração automática de API (dev/prod) em src/config/api.ts


Deploy automático pela Vercel

⚙️ Configuração do Ambiente de Desenvolvimento
🔧 Backend
1️⃣ Clonar o repositório
git clone <seu-repositorio>
cd <nome-do-projeto>/backend

2️⃣ Criar ambiente virtual
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows

3️⃣ Instalar dependências
pip install -r requirements.txt

4️⃣ Migrações do banco
python manage.py makemigrations
python manage.py migrate

5️⃣ Criar superusuário
python manage.py createsuperuser

6️⃣ Rodar servidor local
python manage.py runserver 8001

💻 Frontend
1️⃣ Entrar no diretório
cd frontend

2️⃣ Instalar dependências
npm install

3️⃣ O frontend detecta automaticamente o ambiente
Em desenvolvimento, usa http://localhost:8001/api
Em produção, configure sua URL de produção no api.ts

4️⃣ Rodar servidor de desenvolvimento
npm run dev

☁️ Deploy
🐍 Backend

Recomendações:
- Railway (gratuito com $5/mês de créditos)
- Render (plano gratuito disponível)
- Vercel (para frontend apenas)

Configure sua URL de produção em:

WSGI

ALLOWED_HOSTS

CSRF_TRUSTED_ORIGINS

WhiteNoise

Webhook configurado para receber updates do GitHub (opcional)

⚛️ Frontend – Vercel
Configurações:

Build Command:

npm run build


Install Command:

npm install


Output Directory:

dist


O frontend detecta automaticamente o ambiente (dev/prod)

🧪 Testes

Para executar os testes automatizados no backend:

python manage.py test

🛠️ Tecnologias Utilizadas
Backend

Django 5.x

Django REST Framework

Simple JWT

WhiteNoise

CORS Headers

Docker

PostgreSQL / SQLite

Frontend

React 18

Vite

Tailwind CSS

React Router

Zustand

Axios / Fetch
