import { NextResponse } from "next/server";
import { db } from "@/lib/mongodb";
import { User } from "@/types/user";

export async function GET() {
  try {
    const users = await db
      .collection<User>("user")
      .find({})
      .limit(10)
      .toArray();

    return NextResponse.json(users);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Unable to fetch users" },
      { status: 500 },
    );
  }
}
