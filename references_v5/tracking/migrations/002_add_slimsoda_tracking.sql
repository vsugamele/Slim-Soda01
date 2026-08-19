-- ============================================================
-- MIGRATION 002 v2: Add project_slug + 14 attribution columns
-- Project: SlimSoda / Cardio Clear tracking
-- Database: tkbivipqiewkfnhktmqq (DB1)
-- Author: Mavis (MiniMax Code)
-- Date: 2026-08-19 (v2: corrige bug onde imphq_clicks não tinha visitor_id/session_id)
--
-- Idempotente: usa IF NOT EXISTS em TUDO. Pode rodar múltiplas vezes.
-- Seguro rodar em banco que já teve migration parcial.
--
-- Como rodar:
--   1. Supabase Dashboard > SQL Editor
--   2. Cola todo este arquivo
--   3. Click "Run" (Ctrl+Enter)
--   4. Espera ~5s
-- ============================================================

-- ============================================================
-- PARTE 0: Adicionar colunas base de tracking (visitor_id, session_id)
-- em TODAS as tabelas que faltam
-- ============================================================
-- imphq_events já tem visitor_id, session_id (confirmado)
-- Mas garante com IF NOT EXISTS:
ALTER TABLE public.imphq_events ADD COLUMN IF NOT EXISTS visitor_id text;
ALTER TABLE public.imphq_events ADD COLUMN IF NOT EXISTS session_id text;

-- imphq_clicks NÃO tem visitor_id nem session_id (era o bug)
ALTER TABLE public.imphq_clicks ADD COLUMN IF NOT EXISTS visitor_id text;
ALTER TABLE public.imphq_clicks ADD COLUMN IF NOT EXISTS session_id text;

-- imphq_leads não tem
ALTER TABLE public.imphq_leads  ADD COLUMN IF NOT EXISTS visitor_id text;
ALTER TABLE public.imphq_leads  ADD COLUMN IF NOT EXISTS session_id text;

-- imphq_vendas não tem (mas vendas é por lead_id; visitor_id é opcional aqui)
ALTER TABLE public.imphq_vendas ADD COLUMN IF NOT EXISTS visitor_id text;
ALTER TABLE public.imphq_vendas ADD COLUMN IF NOT EXISTS session_id text;

-- ============================================================
-- PARTE 1: Adicionar coluna project_slug (filtro multi-projeto)
-- ============================================================
ALTER TABLE public.imphq_vendas ADD COLUMN IF NOT EXISTS project_slug text DEFAULT 'jp_freitas';
ALTER TABLE public.imphq_leads  ADD COLUMN IF NOT EXISTS project_slug text;
ALTER TABLE public.imphq_events ADD COLUMN IF NOT EXISTS project_slug text;
ALTER TABLE public.imphq_clicks ADD COLUMN IF NOT EXISTS project_slug text;

COMMENT ON COLUMN public.imphq_vendas.project_slug IS 'jp_freitas | slimsoda | cardio_clear | haritaki | linfozen | lymph | auraly | other';
COMMENT ON COLUMN public.imphq_leads.project_slug  IS 'jp_freitas | slimsoda | cardio_clear | haritaki | linfozen | lymph | auraly | other';
COMMENT ON COLUMN public.imphq_events.project_slug IS 'jp_freitas | slimsoda | cardio_clear | haritaki | linfozen | lymph | auraly | other';
COMMENT ON COLUMN public.imphq_clicks.project_slug IS 'jp_freitas | slimsoda | cardio_clear | haritaki | linfozen | lymph | auraly | other';

-- ============================================================
-- PARTE 2: 14 colunas de attribution chain (Manual.com.br style)
-- ============================================================
-- imphq_events (full chain)
ALTER TABLE public.imphq_events
  ADD COLUMN IF NOT EXISTS utm_id        text,
  ADD COLUMN IF NOT EXISTS fbclid        text,
  ADD COLUMN IF NOT EXISTS fbc           text,
  ADD COLUMN IF NOT EXISTS fbp           text,
  ADD COLUMN IF NOT EXISTS gclid         text,
  ADD COLUMN IF NOT EXISTS gbraid        text,
  ADD COLUMN IF NOT EXISTS wbraid        text,
  ADD COLUMN IF NOT EXISTS nbt           text,
  ADD COLUMN IF NOT EXISTS nb_placement  text,
  ADD COLUMN IF NOT EXISTS nb_expid_meta text,
  ADD COLUMN IF NOT EXISTS coupon        text,
  ADD COLUMN IF NOT EXISTS link_id       text;

-- imphq_clicks (full chain)
ALTER TABLE public.imphq_clicks
  ADD COLUMN IF NOT EXISTS utm_id        text,
  ADD COLUMN IF NOT EXISTS fbclid        text,
  ADD COLUMN IF NOT EXISTS fbc           text,
  ADD COLUMN IF NOT EXISTS fbp           text,
  ADD COLUMN IF NOT EXISTS gclid         text,
  ADD COLUMN IF NOT EXISTS gbraid        text,
  ADD COLUMN IF NOT EXISTS wbraid        text,
  ADD COLUMN IF NOT EXISTS nbt           text,
  ADD COLUMN IF NOT EXISTS nb_placement  text,
  ADD COLUMN IF NOT EXISTS nb_expid_meta text,
  ADD COLUMN IF NOT EXISTS coupon        text;
-- link_id JÁ EXISTE em imphq_clicks, não recriar

-- imphq_leads (subset: sem nb_*)
ALTER TABLE public.imphq_leads
  ADD COLUMN IF NOT EXISTS utm_id        text,
  ADD COLUMN IF NOT EXISTS fbclid        text,
  ADD COLUMN IF NOT EXISTS fbc           text,
  ADD COLUMN IF NOT EXISTS fbp           text,
  ADD COLUMN IF NOT EXISTS gclid         text,
  ADD COLUMN IF NOT EXISTS gbraid        text,
  ADD COLUMN IF NOT EXISTS wbraid        text,
  ADD COLUMN IF NOT EXISTS nbt           text,
  ADD COLUMN IF NOT EXISTS coupon        text,
  ADD COLUMN IF NOT EXISTS link_id       text;

-- imphq_vendas (subset: só o que importa pra sale attribution)
ALTER TABLE public.imphq_vendas
  ADD COLUMN IF NOT EXISTS utm_id        text,
  ADD COLUMN IF NOT EXISTS fbclid        text,
  ADD COLUMN IF NOT EXISTS fbc           text,
  ADD COLUMN IF NOT EXISTS fbp           text,
  ADD COLUMN IF NOT EXISTS gclid         text,
  ADD COLUMN IF NOT EXISTS coupon        text,
  ADD COLUMN IF NOT EXISTS link_id       text,
  ADD COLUMN IF NOT EXISTS nbt           text,
  ADD COLUMN IF NOT EXISTS gbraid        text,
  ADD COLUMN IF NOT EXISTS wbraid        text,
  ADD COLUMN IF NOT EXISTS nb_placement  text,
  ADD COLUMN IF NOT EXISTS nb_expid_meta text;

-- ============================================================
-- PARTE 3: Indices para query performance (DEPOIS das colunas existirem)
-- ============================================================
-- Events
CREATE INDEX IF NOT EXISTS idx_imphq_events_project_slug  ON public.imphq_events(project_slug);
CREATE INDEX IF NOT EXISTS idx_imphq_events_utm_id        ON public.imphq_events(utm_id);
CREATE INDEX IF NOT EXISTS idx_imphq_events_fbclid        ON public.imphq_events(fbclid);
CREATE INDEX IF NOT EXISTS idx_imphq_events_visitor_id    ON public.imphq_events(visitor_id);
CREATE INDEX IF NOT EXISTS idx_imphq_events_session_id    ON public.imphq_events(session_id);
CREATE INDEX IF NOT EXISTS idx_imphq_events_coupon        ON public.imphq_events(coupon);
CREATE INDEX IF NOT EXISTS idx_imphq_events_created_at    ON public.imphq_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_imphq_events_event_name    ON public.imphq_events(event_name);

-- Clicks
CREATE INDEX IF NOT EXISTS idx_imphq_clicks_project_slug  ON public.imphq_clicks(project_slug);
CREATE INDEX IF NOT EXISTS idx_imphq_clicks_utm_id        ON public.imphq_clicks(utm_id);
CREATE INDEX IF NOT EXISTS idx_imphq_clicks_fbclid        ON public.imphq_clicks(fbclid);
CREATE INDEX IF NOT EXISTS idx_imphq_clicks_visitor_id    ON public.imphq_clicks(visitor_id);
CREATE INDEX IF NOT EXISTS idx_imphq_clicks_session_id    ON public.imphq_clicks(session_id);
CREATE INDEX IF NOT EXISTS idx_imphq_clicks_coupon        ON public.imphq_clicks(coupon);
CREATE INDEX IF NOT EXISTS idx_imphq_clicks_created_at    ON public.imphq_clicks(created_at DESC);

-- Vendas
CREATE INDEX IF NOT EXISTS idx_imphq_vendas_project_slug  ON public.imphq_vendas(project_slug);
CREATE INDEX IF NOT EXISTS idx_imphq_vendas_data_venda    ON public.imphq_vendas(data_venda DESC);
CREATE INDEX IF NOT EXISTS idx_imphq_vendas_status        ON public.imphq_vendas(status);
CREATE INDEX IF NOT EXISTS idx_imphq_vendas_plataforma    ON public.imphq_vendas(plataforma);
CREATE INDEX IF NOT EXISTS idx_imphq_vendas_fbclid        ON public.imphq_vendas(fbclid);
CREATE INDEX IF NOT EXISTS idx_imphq_vendas_utm_id        ON public.imphq_vendas(utm_id);

-- Leads
CREATE INDEX IF NOT EXISTS idx_imphq_leads_project_slug   ON public.imphq_leads(project_slug);
CREATE INDEX IF NOT EXISTS idx_imphq_leads_visitor_id     ON public.imphq_leads(visitor_id);
CREATE INDEX IF NOT EXISTS idx_imphq_leads_session_id     ON public.imphq_leads(session_id);
CREATE INDEX IF NOT EXISTS idx_imphq_leads_created_at     ON public.imphq_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_imphq_leads_utm_id         ON public.imphq_leads(utm_id);
CREATE INDEX IF NOT EXISTS idx_imphq_leads_fbclid         ON public.imphq_leads(fbclid);

-- ============================================================
-- PARTE 4: Backfill project_slug das vendas JP Freitas existentes
-- ============================================================
UPDATE public.imphq_vendas
SET project_slug = COALESCE(project_id::text, 'jp_freitas')
WHERE project_slug IS NULL OR project_slug = '';

-- Set default (pra novos INSERTs sem project_slug serem jp_freitas por retro-compat)
ALTER TABLE public.imphq_vendas ALTER COLUMN project_slug SET DEFAULT 'jp_freitas';

-- ============================================================
-- PARTE 5: Verificação final (NO THROW - só RAISE NOTICE)
-- ============================================================
DO $$
DECLARE
  events_cols int; clicks_cols int; leads_cols int; vendas_cols int;
  events_idx int; clicks_idx int; leads_idx int; vendas_idx int;
  vendas_count int;
BEGIN
  -- Colunas attribution por tabela
  SELECT count(*) INTO events_cols FROM information_schema.columns
    WHERE table_schema='public' AND table_name='imphq_events' AND column_name IN
      ('utm_id','fbclid','fbc','fbp','gclid','gbraid','wbraid','nbt','nb_placement','nb_expid_meta','coupon','link_id','project_slug','visitor_id','session_id');
  SELECT count(*) INTO clicks_cols FROM information_schema.columns
    WHERE table_schema='public' AND table_name='imphq_clicks' AND column_name IN
      ('utm_id','fbclid','fbc','fbp','gclid','gbraid','wbraid','nbt','nb_placement','nb_expid_meta','coupon','project_slug','visitor_id','session_id');
  SELECT count(*) INTO leads_cols FROM information_schema.columns
    WHERE table_schema='public' AND table_name='imphq_leads' AND column_name IN
      ('utm_id','fbclid','fbc','fbp','gclid','gbraid','wbraid','nbt','coupon','link_id','project_slug','visitor_id','session_id');
  SELECT count(*) INTO vendas_cols FROM information_schema.columns
    WHERE table_schema='public' AND table_name='imphq_vendas' AND column_name IN
      ('utm_id','fbclid','fbc','fbp','gclid','gbraid','wbraid','nbt','nb_placement','nb_expid_meta','coupon','link_id','project_slug','visitor_id','session_id');

  -- Indices por tabela
  SELECT count(*) INTO events_idx FROM pg_indexes
    WHERE schemaname='public' AND tablename='imphq_events' AND indexname LIKE 'idx_imphq_events%';
  SELECT count(*) INTO clicks_idx FROM pg_indexes
    WHERE schemaname='public' AND tablename='imphq_clicks' AND indexname LIKE 'idx_imphq_clicks%';
  SELECT count(*) INTO leads_idx FROM pg_indexes
    WHERE schemaname='public' AND tablename='imphq_leads' AND indexname LIKE 'idx_imphq_leads%';
  SELECT count(*) INTO vendas_idx FROM pg_indexes
    WHERE schemaname='public' AND tablename='imphq_vendas' AND indexname LIKE 'idx_imphq_vendas%';

  -- Count vendas backfilled
  SELECT count(*) INTO vendas_count FROM public.imphq_vendas WHERE project_slug = 'jp_freitas';

  RAISE NOTICE '====== MIGRATION 002 v2 RESULT ======';
  RAISE NOTICE 'imphq_events: % cols / % indices', events_cols, events_idx;
  RAISE NOTICE 'imphq_clicks: % cols / % indices', clicks_cols, clicks_idx;
  RAISE NOTICE 'imphq_leads:  % cols / % indices', leads_cols,  leads_idx;
  RAISE NOTICE 'imphq_vendas: % cols / % indices', vendas_cols, vendas_idx;
  RAISE NOTICE 'Vendas backfilled with project_slug=jp_freitas: %', vendas_count;
  RAISE NOTICE '=====================================';
  IF events_cols < 15 THEN RAISE WARNING 'imphq_events missing cols (expected 15, got %)', events_cols; END IF;
  IF clicks_cols < 14 THEN RAISE WARNING 'imphq_clicks missing cols (expected 14, got %)', clicks_cols; END IF;
  IF leads_cols  < 14 THEN RAISE WARNING 'imphq_leads  missing cols (expected 14, got %)', leads_cols;  END IF;
  IF vendas_cols < 15 THEN RAISE WARNING 'imphq_vendas missing cols (expected 15, got %)', vendas_cols; END IF;
END $$;

-- ============================================================
-- FIM Migration 002 v2
-- Próximo passo: API endpoints (/api/track-capi, /api/insights)
-- precisam ser atualizados pra popular project_slug='slimsoda'
-- quando META_PIXEL_ID=SLIMSODA ou quando URL tem slimsoda no host
-- ============================================================
