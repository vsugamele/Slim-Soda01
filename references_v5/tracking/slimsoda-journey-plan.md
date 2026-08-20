# SlimSoda Journey Tracking Plan

Last updated: 2026-08-20

## Goal

Measure the customer journey from advertorial read, CTA click, quiz engagement, PDP visit, and checkout click without collecting PII.

## Primary Funnel

| Funnel Step | Event | What It Answers |
| --- | --- | --- |
| Advertorial page loaded | `ss_page_view` with `page_type=advertorial` | How many visitors reached the presell? |
| Read depth | `ss_scroll_depth` | Where does the advertorial lose attention? |
| Advertorial CTA clicked | `ss_cta_clicked` | Which CTA/location creates intent? |
| Quiz opened | `ss_quiz_opened` | Do CTAs create quiz engagement? |
| Quiz started | `ss_quiz_started` | Do users accept the assessment? |
| Quiz answer selected | `ss_quiz_answered` | Which avatar/profile is clicking? |
| Quiz step shown | `ss_quiz_step_viewed` | Which question creates abandonment? |
| Quiz completed | `ss_quiz_completed` | How many users finish the assessment? |
| Quiz result shown | `ss_quiz_result_viewed` | How many users reach the pitch/result? |
| PDP click | `ss_pdp_click` | How many result/CTA clicks reach the product page? |
| PDP page loaded | `ss_page_view` with `page_type=pdp` | How many users land on PDP? |
| Checkout clicked | `ss_checkout_clicked` | Which PDP/quiz CTA starts checkout? |

## Standard Properties

All events include:

| Property | Purpose |
| --- | --- |
| `visitor_id` | Anonymous persistent browser ID |
| `session_id` | Anonymous 30-minute session ID |
| `page_type` | `advertorial`, `pdp`, `buy_page`, or `site` |
| `page_path` / `page_url` / `page_title` | Page context |
| `referrer` | Previous page when available |
| `seconds_on_page` | Timing context |
| `viewport_width` / `viewport_height` | Mobile/desktop analysis |
| `attribution` | Persisted UTMs, click IDs, `affid`, first referrer, first landing page |
| `event_id` | Deduplication key for Meta Pixel and CAPI |

CTA events also include:

| Property | Purpose |
| --- | --- |
| `cta_id` | Element ID when available |
| `cta_class` | Button class context |
| `cta_label` | Button text |
| `cta_location` | Hero, header, sticky, quiz, guarantee, comments, above/below fold |
| `destination_type` | `pdp`, `checkout`, or `internal` |
| `destination_url` | Final URL with attribution appended |

Quiz answer events also include:

| Property | Purpose |
| --- | --- |
| `quiz_step` | 1-4 |
| `question_text` | Current question |
| `answer_index` | Selected option index |
| `answer_label` | Selected option text |
| `answer_value` | Internal scoring value |

## Destinations

Events are sent to:

- `dataLayer` for GTM or browser inspection.
- Meta Pixel via `fbq`; `ss_checkout_clicked` is also sent as standard `InitiateCheckout`.
- Microsoft Clarity custom events and session tags.
- Existing `/api/track-capi` relay with Meta `event_id` deduplication.

## Debugging

Open any tracked page with `?debug_tracking=1` to print each event in the browser console:

```text
https://slim-soda01.vercel.app/references_v5/by-product/slimsoda/lps/advertorial-maria47-v3/?debug_tracking=1
```

Check server-side relay health:

```text
/api/track-capi
/api/track-capi?diag=1
```
