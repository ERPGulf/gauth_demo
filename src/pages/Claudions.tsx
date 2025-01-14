import CloudServerTable from "@/components/dashboard/CloudServerTable";
import HomeNav from "@/components/dashboard/HomeNav";
import { Button } from "@/components/ui/button";
import { clearSelectedServer } from "@/redux/slices/CloudserverSlice";
import { FileText } from "lucide-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Claudions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearSelectedServer());
  }, [dispatch]);

  return (
    <main className="no_scrollbar flex min-h-screen flex-1 flex-col gap-6 overflow-x-scroll overflow-y-scroll bg-muted ">
      <HomeNav />
      <section className="flex flex-col gap-4 px-3 md:px-8">
        <div className="flex w-full items-center">
          <h1 className="text-2xl font-bold">Claudions</h1>
          <div className="ml-auto flex items-center gap-2 md:gap-4">
            <Button variant={"ghost"} className="gap-2">
              <FileText className="text-secondary" /> Docs
            </Button>
            <Button
              variant={"secondary"}
              onClick={() => navigate("/onboarding")}
            >
              Create Claudion
            </Button>
          </div>
        </div>
        <CloudServerTable />
        <div className="w-full text-right">
          <Button
            variant={"link"}
            className="text-sm font-semibold md:text-base"
          >
            Download CSV
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Claudions;
