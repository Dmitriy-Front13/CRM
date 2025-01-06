"use server";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function encrypt() {
  const token = (await cookies()).get('authToken')?.value;
  if (!token) {
    return null;
  }
  return verify(token, process.env.JWT_SECRET!);
}

export async function logOut() {
  const cookieStore = await cookies()
  cookieStore.delete('authToken')
}