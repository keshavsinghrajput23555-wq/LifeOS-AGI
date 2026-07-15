# FormMitra (Production SaaS Blueprint)

## Phase Plan
1. Setup + Supabase Auth (OTP)
2. Upload + OCR pipeline
3. AI extraction + validation
4. Autofill + PDF generation
5. Razorpay + admin analytics
6. optimization (caching, queues, observability)

## Architecture
- Next.js app router for web + API.
- Supabase for auth, postgres, storage.
- OCR pipeline: upload -> Tesseract -> raw text.
- AI pipeline: raw text -> OpenAI structured JSON -> cross-document validation -> Hindi guidance.
- PDF pipeline: template mapping with pdf-lib.

## Security
- zod validation on all API input.
- server-only secrets in env.
- add rate limit middleware + RLS policies before launch.
- validate MIME and file size before upload.

## Deploy
- Set env vars from .env.example in Vercel.
- Run Supabase migration.
- Configure Storage bucket rules + signed URLs.
