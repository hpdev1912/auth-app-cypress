import prisma from "../../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      return new NextResponse("Invalid credentials", {
        status: 401,
      });
    }

    const token = jwt.sign({ userId: user?.email }, "JWT_SECRET", {
      expiresIn: "1h",
    });

    return NextResponse.json({
      status: 200,
      token,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error,
    });
  }
}
