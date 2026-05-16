import { NextResponse } from 'next/server';

export const ok = (data: unknown) => NextResponse.json({ success: true, data });
export const fail = (message: string, status = 400) => NextResponse.json({ success: false, message }, { status });
