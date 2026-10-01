import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ShieldCheck, Eye, EyeOff, Loader2, Clock, Lock } from 'lucide-react'
import { registrarAcesso } from '../lib/track.js'
import Brasao from '../components/Brasao.jsx'

function Contador({ segundosIniciais = 20 * 60 }) {
  const [restante, setRestante] = useState(segundosIniciais)

  useEffect(() => {
    const id = setInterval(() => setRestante((s) => (s <= 0 ? 0 : s - 1)), 1000)
    return () => clearInterval(id)
  }, [])

  const mm = String(Math.floor(restante / 60)).padStart(2, '0')
  const ss = String(restante % 60).padStart(2, '0')

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-danger-soft px-3 py-1 text-xs font-medium text-danger">
      <Clock className="h-3.5 w-3.5" strokeWidth={2} />
      Esta solicitação expira em
      <span className="font-semibold tabular-nums">
        {mm}:{ss}
      </span>
    </span>
  )
}

export default function Login() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [email, setEmail] = useState(searchParams.get('email') || '')
  const [senha, setSenha] = useState('')
  const [verSenha, setVerSenha] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const cliqueRegistrado = useRef(false)

  useEffect(() => {
    const emailDoLink = searchParams.get('email')
    if (emailDoLink && !cliqueRegistrado.current) {
      cliqueRegistrado.current = true
      registrarAcesso(emailDoLink, 'link_click')
    }
  }, [searchParams])

  async function handleSubmit(e) {
    e.preventDefault()
    if (enviando) return
    setEnviando(true)

    registrarAcesso(email, 'form_submit')

    await new Promise((r) => setTimeout(r, 1000))
    navigate('/aviso')
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <header className="w-full border-b border-line bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Brasao className="h-8 w-8" />
            <span className="text-lg font-bold tracking-tight text-ink">Mediam</span>
          </div>
          <span className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-muted">
            Portal Interno
          </span>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-[420px] rounded-card border border-line bg-white p-8 shadow-subtle">
          <div className="mb-6 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft">
              <ShieldCheck className="h-6 w-6 text-brand-ink" strokeWidth={1.75} />
            </div>
          </div>

          <h1 className="text-center text-xl font-bold text-ink">Atualização de Segurança</h1>
          <p className="mt-2 text-center text-sm leading-relaxed text-muted">
            O time de TI identificou uma atualização necessária nas credenciais de acesso.
            Confirme seus dados para manter o acesso ativo aos sistemas internos.
          </p>

          <div className="mt-4 flex justify-center">
            <Contador />
          </div>

          <div className="my-6 h-px w-full bg-line" />

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-label">
                E-mail corporativo <span className="text-brand-ink">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@inmediam.com.br"
                autoComplete="username"
                className="h-10 w-full rounded border border-line-strong bg-white px-3 text-sm text-ink placeholder:text-placeholder focus:border-line focus:outline-none focus:ring-2 focus:ring-line"
              />
            </div>

            <div>
              <label htmlFor="senha" className="mb-2 block text-sm font-medium text-label">
                Senha atual <span className="text-brand-ink">*</span>
              </label>
              <div className="relative">
                <input
                  id="senha"
                  type={verSenha ? 'text' : 'password'}
                  required
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="h-10 w-full rounded border border-line-strong bg-white px-3 pr-10 text-sm text-ink placeholder:text-placeholder focus:border-line focus:outline-none focus:ring-2 focus:ring-line"
                />
                <button
                  type="button"
                  onClick={() => setVerSenha((v) => !v)}
                  aria-label={verSenha ? 'Ocultar senha' : 'Mostrar senha'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-placeholder hover:text-muted"
                >
                  {verSenha ? (
                    <EyeOff className="h-4 w-4" strokeWidth={1.75} />
                  ) : (
                    <Eye className="h-4 w-4" strokeWidth={1.75} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={enviando}
              className="flex h-10 w-full items-center justify-center gap-2 rounded bg-brand text-sm font-semibold text-ink transition-colors hover:bg-brand-hover disabled:bg-surface-alt disabled:text-disabled"
            >
              {enviando && <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />}
              Confirmar acesso
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-2 border-t border-line pt-4">
            <ShieldCheck className="h-4 w-4 text-ok" strokeWidth={1.75} />
            <span className="text-xs text-muted">Conexão segura e verificada</span>
            <span className="text-line">·</span>
            <Lock className="h-3.5 w-3.5 text-muted" strokeWidth={1.75} />
            <span className="text-xs text-muted">Ambiente interno InMediam</span>
          </div>
        </div>
      </main>
    </div>
  )
}
