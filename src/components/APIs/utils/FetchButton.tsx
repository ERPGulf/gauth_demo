import React from "react";
import { Button } from "@/components/ui/button";

interface FetchButtonProps {
  onClick: () => void;
  label: string;
  loading: string | boolean | null;
}

const FetchButton: React.FC<FetchButtonProps> = ({ onClick, label, loading }) => {
  return (
    <Button
      onClick={onClick}
      className="mt-4 w-full py-3 sm:py-4 bg-primary/90 text-white rounded-lg hover:bg-primary/70"
      disabled={Boolean(loading)}
    >
      {loading ? "Loading..." : label}
    </Button>
  );
};

export default FetchButton;
