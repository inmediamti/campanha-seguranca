const ENDPOINT = import.meta.env.VITE_CLICK_ENDPOINT
const CAMPAIGN_ID = import.meta.env.VITE_CAMPAIGN_ID || '2024-q4-email-ti'

export async function registrarAcesso(email) {
  if (!ENDPOINT) return
  try {
    await fetch(ENDPOINT, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        campaign_id: CAMPAIGN_ID,
        employee_email: email,
      }),
    })
  } catch {
    // A simulação nunca expõe erro ao colaborador.
  }
}
