# Ir Além 1 – Portal CardioIA

Portal de diagnóstico cardiológico desenvolvido com **React + Vite**, como parte da atividade *Ir Além 1* da FIAP (2TIAOA – Fase 2).

---

## Demonstração em vídeo

> 📹 **Link do vídeo no YouTube (não listado):** *https://youtu.be/S0kliamOEa8*

---

## Funcionalidades implementadas

| Requisito | Status |
|-----------|--------|
| Autenticação simulada com JWT fake no `localStorage` | ✅ |
| Context API (`AuthContext`) para estado global de autenticação | ✅ |
| Proteção de rotas com `ProtectedRoute` | ✅ |
| Listagem de pacientes via API fake (JSONPlaceholder `/users`) | ✅ |
| Formulário de agendamento com `useState` + `useReducer` | ✅ |
| Dashboard com métricas de pacientes e consultas | ✅ |
| Persistência de agendamentos no `localStorage` | ✅ |
| Estilização responsiva com CSS Modules | ✅ |
| Navegação com React Router DOM v6 | ✅ |

---

## Tecnologias utilizadas

- **React 18** – biblioteca de interface
- **Vite 5** – bundler e servidor de desenvolvimento
- **React Router DOM v6** – roteamento SPA
- **Context API** – gerenciamento de estado global (autenticação)
- **CSS Modules** – estilos encapsulados por componente
- **JSONPlaceholder** – API fake pública para listagem de pacientes
- **localStorage** – persistência de sessão e agendamentos

---

## Estrutura do projeto

```
frontend/
├── public/
│   └── heart.svg
├── src/
│   ├── contexts/
│   │   └── AuthContext.jsx       # Context API + JWT fake
│   ├── components/
│   │   ├── Header/               # Barra de navegação responsiva
│   │   ├── ProtectedRoute/       # HOC de proteção de rota
│   │   ├── MetricCard/           # Card de métrica para o dashboard
│   │   ├── PatientCard/          # Card de informações do paciente
│   │   └── AppointmentForm/      # Formulário com useReducer
│   ├── pages/
│   │   ├── Login/                # Tela de login
│   │   ├── Dashboard/            # Painel com métricas
│   │   ├── Patients/             # Listagem de pacientes
│   │   └── Appointments/         # Agendamentos (CRUD simulado)
│   ├── services/
│   │   ├── patientService.js     # Consumo da JSONPlaceholder API
│   │   └── appointmentService.js # CRUD de agendamentos (localStorage)
│   ├── App.jsx                   # Roteamento principal
│   └── main.jsx                  # Entry point React
├── index.html
├── package.json
└── vite.config.js
```

---

## Conceitos aplicados (apostilas)

### Fase 1 – Cap 05: Frontend Mágico
- Componentização e reuso de componentes React
- Hooks básicos: `useState`, `useEffect`
- Consumo de APIs com `fetch`
- Estilização responsiva com CSS

### Fase 2 – Cap 05: Interfaces Inteligentes com React e JWT
- **Context API** com `createContext` / `useContext` / `useReducer`
- **Autenticação simulada** com token JWT (Base64) no localStorage
- **Proteção de rotas** via componente `ProtectedRoute`
- **Hooks avançados**: `useReducer` no formulário de agendamentos
- **React Router DOM v6**: rotas aninhadas, `Navigate`, `useLocation`

---

## Instalação e execução

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- npm 9 ou superior (incluso no Node.js)

### Passos

```bash
# 1. Navegue até a pasta do projeto
cd frontend

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

O portal estará disponível em: **http://localhost:5173**

### Build para produção

```bash
npm run build
npm run preview   # visualizar o build local
```

---

## Credenciais de acesso (simuladas)

| Usuário  | Senha       | Perfil         |
|----------|-------------|----------------|
| `admin`  | `cardio123` | Administrador  |
| `medico` | `cardio123` | Médico         |

> ⚠️ As credenciais são apenas para fins didáticos. Nenhum dado real é transmitido.

---

## Arquitetura de autenticação

```
Login → AuthContext.login(user, pass)
      → gera fakeToken (header.payload.signature em Base64)
      → armazena em localStorage["cardioia_token"]
      → setUser({ username, name, role })

Reload → AuthContext useEffect
       → lê localStorage["cardioia_token"]
       → valida expiração (exp > now)
       → restaura estado do usuário

Rota protegida → <ProtectedRoute>
              → checa isAuthenticated
              → redireciona para /login se não autenticado
              → preserva URL de destino em location.state
```
