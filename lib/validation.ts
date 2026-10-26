/**
 * Comprehensive Validation, Sanitization & Regex Utilities
 * For E-Commerce checkout, contact forms, reviews, and authentication.
 */

// ==========================================
// 1. REGEX PATTERNS
// ==========================================

export const REGEX = {
  // RFC 5322 compliant email regex
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,

  // Names (international accented letters, spaces, hyphens, apostrophes)
  name: /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/,

  // US Street Address (numbers, letters, spaces, hyphens, periods, suite/apt #)
  streetAddress: /^[0-9a-zA-ZÀ-ÿ\s,.'#\-/]{3,100}$/,

  // City names
  city: /^[a-zA-ZÀ-ÿ\s.-]{2,50}$/,

  // US State (2-letter code or full state name)
  state: /^(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]|[a-zA-Z\s]{2,30})$/i,

  // US ZIP Code: 12345 or 12345-6789
  zipCode: /^\d{5}(-\d{4})?$/,

  // Credit Card Brands
  cardVisa: /^4[0-9]{12}(?:[0-9]{3})?$/,
  cardMastercard: /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/,
  cardAmex: /^3[47][0-9]{13}$/,
  cardDiscover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,

  // Expiration: MM/YY where MM is 01-12 and YY is 2 digits
  expiryDate: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,

  // Card CVC: 3 or 4 digits
  cvc: /^\d{3,4}$/,

  // Promo code: uppercase letters, numbers, hyphens, 3-15 chars
  promoCode: /^[A-Z0-9_-]{3,15}$/,

  // Password: at least 8 chars, at least 1 letter and 1 number
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&-_]{8,}$/,
};

// ==========================================
// 2. SANITIZATION FUNCTIONS
// ==========================================

/**
 * Strips script tags, HTML tags, null bytes, and trims whitespace.
 * Prevents Cross-Site Scripting (XSS) in user-rendered fields.
 */
export function sanitizeText(input: unknown): string {
  if (typeof input !== "string") return "";

  return input
    .replace(/\0/g, "") // Remove null bytes
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "") // Remove <script>...</script>
    .replace(/<[^>]+>/g, "") // Strip any remaining HTML tags
    .replace(/javascript:/gi, "") // Strip javascript: URLs
    .replace(/[<>'"&]/g, (char) => {
      // Basic HTML Entity encoding for dangerous characters
      switch (char) {
        case "<": return "&lt;";
        case ">": return "&gt;";
        case "'": return "&#39;";
        case '"': return "&quot;";
        case "&": return "&amp;";
        default: return char;
      }
    })
    .trim();
}

/**
 * Sanitizes email addresses: strips whitespace and converts to lower case.
 */
export function sanitizeEmail(email: unknown): string {
  if (typeof email !== "string") return "";
  return email.trim().toLowerCase().replace(/[<>'"\s]/g, "");
}

/**
 * Extracts digits only from a string.
 */
export function sanitizeDigits(input: unknown): string {
  if (typeof input !== "string") return "";
  return input.replace(/\D/g, "");
}

/**
 * Sanitizes promo code: keeps alphanumeric and hyphens, converts to uppercase.
 */
export function sanitizePromoCode(code: unknown): string {
  if (typeof code !== "string") return "";
  return code.trim().toUpperCase().replace(/[^A-Z0-9_-]/g, "");
}

// ==========================================
// 3. LUHN ALGORITHM (CREDIT CARD CHECK)
// ==========================================

export function checkLuhn(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, "");
  if (digits.length < 13 || digits.length > 19) return false;

  let sum = 0;
  let shouldDouble = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

export type CardBrand = "visa" | "mastercard" | "amex" | "discover" | "unknown";

export function detectCardBrand(cardNumber: string): CardBrand {
  const clean = cardNumber.replace(/\D/g, "");
  if (/^4/.test(clean)) return "visa";
  if (/^(5[1-5]|2[2-7])/.test(clean)) return "mastercard";
  if (/^3[47]/.test(clean)) return "amex";
  if (/^6(?:011|5)/.test(clean)) return "discover";
  return "unknown";
}

// ==========================================
// 4. FORMATTERS
// ==========================================

/**
 * Formats raw digits into 4-digit groups (e.g. 4242 4242 4242 4242)
 * Supports Amex 4-6-5 grouping.
 */
export function formatCardNumber(value: string): string {
  const digits = sanitizeDigits(value).slice(0, 16);
  // Amex style formatting
  if (/^3[47]/.test(digits)) {
    const p1 = digits.slice(0, 4);
    const p2 = digits.slice(4, 10);
    const p3 = digits.slice(10, 15);
    return [p1, p2, p3].filter(Boolean).join(" ");
  }

  // Standard 4-4-4-4
  const parts = [];
  for (let i = 0; i < digits.length; i += 4) {
    parts.push(digits.slice(i, i + 4));
  }
  return parts.join(" ");
}

/**
 * Formats expiration input as MM/YY automatically.
 */
export function formatExpiry(value: string): string {
  const digits = sanitizeDigits(value).slice(0, 4);
  if (digits.length === 0) return "";
  if (digits.length <= 2) {
    // If first digit is > 1, auto-prefix with 0
    if (digits.length === 1 && parseInt(digits, 10) > 1) {
      return `0${digits}/`;
    }
    return digits;
  }
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
}

/**
 * Formats US ZIP code as 12345 or 12345-6789.
 */
export function formatZipCode(value: string): string {
  const digits = sanitizeDigits(value).slice(0, 9);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

// ==========================================
// 5. VALIDATION HELPERS
// ==========================================

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  sanitizedValue?: string;
}

export function validateEmail(email: string): ValidationResult {
  const sanitized = sanitizeEmail(email);
  if (!sanitized) {
    return { isValid: false, error: "Email address is required." };
  }
  if (!REGEX.email.test(sanitized)) {
    return { isValid: false, error: "Please enter a valid email address." };
  }
  return { isValid: true, sanitizedValue: sanitized };
}

export function validateName(name: string, fieldLabel = "Name"): ValidationResult {
  const sanitized = sanitizeText(name);
  if (!sanitized) {
    return { isValid: false, error: `${fieldLabel} is required.` };
  }
  if (!REGEX.name.test(sanitized)) {
    return {
      isValid: false,
      error: `${fieldLabel} must be 2-50 characters and contain valid name characters.`,
    };
  }
  return { isValid: true, sanitizedValue: sanitized };
}

export function validateAddress(address: string): ValidationResult {
  const sanitized = sanitizeText(address);
  if (!sanitized) {
    return { isValid: false, error: "Street address is required." };
  }
  if (sanitized.length < 5 || sanitized.length > 100) {
    return {
      isValid: false,
      error: "Street address must be between 5 and 100 characters.",
    };
  }
  return { isValid: true, sanitizedValue: sanitized };
}

export function validateCity(city: string): ValidationResult {
  const sanitized = sanitizeText(city);
  if (!sanitized) {
    return { isValid: false, error: "City is required." };
  }
  if (!REGEX.city.test(sanitized)) {
    return { isValid: false, error: "Please enter a valid city name." };
  }
  return { isValid: true, sanitizedValue: sanitized };
}

export function validateState(state: string): ValidationResult {
  const sanitized = sanitizeText(state);
  if (!sanitized) {
    return { isValid: false, error: "State is required." };
  }
  if (!REGEX.state.test(sanitized)) {
    return { isValid: false, error: "Please enter a valid 2-letter state code." };
  }
  return { isValid: true, sanitizedValue: sanitized.toUpperCase() };
}

export function validateZip(zip: string): ValidationResult {
  const sanitized = sanitizeText(zip);
  if (!sanitized) {
    return { isValid: false, error: "ZIP code is required." };
  }
  if (!REGEX.zipCode.test(sanitized)) {
    return { isValid: false, error: "Please enter a valid 5-digit ZIP code." };
  }
  return { isValid: true, sanitizedValue: sanitized };
}

export function validateCardNumber(cardNumber: string): ValidationResult & { brand: CardBrand } {
  const clean = sanitizeDigits(cardNumber);
  const brand = detectCardBrand(clean);

  if (!clean) {
    return { isValid: false, brand, error: "Card number is required." };
  }

  // Allow standard demo test card "4242 4242 4242 4242"
  if (clean === "4242424242424242") {
    return { isValid: true, brand: "visa", sanitizedValue: clean };
  }

  if (clean.length < 13 || clean.length > 19) {
    return { isValid: false, brand, error: "Card number must be 13 to 19 digits." };
  }

  if (!checkLuhn(clean)) {
    return { isValid: false, brand, error: "Invalid card number (checksum failed)." };
  }

  return { isValid: true, brand, sanitizedValue: clean };
}

export function validateExpiry(expiry: string): ValidationResult {
  const sanitized = sanitizeText(expiry);
  if (!sanitized) {
    return { isValid: false, error: "Expiration date is required." };
  }

  const match = sanitized.match(REGEX.expiryDate);
  if (!match) {
    return { isValid: false, error: "Expiration must be in MM/YY format." };
  }

  const month = parseInt(match[1], 10);
  const year = parseInt(match[2], 10) + 2000;

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return { isValid: false, error: "Card has expired." };
  }

  if (year > currentYear + 20) {
    return { isValid: false, error: "Expiration year is invalid." };
  }

  return { isValid: true, sanitizedValue: sanitized };
}

export function validateCvc(cvc: string, brand?: CardBrand): ValidationResult {
  const clean = sanitizeDigits(cvc);
  if (!clean) {
    return { isValid: false, error: "Security CVC is required." };
  }

  const requiredLen = brand === "amex" ? 4 : 3;
  if (clean.length !== requiredLen && clean.length !== 3 && clean.length !== 4) {
    return {
      isValid: false,
      error: `CVC must be ${requiredLen} digits.`,
    };
  }

  return { isValid: true, sanitizedValue: clean };
}

export function validatePromoCode(code: string): ValidationResult {
  const sanitized = sanitizePromoCode(code);
  if (!sanitized) {
    return { isValid: false, error: "Please enter a coupon code." };
  }
  if (!REGEX.promoCode.test(sanitized)) {
    return { isValid: false, error: "Coupon code must be 3-15 alphanumeric characters." };
  }
  return { isValid: true, sanitizedValue: sanitized };
}

export function validateComment(comment: string, minLength = 10, maxLength = 1000): ValidationResult {
  const sanitized = sanitizeText(comment);
  if (!sanitized) {
    return { isValid: false, error: "Review details are required." };
  }
  if (sanitized.length < minLength) {
    return {
      isValid: false,
      error: `Review must be at least ${minLength} characters.`,
    };
  }
  if (sanitized.length > maxLength) {
    return {
      isValid: false,
      error: `Review cannot exceed ${maxLength} characters.`,
    };
  }
  return { isValid: true, sanitizedValue: sanitized };
}
