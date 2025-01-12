import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logOut, IUser } from "@/actions/auth/actions"; 
interface LoggedInViewProps {
  user: IUser;
}

export function LoggedInView({ user }: LoggedInViewProps) {
  return (
    <div className="flex flex-grow items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Welcome, {user.fullName}!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.fullName}`}
                alt={user.fullName}
              />
              <AvatarFallback>
                {user.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{user.fullName}</h2>
              <p className="text-sm text-gray-500">Logged in successfully</p>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Account Information</h3>
            <p className="text-sm text-gray-500">
              Last login: {new Date().toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">Position: {user.position}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={logOut}>
            Log out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
