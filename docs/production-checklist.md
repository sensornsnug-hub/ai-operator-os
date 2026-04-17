# Production Checklist

## Infra
- [ ] Criar projeto Supabase
- [ ] Rodar `supabase/schema.sql`
- [ ] Configurar variáveis no Vercel
- [ ] Configurar `CRON_SECRET`
- [ ] Agendar cron em `/api/queue/process`

## Canais
- [ ] Conectar WhatsApp Cloud API
- [ ] Validar webhook em `/api/webhooks/whatsapp`
- [ ] Conectar Meta Instagram/Facebook

## Billing
- [ ] Inserir chaves Stripe
- [ ] Substituir stub de `/api/billing/checkout` pela SDK real
- [ ] Criar webhook Stripe

## Workspace
- [ ] Definir empresa por workspace
- [ ] Definir nicho
- [ ] Definir idioma padrão e idiomas suportados
- [ ] Definir labels dinâmicos de destino e intenção
