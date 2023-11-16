import { validatePassword } from "@/app/utils/helper";
import prisma from "../../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (user) {
      return NextResponse.json(
        {
          message: "This email was taken!",
        },
        { status: 400 },
      );
    } else {
      const validateResult = validatePassword(body.password);
      if (!validateResult?.error) {
        const newUser = await prisma.user.create({
          data: {
            email: body.email,
            password: body.password,
          },
        });

        return NextResponse.json(newUser, {
          status: 200,
        });
      } else {
        return NextResponse.json(
          {
            message: validateResult.error,
          },
          {
            status: 400,
          },
        );
      }
    }
  } catch (error) {
    return NextResponse.json(
      { message: error },
      {
        status: 500,
      },
    );
  }
}
