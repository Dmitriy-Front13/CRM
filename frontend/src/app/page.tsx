"use client";
import AuthForm from "@/components/auth/auth-form";
import { useAuth } from "@/components/auth/auth-provider";
import { LoggedInView } from "@/components/auth/loggined-view";
import { logOut } from "@/services/auth";
export default function AuthPage() {
  const { user, setUser } = useAuth();
  const logout = async () => {
    try {
      await logOut();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };
  if (user) return <LoggedInView user={user} logout={logout} />;
  return <AuthForm />;
}
