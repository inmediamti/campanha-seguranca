import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ShieldCheck, Eye, EyeOff, Loader2, Clock, Lock } from 'lucide-react'
import { registrarAcesso } from '../lib/track.js'
import Brasao from '../components/Brasao.jsx'
import loginBg from '../assets/login-bg.jpg'

const DURACAO_SEGUNDOS = 20 * 60
const STORAGE_KEY = 'inm-contador-expira'

function gerarDeadline() {
  const ts = Date.now() + DURACAO_SEGUNDOS * 1000
  try {
    localStorage.setItem(STORAGE_KEY, String(ts))
  } catch {
    // localStorage indisponível (aba anônima): o contador segue sem persistir.
  }
  return ts
}

function deadlineInicial() {
  try {
    const salvo = Number(localStorage.getItem(STORAGE_KEY))
    if (salvo && salvo > Date.now()) return salvo
  } catch {
    // ignora leitura bloqueada
  }
  return gerarDeadline()
}

function segundosAte(deadline) {
  return Math.max(0, Math.round((deadline - Date.now()) / 1000))
}

function Contador() {
  const [deadline, setDeadline] = useState(deadlineInicial)
  const [restante, setRestante] = useState(() => segundosAte(deadline))

  useEffect(() => {
    const id = setInterval(() => {
      const seg = segundosAte(deadline)
      if (seg <= 0) {
        const novo = gerarDeadline()
        setDeadline(novo)
        setRestante(segundosAte(novo))
      } else {
        setRestante(seg)
      }
    }, 1000)
    return () => clearInterval(id)
  }, [deadline])

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
    <div
      className="relative flex min-h-screen flex-col items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-12"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <main className="w-full max-w-[440px] rounded-[20px] bg-white p-8 shadow-[0_24px_60px_-12px_rgba(120,70,0,0.25)] sm:p-10">
        <div className="mb-6 flex justify-center">
          <div className="flex items-center gap-2">
            <Brasao className="h-9 w-9" />
            <span className="text-xl font-bold tracking-tight text-ink">Mediam</span>
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
                Email <span className="text-brand-ink">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Insira seu email"
                autoComplete="username"
                className="h-10 w-full rounded border border-line-strong bg-white px-3 text-sm text-ink placeholder:text-placeholder focus:border-line focus:outline-none focus:ring-2 focus:ring-line"
              />
            </div>

            <div>
              <label htmlFor="senha" className="mb-2 block text-sm font-medium text-label">
                Senha <span className="text-brand-ink">*</span>
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
      </main>

      <footer className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 px-6 py-4 text-xs text-ink/70">
        <span>© 2026 InMediam. Todos os direitos reservados.</span>
        <span className="pointer-events-auto cursor-pointer hover:text-ink">Privacidade e termos</span>
      </footer>
    </div>
  )
}
