import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { sendUserOtp } from "@/utils/api/auth/API-auth";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { mutateAsync: reset, isPending: validatePending } = useMutation({
    mutationFn: ({ email, phone }: { email: string; phone: string }) =>
      sendUserOtp(email, phone),
    onSuccess: async (variables) => {
      toast.success("Reset code sent successfully");
      console.log(variables);
      navigate("/update-password", {
        state: {
          email: email,
        },
      });
    },
    onError: (error: Error) => {
      setError(`${error}`);
    },
    retry: 0,
  });

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !phone) {
      setError("Email and phone number are required");
      return;
    }
    await reset({ email, phone });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full md:w-1/3">
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your email address and phone number.We will send you a otp to
            reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="mb-4 mt-1"
                required={true}
              />
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                type="text"
                id="phone"
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="mb-4 mt-1"
                required={true}
              />

              {error && (
                <p className="border-l-4 border-red-500 pl-3 text-left text-sm font-semibold text-red-500">
                  {error}
                </p>
              )}

              {validatePending ? (
                <Button type="submit" className="mt-4 w-full" disabled={true}>
                  <LoaderCircle className="animate-spin" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="mt-4 w-full"
                  onClick={handleReset}
                >
                  Send Reset Code
                </Button>
              )}
              <div className="mt-4">
                <Link to="/login" className="text-blue-500">
                  Back to login
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
