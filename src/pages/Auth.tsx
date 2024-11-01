import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Button } from "@/components/ui/button";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome to Task Manager</h1>
          <p className="text-gray-600 mt-2">
            {isLogin ? "Sign in to your account" : "Create a new account"}
          </p>
        </div>

        <div className="flex gap-4 justify-center mb-6">
          <Button
            variant={isLogin ? "default" : "outline"}
            onClick={() => setIsLogin(true)}
          >
            Login
          </Button>
          <Button
            variant={!isLogin ? "default" : "outline"}
            onClick={() => setIsLogin(false)}
          >
            Register
          </Button>
        </div>

        {isLogin ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};

export default Auth;