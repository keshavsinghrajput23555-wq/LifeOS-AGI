import { ok } from '@/lib/api';

export async function GET() {
  return ok({ totalUsers: 0, processedForms: 0, failedForms: 0, revenue: 0, supportRequests: 0 });
}
