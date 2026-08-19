-- Migration 001: Extend imphq_clicks with full attribution chain
-- Run this in Supabase Studio > SQL Editor
-- Created: 2026-08-19 (modeled after Manual.com.br URL structure)
--
-- These columns capture the FULL attribution chain from Meta + Google +
-- NewBreed (BR ad platform) + custom coupon codes, so every click
-- attributed to a SlimSoda page can be traced back to:
--   - The exact ad (utm_id = Meta ad ID)
--   - The click (fbclid -> fbc cookie)
--   - The placement (nb_placement = Instagram_Reels, Stories, etc)
--   - The A/B test variant (nb_expid_meta)
--   - The coupon shown in the creative (coupon)
--
-- Run order: just paste + execute. Idempotent (uses IF NOT EXISTS).

ALTER TABLE imphq_clicks ADD COLUMN IF NOT EXISTS visitor_id        TEXT;
ALTER TABLE imphq_clicks ADD COLUMN IF NOT EXISTS session_id        TEXT;

-- Meta-specific
ALTER TABLE imphq_clicks ADD COLUMN IF NOT EXISTS utm_id            TEXT;
ALTER TABLE imphq_clicks ADD COLUMN IF NOT EXISTS fbclid            TEXT;
ALTER TABLE imphq_clicks ADD COLUMN IF NOT EXISTS fbc               TEXT;
ALTER TABLE imphq_clicks ADD COLUMN IF NOT EXISTS fbp               TEXT;

-- Google (cross-platform)
ALTER TABLE imphq_clicks ADD COLUMN IF NOT EXISTS gclid             TEXT;
ALTER TABLE imphq_clicks ADD COLUMN IF NOT EXISTS gbraid            TEXT;
ALTER TABLE imphq_clicks ADD COLUMN IF NOT EXISTS wbraid            TEXT;

-- NewBreed (BR ad optimization platform — common in BR Meta campaigns)
ALTER TABLE imphq_clicks ADD COLUMN IF NOT EXISTS nbt               TEXT;
ALTER TABLE imphq_clicks ADD COLUMN IF NOT EXISTS nb_placement      TEXT;
ALTER TABLE imphq_clicks ADD COLUMN IF NOT EXISTS nb_expid_meta     TEXT;

-- Coupon / promo
ALTER TABLE imphq_clicks ADD COLUMN IF NOT EXISTS coupon            TEXT;

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_imphq_clicks_utm_campaign ON imphq_clicks(utm_campaign);
CREATE INDEX IF NOT EXISTS idx_imphq_clicks_utm_content  ON imphq_clicks(utm_content);
CREATE INDEX IF NOT EXISTS idx_imphq_clicks_utm_id       ON imphq_clicks(utm_id);
CREATE INDEX IF NOT EXISTS idx_imphq_clicks_visitor_id   ON imphq_clicks(visitor_id);
CREATE INDEX IF NOT EXISTS idx_imphq_clicks_session_id   ON imphq_clicks(session_id);
CREATE INDEX IF NOT EXISTS idx_imphq_clicks_coupon       ON imphq_clicks(coupon);

-- Comments
COMMENT ON COLUMN imphq_clicks.utm_id IS 'Meta ad ID (numeric, e.g. 120249312094700455)';
COMMENT ON COLUMN imphq_clicks.fbclid IS 'Meta click ID (from URL fbclid param)';
COMMENT ON COLUMN imphq_clicks.fbc IS 'Meta fbc cookie (fb.1.<ts>.<fbclid>) — used in CAPI for advanced matching';
COMMENT ON COLUMN imphq_clicks.fbp IS 'Meta fbp cookie (browser ID)';
COMMENT ON COLUMN imphq_clicks.nbt IS 'NewBreed tag (BR ad platform: nb:fb:ig:<account>:<campaign>:<adset>)';
COMMENT ON COLUMN imphq_clicks.nb_placement IS 'NewBreed placement (Instagram_Reels, Facebook_Feed, etc)';
COMMENT ON COLUMN imphq_clicks.nb_expid_meta IS 'NewBreed experiment ID (A/B variant)';
COMMENT ON COLUMN imphq_clicks.coupon IS 'Coupon code shown in the creative';
