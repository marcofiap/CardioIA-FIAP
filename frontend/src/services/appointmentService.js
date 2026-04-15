/**
 * appointmentService – gerencia agendamentos de consultas.
 *
 * Como não há back-end real, os dados são persistidos no localStorage.
 * O serviço inicializa com dados de exemplo na primeira execução.
 */

const STORAGE_KEY = 'cardioia_appointments'

/** Dados iniciais de exemplo */
const SEED_APPOINTMENTS = [
  {
    id: 1,
    patientName: 'João Pedro Alves',
    date: '2026-04-15',
    time: '09:00',
    type: 'Consulta',
    doctor: 'Dr. Admin',
    notes: 'Paciente com histórico de hipertensão.',
    status: 'agendada',
    createdAt: '2026-04-10T08:00:00.000Z',
  },
  {
    id: 2,
    patientName: 'Maria Clara Santos',
    date: '2026-04-16',
    time: '10:30',
    type: 'Eletrocardiograma',
    doctor: 'Dr. João Silva',
    notes: '',
    status: 'agendada',
    createdAt: '2026-04-10T09:30:00.000Z',
  },
  {
    id: 3,
    patientName: 'Carlos Eduardo Lima',
    date: '2026-04-14',
    time: '14:00',
    type: 'Retorno',
    doctor: 'Dr. Admin',
    notes: 'Avaliar resultado de exames.',
    status: 'concluída',
    createdAt: '2026-04-08T11:00:00.000Z',
  },
  {
    id: 4,
    patientName: 'Ana Beatriz Ferreira',
    date: '2026-04-18',
    time: '08:00',
    type: 'Ecocardiograma',
    doctor: 'Dra. Ana Costa',
    notes: '',
    status: 'agendada',
    createdAt: '2026-04-11T14:20:00.000Z',
  },
  {
    id: 5,
    patientName: 'Roberto Nascimento',
    date: '2026-04-13',
    time: '16:00',
    type: 'Exame',
    doctor: 'Dr. Pedro Lima',
    notes: 'Exame de sangue periódico.',
    status: 'cancelada',
    createdAt: '2026-04-09T10:00:00.000Z',
  },
]

/**
 * Retorna todos os agendamentos.
 * Se ainda não houver dados no localStorage, inicializa com SEED_APPOINTMENTS.
 * @returns {Appointment[]}
 */
export function getAppointments() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    saveAppointments(SEED_APPOINTMENTS)
    return SEED_APPOINTMENTS
  }
  return JSON.parse(stored)
}

/**
 * Persiste a lista de agendamentos no localStorage.
 * @param {Appointment[]} appointments
 */
export function saveAppointments(appointments) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments))
}

/**
 * Adiciona um novo agendamento e persiste.
 * @param {Appointment} appointment
 * @param {Appointment[]} current – lista atual
 * @returns {Appointment[]} nova lista
 */
export function addAppointment(appointment, current) {
  const updated = [...current, appointment]
  saveAppointments(updated)
  return updated
}

/**
 * Remove um agendamento pelo id e persiste.
 * @param {number} id
 * @param {Appointment[]} current
 * @returns {Appointment[]} nova lista
 */
export function removeAppointment(id, current) {
  const updated = current.filter((a) => a.id !== id)
  saveAppointments(updated)
  return updated
}

/**
 * Atualiza o status de um agendamento e persiste.
 * @param {number} id
 * @param {string} status
 * @param {Appointment[]} current
 * @returns {Appointment[]}
 */
export function updateAppointmentStatus(id, status, current) {
  const updated = current.map((a) => (a.id === id ? { ...a, status } : a))
  saveAppointments(updated)
  return updated
}

/**
 * @typedef {Object} Appointment
 * @property {number} id
 * @property {string} patientName
 * @property {string} date
 * @property {string} time
 * @property {string} type
 * @property {string} doctor
 * @property {string} notes
 * @property {'agendada'|'concluída'|'cancelada'} status
 * @property {string} createdAt
 */
