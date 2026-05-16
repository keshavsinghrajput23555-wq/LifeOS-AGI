import Tesseract from 'tesseract.js';

export async function runOcrFromUrl(fileUrl: string) {
  const result = await Tesseract.recognize(fileUrl, 'eng+hin');
  return result.data.text;
}
