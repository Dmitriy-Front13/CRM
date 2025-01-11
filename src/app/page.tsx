import AuthForm from "@/components/auth/auth-form";
import { LoggedInView } from "@/components/auth/loggined-view";
import { encrypt } from "@/actions/auth/actions";
export default async function AuthPage() {
  const user = await encrypt();
  if (user) return <LoggedInView user={user} />;
  return <AuthForm />;
}
