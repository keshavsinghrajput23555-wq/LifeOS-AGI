import OpenAI from 'openai';
import { env } from '@/lib/env';
import { extractionPrompt, validationPrompt } from './prompts';

const client = new OpenAI({ apiKey: env.OPENAI_API_KEY });

export async function extractStructuredData(rawText: string) {
  const response = await client.responses.create({
    model: 'gpt-4.1-mini',
    input: `${extractionPrompt}\nOCR:${rawText}`,
    text: { format: { type: 'json_object' } }
  });
  return JSON.parse(response.output_text);
}

export async function validateDocuments(payload: unknown) {
  const response = await client.responses.create({
    model: 'gpt-4.1-mini',
    input: `${validationPrompt}\n${JSON.stringify(payload)}`,
    text: { format: { type: 'json_object' } }
  });
  return JSON.parse(response.output_text);
}
