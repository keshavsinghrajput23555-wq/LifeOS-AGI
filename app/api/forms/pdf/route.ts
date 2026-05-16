import { PDFDocument, StandardFonts } from 'pdf-lib';

export async function POST(req: Request) {
  const body = await req.json();
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595, 842]);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  page.drawText(`Name: ${body.fullName ?? ''}`, { x: 50, y: 780, font, size: 12 });
  const bytes = await pdf.save();
  return new Response(bytes, { headers: { 'Content-Type': 'application/pdf' } });
}
