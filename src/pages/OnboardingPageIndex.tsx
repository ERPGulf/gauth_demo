import OnboardingHeader from "@/components/onboarding/OnboardingHeader";
import { Button } from "@/components/ui/button";
import LoginOnboarding from "@/components/onboarding/LoginOnboarding";

import { selectCurrBlock, setCurrBlock } from "@/redux/slices/BlocksSlice";
import {
  selectHeaders,
  selectInitialBlocks,
  setCurrPages,
} from "@/redux/slices/OnboardPagesSlice";
import { sortBlocks } from "@/utils/helper/onboarding-helper";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import ServerBlocks from "@/components/onboarding/ServerBlocks";
import ServerDetails from "@/components/onboarding/ServerDetails";
import { setProgress } from "@/redux/slices/ProgressSlice";
import { setUserSelection } from "@/redux/slices/UserSelectionSlice";
import { MoveRight } from "lucide-react";

const OnboardingPageIndex = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mainBlocks = useSelector(selectInitialBlocks);
  const sortedBlocks = useMemo(() => sortBlocks(mainBlocks), [mainBlocks]);
  const currBlock = useSelector(selectCurrBlock) || sortedBlocks[0];
  const params = useParams();

  const { heading, short_description } = useSelector(selectHeaders);
  useEffect(() => {
    dispatch(setProgress(20));

    // clear coupon code from local storage
    localStorage.removeItem("coupon");
  }, [dispatch]);

  //params is null or undefined set the currBlock to the first block
  useEffect(() => {
    if (params.id === null || params.id === undefined) {
      dispatch(setCurrBlock(sortedBlocks[0]));
    }
  }, [dispatch, params.id, sortedBlocks]);

  const handleBlockSelect = (val: string) => {
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
    if (currBlock.next_page === 0) {
      navigate("/");
      return;
    }
    dispatch(setUserSelection({ page: 1, value: currBlock }));
    dispatch(setCurrPages(currBlock.next_page));
    navigate(`/onboarding/pages/${currBlock.next_page}`);
  };

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

export default OnboardingPageIndex;
