import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "29dd5a28-fad2-42af-bfdd-63fefdf01c06",
        name,
        email,
        subject: `[Portfolio Inquiry] ${subject}`,
        message,
        from_name: `${name} (Aadith Portfolio)`,
      }),
    });

    const data = await response.json();

    if (data.success) {
      return NextResponse.json({ success: true, message: "Message sent successfully!" });
    } else {
      return NextResponse.json(
        { success: false, message: data.message || "Failed to transmit message." },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("API /api/contact error:", error);
    return NextResponse.json(
      { success: false, message: "Server error occurred while transmitting." },
      { status: 500 }
    );
  }
}

