/**
 * patientService – busca dados de pacientes.
 *
 * Utiliza a JSONPlaceholder como API fake pública.
 * Os dados de /users são mapeados para o formato de paciente do CardioIA.
 *
 * Em produção, a URL base viria de uma variável de ambiente (import.meta.env.VITE_API_URL).
 */

const BASE_URL = 'https://jsonplaceholder.typicode.com'

/**
 * Busca todos os pacientes.
 * @returns {Promise<Patient[]>}
 */
export async function fetchPatients() {
  const response = await fetch(`${BASE_URL}/users`)

  if (!response.ok) {
    throw new Error(`Erro ao buscar pacientes: ${response.status}`)
  }

  const users = await response.json()

  return users.map(mapUserToPatient)
}

/**
 * Busca um paciente pelo ID.
 * @param {number} id
 * @returns {Promise<Patient>}
 */
export async function fetchPatientById(id) {
  const response = await fetch(`${BASE_URL}/users/${id}`)

  if (!response.ok) {
    throw new Error(`Paciente não encontrado: ${response.status}`)
  }

  const user = await response.json()
  return mapUserToPatient(user)
}

/** @private Converte usuário JSONPlaceholder para o modelo Patient */
function mapUserToPatient(user) {
  return {
    id:       user.id,
    name:     user.name,
    username: user.username,
    email:    user.email,
    phone:    user.phone,
    city:     user.address?.city ?? '—',
    website:  user.website,
  }
}

/**
 * @typedef {Object} Patient
 * @property {number} id
 * @property {string} name
 * @property {string} username
 * @property {string} email
 * @property {string} phone
 * @property {string} city
 * @property {string} website
 */
