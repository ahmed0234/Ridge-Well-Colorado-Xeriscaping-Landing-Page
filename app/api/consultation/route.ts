import { NextResponse } from "next/server";

/**
 * Consultation form API — POST /api/consultation
 *
 * Request body (JSON):
 * {
 *   "name":    string  — Full name (2–80 characters)
 *   "phone":   string  — Phone number (10–15 digits after normalization)
 *   "email":   string  — Valid email address
 *   "zip":     string  — 5-digit US ZIP code
 *   "service": string  — Selected service (must match allowed list)
 * }
 *
 * Success (201):
 * { "success": true, "message": string }
 *
 * Validation error (400):
 * { "success": false, "message": string, "errors": Record<string, string> }
 *
 * Server error (500):
 * { "success": false, "message": string }
 */

const ALLOWED_SERVICES = [
  "Front Yard Xeriscape",
  "Backyard Xeriscape",
  "Full Property Transformation",
  "Replace Grass / Lower Maintenance",
  "Not Sure Yet",
] as const;

export type ConsultationRequestBody = {
  name: string;
  phone: string;
  email: string;
  zip: string;
  service: string;
};

function normalizePhone(value: string) {
  return value.replace(/\D/g, "");
}

function validateBody(
  body: unknown,
): { ok: true; data: ConsultationRequestBody } | { ok: false; errors: Record<string, string> } {
  if (!body || typeof body !== "object") {
    return { ok: false, errors: { _form: "Invalid request body." } };
  }

  const raw = body as Record<string, unknown>;
  const errors: Record<string, string> = {};

  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  const phoneRaw = typeof raw.phone === "string" ? raw.phone.trim() : "";
  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  const zip = typeof raw.zip === "string" ? raw.zip.trim() : "";
  const service = typeof raw.service === "string" ? raw.service.trim() : "";

  if (!name) errors.name = "Please enter your name.";
  else if (name.length < 2) errors.name = "Name should be at least 2 characters.";
  else if (name.length > 80) errors.name = "Name is a bit long — please shorten it.";

  const phoneDigits = normalizePhone(phoneRaw);
  if (!phoneDigits) errors.phone = "Please enter a phone number.";
  else if (phoneDigits.length < 10)
    errors.phone = "Please enter a valid 10-digit phone number.";
  else if (phoneDigits.length > 15) errors.phone = "Phone number looks too long.";

  if (!email) errors.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email))
    errors.email = "Please enter a valid email address.";
  else if (email.length > 120) errors.email = "Email address is too long.";

  if (!zip) errors.zip = "Please enter your ZIP code.";
  else if (!/^\d{5}$/.test(zip)) errors.zip = "ZIP should be 5 digits (e.g. 80202).";

  if (!service) errors.service = "Please select a service.";
  else if (!ALLOWED_SERVICES.includes(service as (typeof ALLOWED_SERVICES)[number]))
    errors.service = "Please choose a valid service option.";

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: { name, phone: phoneRaw, email, zip, service },
  };
}

export async function POST(request: Request) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Request must be valid JSON." },
        { status: 400 },
      );
    }

    const result = validateBody(body);
    if (!result.ok) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fix the highlighted fields.",
          errors: result.errors,
        },
        { status: 400 },
      );
    }

    const payload = result.data;

    // Optional: forward to CRM, email, or webhook (set in environment)
    const webhookUrl = process.env.CONSULTATION_WEBHOOK_URL;
    if (webhookUrl) {
      const webhookRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          submittedAt: new Date().toISOString(),
          source: "ridgewellxeriscaping.com",
        }),
      });
      if (!webhookRes.ok) {
        console.error("Consultation webhook failed:", webhookRes.status);
        return NextResponse.json(
          {
            success: false,
            message:
              "We couldn't save your request right now. Please call us or try again shortly.",
          },
          { status: 502 },
        );
      }
    } else if (process.env.NODE_ENV === "development") {
      console.info("[consultation] New lead:", payload);
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you! We'll reach out within one business day to schedule your consultation.",
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("[consultation] POST error:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong on our end. Please try again in a moment.",
      },
      { status: 500 },
    );
  }
}
