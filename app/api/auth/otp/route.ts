import { fail, ok } from '@/lib/api';
import { phoneSchema } from '@/services/security/validation';

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = phoneSchema.safeParse(body);
  if (!parsed.success) return fail('Invalid phone number');
  return ok({ message: 'OTP sent (integrate Supabase Auth OTP here)' });
}
