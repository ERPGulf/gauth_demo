import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { setLoggedIn } from "@/redux/slices/LoginSlice";
import { LogOut } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
interface LogoutConfrimProps {
  type?: "link" | "button";
  isOpen?: boolean;
}

const LogoutConfrim: React.FC<LogoutConfrimProps> = ({
  type = "button",
  isOpen,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    dispatch(setLoggedIn(false));
    toast.info("Logged out successfully");
    navigate("/");
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {type === "button" ? (
          <Button
            variant={"destructive"}
            size={"icon"}
            className="w-full space-x-1"
          >
            <LogOut /> {isOpen && <p>Log out</p>}
          </Button>
        ) : (
          <Button variant={"link"} className="p-0 font-semibold text-red-500">
            Sign out
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
          <AlertDialogDescription>
            Logging out will end your current session. Your account and data
            will remain safe.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleLogout}
            className="bg-destructive text-white hover:bg-red-700"
          >
            Log out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutConfrim;
