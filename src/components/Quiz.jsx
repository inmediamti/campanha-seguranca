import { useState } from 'react'
import { Check, X, RotateCcw } from 'lucide-react'

const PERGUNTAS = [
  {
    pergunta:
      "Um e-mail do 'suporte de TI' pede sua senha com urgência. O que você faz?",
    opcoes: [
      { texto: 'Forneço rapidamente para não perder o acesso', correta: false },
      { texto: 'Encaminho para o time de TI real sem clicar em nada', correta: true },
      { texto: 'Clico no link para ver do que se trata', correta: false },
    ],
    explicacao:
      'Nenhum sistema legítimo pede sua senha por e-mail. Na dúvida, confirme com a TI por um canal que você já conhece.',
  },
  {
    pergunta: 'Como verificar se um link é seguro antes de clicar?',
    opcoes: [
      { texto: 'Ver se o e-mail parece profissional', correta: false },
      { texto: 'Passar o mouse sobre o link e verificar o endereço real', correta: true },
      { texto: 'Clicar e ver se abre normalmente', correta: false },
    ],
    explicacao:
      'A aparência engana. Passe o mouse sobre o link e confira para onde ele realmente aponta antes de clicar.',
  },
  {
    pergunta: 'Qual desses é um sinal claro de uma mensagem fraudulenta?',
    opcoes: [
      { texto: 'E-mail com o logo da empresa', correta: false },
      { texto: 'Remetente com domínio diferente do oficial', correta: true },
      { texto: 'E-mail com o seu nome', correta: false },
    ],
    explicacao:
      'Logo e nome são fáceis de copiar. O endereço completo do remetente é um dos sinais mais confiáveis.',
  },
]

export default function Quiz() {
  const [indice, setIndice] = useState(0)
  const [selecionada, setSelecionada] = useState(null)
  const [acertos, setAcertos] = useState(0)
  const [finalizado, setFinalizado] = useState(false)

  const atual = PERGUNTAS[indice]

  function responder(i) {
    if (selecionada !== null) return
    setSelecionada(i)
    if (atual.opcoes[i].correta) setAcertos((a) => a + 1)
  }

  function proxima() {
    if (indice + 1 < PERGUNTAS.length) {
      setIndice((i) => i + 1)
      setSelecionada(null)
    } else {
      setFinalizado(true)
    }
  }

  function reiniciar() {
    setIndice(0)
    setSelecionada(null)
    setAcertos(0)
    setFinalizado(false)
  }

  if (finalizado) {
    const pct = Math.round((acertos / PERGUNTAS.length) * 100)
    return (
      <div className="rounded-card border border-line bg-white p-8 text-center shadow-subtle">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-ok-soft">
          <Check className="h-7 w-7 text-ok" strokeWidth={2} />
        </div>
        <p className="text-sm font-medium text-muted">Você acertou</p>
        <p className="my-1 text-4xl font-bold text-ink">{pct}%</p>
        <p className="text-sm text-muted">
          {acertos} de {PERGUNTAS.length} perguntas
        </p>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
          {pct === 100
            ? 'Excelente! Você reconheceu todos os sinais. Continue atento no dia a dia.'
            : 'Bom trabalho. O importante é reconhecer os sinais quando uma situação real acontecer.'}
        </p>
        <button
          onClick={reiniciar}
          className="mt-6 inline-flex h-10 items-center gap-2 rounded border border-line-strong bg-white px-4 text-sm font-semibold text-ink hover:bg-surface-alt"
        >
          <RotateCcw className="h-4 w-4" strokeWidth={1.75} />
          Refazer
        </button>
      </div>
    )
  }

  const respondida = selecionada !== null

  return (
    <div className="rounded-card border border-line bg-white p-6 shadow-subtle sm:p-8">
      <div className="mb-5 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-placeholder">
          Pergunta {indice + 1} de {PERGUNTAS.length}
        </span>
        <div className="flex gap-1.5">
          {PERGUNTAS.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-6 rounded-full ${i <= indice ? 'bg-brand' : 'bg-line'}`}
            />
          ))}
        </div>
      </div>

      <h3 className="text-base font-semibold text-ink">{atual.pergunta}</h3>

      <div className="mt-4 space-y-2.5">
        {atual.opcoes.map((op, i) => {
          const escolhida = selecionada === i
          let estilo = 'border-line bg-white hover:bg-surface'
          if (respondida && op.correta) estilo = 'border-ok bg-ok-soft'
          else if (respondida && escolhida && !op.correta)
            estilo = 'border-danger bg-danger-soft'
          return (
            <button
              key={i}
              onClick={() => responder(i)}
              disabled={respondida}
              className={`flex w-full items-center justify-between gap-3 rounded-card border px-4 py-3 text-left text-sm text-ink transition-colors ${estilo} ${
                respondida ? 'cursor-default' : ''
              }`}
            >
              <span>{op.texto}</span>
              {respondida && op.correta && (
                <Check className="h-4 w-4 shrink-0 text-ok" strokeWidth={2.5} />
              )}
              {respondida && escolhida && !op.correta && (
                <X className="h-4 w-4 shrink-0 text-danger" strokeWidth={2.5} />
              )}
            </button>
          )
        })}
      </div>

      {respondida && (
        <div className="mt-4 rounded-card bg-surface p-4 text-sm leading-relaxed text-muted">
          {atual.explicacao}
        </div>
      )}

      {respondida && (
        <button
          onClick={proxima}
          className="mt-5 h-10 w-full rounded bg-brand text-sm font-semibold text-ink transition-colors hover:bg-brand-hover"
        >
          {indice + 1 < PERGUNTAS.length ? 'Próxima pergunta' : 'Ver resultado'}
        </button>
      )}
    </div>
  )
}
