# AI Workforce OS

Base SaaS multi-workspace para vender automação com IA, recuperação de leads e operação omnichannel.

## O que entrou nesta versão

- configuração real de empresa por workspace
- nicho configurável
- idioma padrão + idiomas suportados
- destino/intenção dinâmicos
- leads com persistência por workspace
- fila de follow-up
- API para processar fila
- webhook de WhatsApp
- integrações por workspace
- base para billing com Stripe
- front page e dashboard reposicionados para produto vendável
- dependências ajustadas para Next 14 / React 18

## O que ainda precisa para operar de verdade

- credenciais do Supabase
- credenciais do WhatsApp Cloud API
- credenciais Meta para Instagram/Facebook
- credenciais Stripe
- rodar `supabase/schema.sql`
- configurar cron para `/api/queue/process`

## Rotas principais

- `GET /api/workspaces/current`
- `GET,POST /api/leads`
- `GET /api/integrations/status`
- `GET,POST /api/queue/process`
- `GET,POST /api/webhooks/whatsapp`
- `POST /api/billing/checkout`

## Como subir

1. Copie `.env.example` para `.env.local`
2. Preencha as credenciais
3. Rode o schema do Supabase
4. Suba na Vercel
5. Configure um cron para chamar `/api/queue/process` com `Authorization: Bearer {CRON_SECRET}`

## Observação honesta

O sistema agora está muito mais próximo de operação real, mas nenhum projeto fica 100% ativo sozinho sem as credenciais e a configuração externa das plataformas.
