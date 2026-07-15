import { ok } from '@/lib/api';
import { validateDocuments } from '@/services/ai/openai';

export async function POST(req: Request) {
  const body = await req.json();
  return ok(await validateDocuments(body));
}
