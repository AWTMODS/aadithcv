import QRCode from "qrcode";

export interface UpiParams {
  pa: string; // Payee VPA / UPI ID
  pn: string; // Payee Name
  am: number | string; // Amount
  cu?: string; // Currency (INR)
  tn?: string; // Transaction Note
}

/**
 * Generates standard UPI URI string compliant with NPCI UPI specification
 * (compatible with YouPI-PG / Universal UPI intent)
 */
export function buildUpiUri({
  pa,
  pn,
  am,
  cu = "INR",
  tn = "Support Developer",
}: UpiParams): string {
  const cleanPa = pa.trim();
  const cleanPn = encodeURIComponent(pn.trim());
  const cleanTn = encodeURIComponent(tn.trim());
  const amountStr = typeof am === "number" ? am.toFixed(2) : parseFloat(am || "0").toFixed(2);

  return `upi://pay?pa=${cleanPa}&pn=${cleanPn}&am=${amountStr}&cu=${cu}&tn=${cleanTn}`;
}

/**
 * Generates App-specific deep links for direct intent invocation on Android / iOS
 */
export function buildAppIntent(app: "gpay" | "phonepe" | "paytm" | "cred" | "bhim" | "generic", upiUri: string): string {
  const queryPart = upiUri.replace("upi://pay?", "");
  switch (app) {
    case "phonepe":
      return `phonepe://pay?${queryPart}`;
    case "paytm":
      return `paytmmp://pay?${queryPart}`;
    case "gpay":
      return `tez://upi/pay?${queryPart}`;
    case "cred":
      return `cred://upi/pay?${queryPart}`;
    case "bhim":
    case "generic":
    default:
      return upiUri;
  }
}

/**
 * Generates high-res Data URL for dynamic QR code rendering
 */
export async function generateUpiQrDataUrl(upiUri: string): Promise<string> {
  try {
    return await QRCode.toDataURL(upiUri, {
      width: 400,
      margin: 1.5,
      color: {
        dark: "#111111",
        light: "#FFFFFF",
      },
      errorCorrectionLevel: "M",
    });
  } catch (err) {
    console.error("Failed to generate QR code:", err);
    return "";
  }
}

