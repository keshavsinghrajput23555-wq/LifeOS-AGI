import { fail, ok } from '@/lib/api';
import { runOcrFromUrl } from '@/services/ocr/tesseract';

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.fileUrl) return fail('fileUrl required');
  const text = await runOcrFromUrl(body.fileUrl);
  return ok({ text });
}
