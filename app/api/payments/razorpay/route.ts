import Razorpay from 'razorpay';
import { env } from '@/lib/env';
import { ok } from '@/lib/api';

const razorpay = new Razorpay({ key_id: env.RAZORPAY_KEY_ID, key_secret: env.RAZORPAY_KEY_SECRET });

export async function POST(req: Request) {
  const body = await req.json();
  const order = await razorpay.orders.create({ amount: body.amount, currency: 'INR', receipt: `frm_${Date.now()}` });
  return ok(order);
}
