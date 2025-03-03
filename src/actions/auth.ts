"use server";

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export async function getSession() {
  const session = await getServerSession(authOptions);
  return session;
}
