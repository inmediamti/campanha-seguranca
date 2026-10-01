import {
  ShieldAlert,
  Mail,
  Link2,
  KeyRound,
  ArrowDown,
  UserCheck,
  MousePointerClick,
  Clock,
  HelpCircle,
  Hand,
  Search,
  PhoneCall,
  MessageSquare,
  Smartphone,
  QrCode,
  Globe,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import Quiz from '../components/Quiz.jsx'
import Brasao from '../components/Brasao.jsx'

const SYSTEM_URL = import.meta.env.VITE_SYSTEM_URL || 'https://www.inmediam.com.br'

const SINAIS = [
  {
    icon: UserCheck,
    titulo: 'Confira quem enviou',
    texto:
      'Não olhe apenas o nome que aparece no remetente. Confira o endereço completo do e-mail. Um nome conhecido pode esconder um endereço que não pertence à empresa.',
  },
  {
    icon: Link2,
    titulo: 'Confira o link',
    texto:
      'Antes de clicar, verifique para onde o link realmente leva. Se o endereço parecer estranho ou diferente do site oficial, não acesse.',
    destaque: 'Passe o mouse sobre o link antes de clicar.',
  },
  {
    icon: KeyRound,
    titulo: 'Desconfie de pedidos de senha',
    texto:
      'Uma mensagem nunca deve ser motivo suficiente para você informar sua senha. Tenha atenção especial quando pedirem senha, código de acesso ou dados pessoais.',
    destaque: 'Nunca informe sua senha porque uma mensagem pediu.',
  },
  {
    icon: Clock,
    titulo: 'Cuidado com mensagens urgentes',
    texto:
      'Fraudes tentam fazer você agir sem pensar. Fique atento a mensagens dizendo que sua conta será bloqueada ou que você precisa agir imediatamente.',
  },
  {
    icon: HelpCircle,
    titulo: 'Pergunte: eu estava esperando isso?',
    texto:
      'Pare por alguns segundos. Se você não esperava aquela solicitação, confirme por outro canal antes de continuar.',
  },
]

const ETAPAS = [
  { n: '1', titulo: 'PARE', icon: Hand, texto: 'Não clique imediatamente. Leia a mensagem com atenção.' },
  {
    n: '2',
    titulo: 'VERIFIQUE',
    icon: Search,
    texto: 'Confira o remetente, o endereço do link, o conteúdo e o motivo da solicitação.',
  },
  {
    n: '3',
    titulo: 'CONFIRME',
    icon: PhoneCall,
    texto:
      'Na dúvida, procure a pessoa ou o setor responsável usando um canal que você já conhece.',
  },
]

const CANAIS = [
  { icon: Mail, label: 'E-mail' },
  { icon: MessageSquare, label: 'WhatsApp' },
  { icon: Smartphone, label: 'SMS' },
  { icon: MessageSquare, label: 'Microsoft Teams' },
  { icon: Globe, label: 'Redes sociais' },
  { icon: QrCode, label: 'QR Codes' },
  { icon: PhoneCall, label: 'Ligações' },
  { icon: Globe, label: 'Sites falsos' },
]

const FLUXO = [
  { icon: Mail, label: 'Mensagem recebida' },
  { icon: MousePointerClick, label: 'Link acessado' },
  { icon: KeyRound, label: 'Solicitação de senha' },
  { icon: ShieldAlert, label: 'Sinal de alerta' },
]

function SectionTitle({ children, sub }) {
  return (
    <div className="mb-8 text-center">
      <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">{children}</h2>
      {sub && <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted">{sub}</p>}
    </div>
  )
}

export default function Aviso() {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-10 border-b border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Brasao className="h-8 w-8" />
            <span className="text-lg font-bold tracking-tight text-ink">Mediam</span>
          </div>
          <span className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-muted">
            Programa de Segurança Corporativa
          </span>
        </div>
      </header>

      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center sm:py-20">
          <Reveal>
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft">
              <ShieldAlert className="h-7 w-7 text-brand-ink" strokeWidth={1.75} />
            </div>
            <span className="inline-block rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-ink">
              Simulação de segurança
            </span>
            <h1 className="relative mt-5 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
              <span
                className="absolute inset-0 -z-10 mx-auto max-w-lg"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(250,197,21,0.22), transparent 70%)',
                }}
              />
              Desta vez foi um teste.{' '}
              <span className="bg-brand/60 box-decoration-clone px-1">
                Da próxima, pode ser de verdade.
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted">
              Esta página foi criada pela própria equipe de TI, apenas para treinamento. Ninguém
              está sendo avaliado ou punido, e nenhum dado seu foi comprometido.
            </p>
            <div className="mx-auto mt-6 max-w-xl rounded-card border-l-4 border-brand-hover bg-brand-soft px-5 py-4 text-left">
              <p className="text-sm font-semibold leading-relaxed text-ink">
                Fique atento: criminosos — e até outras empresas — podem montar uma página idêntica
                a esta para roubar suas senhas e seus dados.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Hoje foi só um exercício. Na próxima vez pode ser de verdade, por isso{' '}
                <strong className="font-semibold text-ink">
                  nunca informe sua senha ou seus dados de acesso em uma tela aberta a partir de um
                  link
                </strong>
                , por mais real e urgente que a mensagem pareça.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <Reveal>
          <SectionTitle
            sub="Você recebeu uma mensagem que simulava uma comunicação legítima da empresa e foi direcionado para uma página de acesso. Em uma situação real, páginas como essa podem ser usadas para tentar capturar senhas e outras informações."
          >
            O que aconteceu?
          </SectionTitle>
        </Reveal>

        <Reveal>
          <div className="mx-auto flex max-w-xl flex-col items-center gap-3">
            {FLUXO.map((etapa, i) => (
              <div key={i} className="flex w-full flex-col items-center gap-3">
                <div className="flex w-full items-center gap-4 rounded-card border border-line bg-white px-5 py-4 shadow-subtle">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface">
                    <etapa.icon className="h-5 w-5 text-brand-ink" strokeWidth={1.75} />
                  </div>
                  <span className="text-sm font-medium text-ink">{etapa.label}</span>
                </div>
                {i < FLUXO.length - 1 && (
                  <ArrowDown className="h-4 w-4 text-disabled" strokeWidth={2} />
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <Reveal>
            <SectionTitle sub="Cinco sinais que ajudam a reconhecer uma mensagem suspeita antes de agir.">
              5 sinais de alerta
            </SectionTitle>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {SINAIS.map((sinal, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="h-full rounded-card border border-line bg-white p-6 shadow-subtle">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft">
                    <sinal.icon className="h-5 w-5 text-brand-ink" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-base font-semibold text-ink">{sinal.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{sinal.texto}</p>
                  {sinal.destaque && (
                    <p className="mt-3 rounded border-l-2 border-brand-hover bg-brand-soft px-3 py-2 text-sm font-medium text-ink">
                      {sinal.destaque}
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <Reveal>
          <SectionTitle sub="Uma regra simples para qualquer mensagem que pedir uma ação ou um dado seu.">
            Pare. Verifique. Confirme.
          </SectionTitle>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-3">
          {ETAPAS.map((etapa, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="h-full rounded-card border border-line bg-white p-6 text-center shadow-subtle">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand text-ink">
                  <etapa.icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <p className="text-xs font-semibold text-placeholder">PASSO {etapa.n}</p>
                <h3 className="mt-1 text-lg font-bold tracking-tight text-ink">{etapa.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{etapa.texto}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <Reveal>
            <SectionTitle sub="O formato muda, mas o objetivo pode ser o mesmo: fazer você confiar em uma mensagem e fornecer informações ou realizar uma ação que não deveria.">
              Esses golpes chegam de várias formas
            </SectionTitle>
          </Reveal>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {CANAIS.map((canal, i) => (
              <Reveal key={i} delay={i * 40}>
                <div className="flex items-center gap-3 rounded-card border border-line bg-white px-4 py-3 shadow-subtle">
                  <canal.icon className="h-5 w-5 shrink-0 text-brand-ink" strokeWidth={1.75} />
                  <span className="text-sm font-medium text-ink">{canal.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <Reveal>
          <SectionTitle sub="3 perguntas rápidas para fixar o que você aprendeu.">
            Teste seu conhecimento
          </SectionTitle>
        </Reveal>
        <Reveal>
          <Quiz />
        </Reveal>
      </section>

      <section className="border-y border-line bg-surface px-6 py-16 text-center">
        <div className="mx-auto max-w-3xl">
          <Reveal>
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft">
            <ShieldCheck className="h-7 w-7 text-brand-ink" strokeWidth={1.75} />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Segurança começa com atenção
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
            Mensagens fraudulentas podem parecer muito reais. Antes de clicar, pare por alguns
            segundos e verifique. Na dúvida, não informe seus dados e procure a equipe de TI.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm font-medium leading-relaxed text-ink">
            Errar em uma simulação é uma oportunidade de aprender. O importante é reconhecer os
            sinais quando uma situação real acontecer.
          </p>
          <a
            href={SYSTEM_URL}
            className="mt-8 inline-flex h-11 items-center gap-2 rounded bg-brand px-6 text-sm font-semibold text-ink transition-colors hover:bg-brand-hover"
          >
            Ir para o sistema InMediam
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </a>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-line bg-white">
        <div className="mx-auto max-w-5xl px-6 py-8 text-center">
          <p className="text-xs text-placeholder">
            InMediam — Programa Interno de Segurança da Informação · Uso exclusivo interno
          </p>
        </div>
      </footer>
    </div>
  )
}
