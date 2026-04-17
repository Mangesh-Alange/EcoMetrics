import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const signup = await prisma.comingSoonSignup.create({
      data: { email },
    });

    return NextResponse.json({ success: true, signup });
  } catch (err: any) {
    if (err.code === 'P2002') {
      return NextResponse.json({ error: "Already signed up" }, { status: 400 });
    }
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
