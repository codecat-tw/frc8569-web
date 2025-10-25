"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session) throw new Error("No session found");

  return session;
}
