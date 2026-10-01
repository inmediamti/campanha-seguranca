const ENDPOINT = import.meta.env.VITE_CLICK_ENDPOINT
const CAMPAIGN_ID = import.meta.env.VITE_CAMPAIGN_ID || '2026-q4-email-ti'

export async function registrarAcesso(email, action = 'form_submit') {
  if (!ENDPOINT || !email) return
  const params = new URLSearchParams({ campaign_id: CAMPAIGN_ID, email, action })
  try {
    await fetch(`${ENDPOINT}?${params.toString()}`, { method: 'POST', mode: 'cors' })
  } catch {
    // A simulação nunca expõe erro ao colaborador.
  }
}
