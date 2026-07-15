export const extractionPrompt = `Normalize OCR text from Indian documents and return strict JSON with keys: fullName, fatherName, dob, address, aadhaarNumber.`;
export const validationPrompt = `Compare extracted identities from multiple documents. Return JSON array of mismatches, missing fields, blurry-document hint, and Hindi guidance.`;
export const missingDocPrompt = `Given form type and uploaded documents, return missing required docs in Hindi.`;
