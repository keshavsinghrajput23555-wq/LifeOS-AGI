export type ExtractedIdentity = {
  fullName: string;
  fatherName?: string;
  dob?: string;
  address?: string;
  aadhaarNumber?: string;
};

export type ValidationIssue = {
  severity: 'error' | 'warning';
  field: string;
  messageHi: string;
};
