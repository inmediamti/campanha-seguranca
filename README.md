# Campanha de Segurança — InMediam

Aplicação interna de conscientização. Duas rotas:

- `/` — form de login do portal interno (simulação de segurança).
- `/aviso` — cartilha educativa exibida após o envio do form.

Stack: Vite + React + React Router + Tailwind CSS. Pronta para deploy na Vercel.

## Rodar localmente

```bash
cd /Users/pedro/inmediam/campanha-seguranca
npm install
cp .env.example .env      # ajuste as variáveis
npm run dev
```

Abre em `http://localhost:5173`. O fluxo: preencher o form em `/` → ao confirmar, dispara o POST para `VITE_CLICK_ENDPOINT` e redireciona para `/aviso`.

Outros comandos:

- `npm run build` — gera o `dist/` de produção.
- `npm run preview` — serve o build localmente.

## Variáveis de ambiente

Veja `.env.example`. Todas são opcionais em desenvolvimento:

| Variável | Para quê |
| --- | --- |
| `VITE_CLICK_ENDPOINT` | URL que recebe o POST. Sem ela, o POST é ignorado. Homologação: `https://hapi.inmediam.com.br/api/inmediam/phishing/click`. |
| `VITE_CAMPAIGN_ID` | Identificador da campanha enviado em `campaign_id`. |
| `VITE_SYSTEM_URL` | Destino do botão final da cartilha. |
| `VITE_REPORT_URL` | Canal para reportar mensagens suspeitas (ex.: `mailto:ti@inmediam.com.br`). |

## Contrato da API

Rota (PR `InMediam/inmediam_api#4908`): `POST /api/inmediam/phishing/click`, pública, throttle 20 req/min por IP.
Parâmetros em **query string**:

- `campaign_id` — obrigatório.
- `email` — obrigatório, e-mail do colaborador.
- `action` — `link_click` (na abertura da página, e-mail vindo do link) ou `form_submit` (ao enviar o form; default).

O front dispara:

- `link_click` no carregamento de `/`, quando há `?email=` na URL (vinda do link do e-mail).
- `form_submit` ao confirmar o form.

Detalhes:

- A senha digitada **nunca** sai do navegador — não é enviada ao backend (o backend tampouco a armazena).
- IP e User-Agent são capturados pelo backend; `mode: 'cors'`, requisição simples (sem header custom, evita preflight).
- Erros de rede são ignorados silenciosamente; o colaborador nunca vê mensagem de erro.
- Independente da resposta, o form redireciona para `/aviso`. Resposta esperada: `{ "success": true }`.
- Leitura dos resultados é direto no banco (`phishing_clicks`), sem rota GET.

O backend precisa liberar **CORS** para a origem do front (pendência registrada no PR: path `api/inmediam/phishing/*` + origin do app em `config/cors.php`).

## Deploy na Vercel

Framework preset: **Vite**. Build command `npm run build`, output `dist`. As rotas de SPA já estão
cobertas por `vercel.json`. Configure as variáveis `VITE_*` no painel do projeto.
