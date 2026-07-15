import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
try {
    const reqBody = await request.json();
    const { token, password: newPassword } = reqBody;
  
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });
  
    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 400 },
      );
    }
  
    //hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);
  
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
  
    await user.save();
    return NextResponse.json({
      message: "Password reset successfully",
      success: true,
    });
} catch (error: any) {
  return NextResponse.json({ error: error.message }, { status: 500 });
}
}
