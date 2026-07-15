create extension if not exists "pgcrypto";

create table users (
  id uuid primary key default gen_random_uuid(),
  phone text unique not null,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  document_type text not null,
  file_path text not null,
  ocr_text text,
  extracted_json jsonb,
  status text not null default 'uploaded',
  created_at timestamptz not null default now()
);
create index idx_documents_user_id on documents(user_id);

create table form_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  form_type text not null,
  status text not null default 'draft',
  validation_result jsonb,
  filled_pdf_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_form_requests_user_status on form_requests(user_id, status);

create table payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  razorpay_order_id text not null,
  amount_inr integer not null,
  payment_type text not null,
  payment_status text not null default 'created',
  invoice_json jsonb,
  created_at timestamptz not null default now()
);

create table admin_logs (
  id uuid primary key default gen_random_uuid(),
  admin_user_id uuid not null references users(id),
  action text not null,
  metadata jsonb,
  created_at timestamptz not null default now()
);
