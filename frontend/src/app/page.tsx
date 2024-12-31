"use client";
import AuthForm from "@/components/auth/auth-form";
import { useAuth } from "@/components/auth/auth-provider";
export default function AuthPage() {
  const { user } = useAuth();
  if (user) return <div>Already logged in</div>;
  return <AuthForm />;
}
