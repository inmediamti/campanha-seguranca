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
| `VITE_CLICK_ENDPOINT` | URL que recebe o POST ao confirmar o form. Sem ela, o POST é ignorado. |
| `VITE_CAMPAIGN_ID` | Identificador da campanha enviado no body. |
| `VITE_SYSTEM_URL` | Destino do botão final da cartilha. |
| `VITE_REPORT_URL` | Canal para reportar mensagens suspeitas (ex.: `mailto:ti@inmediam.com.br`). |

## Contrato da API

Ao confirmar o form, é feito `POST` em `VITE_CLICK_ENDPOINT` com:

```json
{
  "campaign_id": "2024-q4-email-ti",
  "employee_email": "<valor do campo e-mail>"
}
```

- A senha digitada **nunca** sai do navegador — não é enviada ao backend.
- `Content-Type: application/json`, `mode: 'cors'`.
- Erros de rede são ignorados silenciosamente; o colaborador nunca vê mensagem de erro.
- Independente da resposta, o fluxo redireciona para `/aviso`.

O backend precisa liberar CORS para a origem onde o front estiver hospedado.

## Deploy na Vercel

Framework preset: **Vite**. Build command `npm run build`, output `dist`. As rotas de SPA já estão
cobertas por `vercel.json`. Configure as variáveis `VITE_*` no painel do projeto.
