'use server';

import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export interface IUser {
  fullName: string;
  position: string;
}
export async function logOut() {
  const cookieStore = await cookies()
  cookieStore.delete('authToken')
  redirect("/");
}

export const encrypt = async () => {
  const token = (await cookies()).get('authToken')?.value;
  if (!token) {
    return null;
  }
  try {
    const user = verify(token, process.env.JWT_SECRET!)
    return user as IUser;
  } catch {
    return null
  }
}