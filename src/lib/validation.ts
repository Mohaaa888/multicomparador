const PHONE_REGEX = /^[6789]\d{8}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

export const normalizePhoneDigits = (value: string) => value.replace(/\D/g, "");

export const normalizeSpanishPhone = (value: string) => {
  let digits = normalizePhoneDigits(value);

  if (digits.startsWith("34") && digits.length > 9) {
    digits = digits.slice(digits.length - 9);
  }

  if (digits.startsWith("0034") && digits.length > 9) {
    digits = digits.slice(digits.length - 9);
  }

  return digits;
};

export const isValidPhone = (value: string) => {
  const normalized = normalizeSpanishPhone(value);
  return PHONE_REGEX.test(normalized);
};

export const isValidEmail = (value: string) => {
  if (!value) return false;
  return EMAIL_REGEX.test(value.trim());
};

export const sanitizeEmail = (value: string) => value.trim();
