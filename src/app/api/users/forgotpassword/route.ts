import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    // 1. Look up the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "No user found with that email address" },
        { status: 400 }
      );
    }

    // 2. Trigger your existing sendEmail function with the "RESET" configuration
    // This will generate a token, update Mongoose, and send the email layout
    await sendEmail({
      email: user.email,
      emailType: "RESET",
      userId: user._id,
    });

    return NextResponse.json({
      message: "Reset email sent successfully",
      success: true,
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}