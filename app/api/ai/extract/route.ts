import { fail, ok } from '@/lib/api';
import { extractStructuredData } from '@/services/ai/openai';

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.rawText) return fail('rawText required');
  return ok(await extractStructuredData(body.rawText));
}
