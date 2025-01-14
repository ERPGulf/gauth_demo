import OnboardingHeader from "@/components/onboarding/OnboardingHeader";
import { Button } from "@/components/ui/button";
import LoginOnboarding from "@/components/onboarding/LoginOnboarding";
import { selectCurrBlock, setCurrBlock } from "@/redux/slices/BlocksSlice";
import {
  selectCurrBlocks,
  setCurrPages,
} from "@/redux/slices/OnboardPagesSlice";
import { sortBlocks } from "@/utils/helper/onboarding-helper";
import { MoveRight } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import ServerBlocks from "@/components/onboarding/ServerBlocks";
import ServerDetails from "@/components/onboarding/ServerDetails";
import { setProgress } from "@/redux/slices/ProgressSlice";
import { setUserSelection } from "@/redux/slices/UserSelectionSlice";

const OnboardingPages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const pageId = params.id;

  const mainBlocks = useSelector(selectCurrBlocks);
  const sortedBlocks = sortBlocks(mainBlocks);
  const currBlock = useSelector(selectCurrBlock) || sortedBlocks[0];

  useEffect(() => {
    dispatch(setProgress(45));
  }, [dispatch]);

  // Separate useEffect to handle pageId change
  useEffect(() => {
    if (pageId !== null && pageId !== undefined) {
      dispatch(setCurrPages(parseInt(pageId)));
    }
  }, [dispatch, pageId]);
  // Seperate useEffect to handle mainBlocks change
  useEffect(() => {
    if (mainBlocks.length > 0) {
      const sortedBlocks = sortBlocks(mainBlocks);
      dispatch(setCurrBlock(sortedBlocks[0]));
    }
  }, [dispatch, mainBlocks]);

  // const { heading, short_description } = useSelector(selectHeaders);

  // modification for demo purpose, will be changed later
  let heading = "";
  let short_description = "";
  if (pageId == "21") {
    heading = "Where would you like to host?";
    short_description =
      "You can host with Oracle OCI in Jeddah or Riyadh, or with Frappe Cloud in Jeddah. Alternatively, you can share our server for small operations.";
  }

  if (pageId == "211") {
    heading = "What is the size of your company?";
    short_description =
      "This information is used solely for server sizing purposes. We do not limit the number of users in any case.";
  }

  // Moved sortBlocks call inside handleBlockSelect function
  const handleBlockSelect = (val: string) => {
    const sortedBlocks = sortBlocks(mainBlocks);
    const selectedBlock = sortedBlocks.find(
      (block) => block.block_order.toString() === val,
    );
    if (!selectedBlock) {
      toast.error("Error selecting block");
      console.error("Error selecting block: Block not found");
      return;
    }
    dispatch(setCurrBlock(selectedBlock));
  };

  const handleProceed = () => {
    if (!currBlock) {
      toast.error("No plan selected");
      return;
    }

    dispatch(setUserSelection({ page: 3, value: currBlock }));
    if (currBlock.last_page == 1) {
      localStorage.setItem("item_code", currBlock.item_code);

      navigate("/onboarding/pricing");
      return;
    }

    if (currBlock.next_page === 0) {
      navigate("/");
      return;
    }
    console.log(pageId);
    dispatch(
      setUserSelection({
        // page: parseInt(pageId || "2"),
        page: 2,
        value: currBlock,
      }),
    );

    dispatch(setCurrPages(currBlock.next_page));
    navigate(`/onboarding/pages/${currBlock.next_page}`);
  };

  if (mainBlocks.length < 1)
    return (
      <div className="flex w-full flex-1 flex-col items-center space-y-2">
        <h2 className=" mt-48 text-2xl font-medium">Something went wrong</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Sorry, something went wrong. Please try again later.
        </p>
      </div>
    );

  return (
    <div className="flex w-full flex-1 flex-col space-y-6">
      <OnboardingHeader
        heading={heading}
        short_description={short_description}
      />
      <ServerBlocks
        handleBlockSelect={handleBlockSelect}
        currBlock={currBlock}
        sortedBlocks={sortedBlocks}
      />
      <Button onClick={handleProceed} className="h-14 gap-x-3 ">
        <span className="text-lg font-bold">Proceed</span>
        <MoveRight
          style={{
            width: "28px",
            height: "28px",
          }}
        />
      </Button>
      <ServerDetails currBlock={currBlock} />
      <LoginOnboarding />
    </div>
  );
};

export default OnboardingPages;
