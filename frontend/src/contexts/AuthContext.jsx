import { createContext, useContext, useState, useEffect } from 'react'

/**
 * AuthContext – autenticação simulada com JWT fake armazenado no localStorage.
 *
 * O "token" é um payload JSON codificado em Base64 (simulando um JWT real).
 * Inclui: nome do usuário, iat (issued at) e exp (expiration).
 *
 * Em produção, este fluxo seria substituído por uma chamada real de autenticação
 * ao back-end, que devolveria um JWT assinado com algoritmo RS256/HS256.
 */

const AuthContext = createContext(null)

const TOKEN_KEY = 'cardioia_token'

// Credenciais simuladas (em produção viriam do back-end)
const MOCK_USERS = [
  { username: 'admin',  password: 'cardio123', name: 'Dr. Admin',      role: 'admin'  },
  { username: 'medico', password: 'cardio123', name: 'Dr. João Silva',  role: 'doctor' },
]

/** Gera um token Base64 simulando a estrutura de um JWT (header.payload.signature) */
function generateFakeToken(user) {
  const header  = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = btoa(JSON.stringify({
    sub:  user.username,
    name: user.name,
    role: user.role,
    iat:  Math.floor(Date.now() / 1000),
    exp:  Math.floor(Date.now() / 1000) + 3600, // expira em 1 hora
  }))
  const signature = btoa(`${header}.${payload}.cardioia-secret`)
  return `${header}.${payload}.${signature}`
}

/** Decodifica o payload do token sem validar assinatura (simulação) */
function decodeToken(token) {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    return JSON.parse(atob(parts[1]))
  } catch {
    return null
  }
}

/** Verifica se o token está dentro do prazo de validade */
function isTokenValid(token) {
  const payload = decodeToken(token)
  if (!payload) return false
  return payload.exp > Math.floor(Date.now() / 1000)
}

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  // Ao montar, tenta restaurar a sessão a partir do localStorage
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token && isTokenValid(token)) {
      const payload = decodeToken(token)
      setUser({ username: payload.sub, name: payload.name, role: payload.role })
    } else {
      localStorage.removeItem(TOKEN_KEY)
    }
    setLoading(false)
  }, [])

  /**
   * Realiza o login simulado.
   * @throws {Error} se as credenciais forem inválidas
   */
  function login(username, password) {
    const found = MOCK_USERS.find(
      (u) => u.username === username && u.password === password
    )
    if (!found) {
      throw new Error('Usuário ou senha inválidos.')
    }
    const token = generateFakeToken(found)
    localStorage.setItem(TOKEN_KEY, token)
    setUser({ username: found.username, name: found.name, role: found.role })
  }

  /** Encerra a sessão e remove o token do localStorage */
  function logout() {
    localStorage.removeItem(TOKEN_KEY)
    setUser(null)
  }

  /** Retorna o token armazenado (útil para chamadas autenticadas a serviços) */
  function getToken() {
    return localStorage.getItem(TOKEN_KEY)
  }

  const value = {
    user,
    loading,
    login,
    logout,
    getToken,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/** Hook para consumir o contexto de autenticação */
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth deve ser usado dentro de <AuthProvider>')
  return ctx
}
