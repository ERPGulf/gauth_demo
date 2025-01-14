import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getOnboardingPricing } from "@/utils/api/onboarding/API-onboardingPricing";
import { getCoupon } from "@/utils/api/product/API-products";
import { useQuery, useMutation } from "@tanstack/react-query";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  calculateServiceCoverAmount,
  calculateAdditionalAmount,
} from "@/utils/helper/onboardingpricing-helper";
//import OnboardingPayment from "@/components/payment/onboardingPayment";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { setProgress } from "@/redux/slices/ProgressSlice";
import OnboardingPricingSkeleton from "@/components/Skeltons/OnboardingPricingSkeleton";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { selectUserSelection } from "@/redux/slices/UserSelectionSlice";
import ServerDetails from "@/components/onboarding/ServerDetails";
import {
  addSelection,
  removeSelection,
  selectUserPlanSelection,
} from "@/redux/slices/PlanSelectionSlice";
import { selectLogin } from "@/redux/slices/LoginSlice";
import {
  FloatingInput,
  FloatingLabel,
} from "@/components/ui/floating-input-label";

const OnboardingPricing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectLogin);

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [termsAndConditions, setTermsAndConditions] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [discountApplied, setDiscountApplied] = useState<boolean>(false);
  const [couponError, setCouponError] = useState<string>("");

  const item_code = localStorage.getItem("item_code");
  const userSelection = useSelector(selectUserSelection);
  const selections = useSelector(selectUserPlanSelection);

  useEffect(() => {
    if (!item_code) {
      toast.error("Item code not found");
      navigate("/onboarding");
      return;
    }
  }, [item_code, navigate]);
  useEffect(() => {
    dispatch(setProgress(90));
  }, [dispatch]);

  const handleProceed = () => {
    if (!termsAndConditions) {
      toast.error("Please agree to terms and conditions");
      return;
    }
    if (!isLoggedIn) {
      navigate("/onboarding/signup", {
        state: { from: "/onboarding/user-agreement" },
      });
      return;
    }

    navigate("/onboarding/user-agreement");
  };

  // Fetching pricing details
  const {
    data: pricingDetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["onboardingPricing"],
    queryFn: () => {
      if (item_code) {
        return getOnboardingPricing(item_code);
      } else {
        throw new Error("Item code is null");
      }
    },
    enabled: !!item_code,
  });

  // Fetching coupon data
  const { mutateAsync: couponMutate, isPending } = useMutation({
    mutationFn: (couponCode: string) => getCoupon(couponCode),
    onSuccess: (data) => {
      // Check if the coupon is valid for the selected product (by checking the item code in the pricing items)
      if (
        data.pricing_items.every(
          (item: { item_code: string }) => item_code !== item.item_code,
        )
      ) {
        setCouponError(
          "The coupon code you have entered is not valid for the selected product",
        );
        setDiscount(0);
        setDiscountApplied(false);
        return;
      }
      setCouponError("");
      // Calculate the discount based on the margin type
      if (data.margin_type === "Percentage") {
        setDiscount(totalAmount * (data.margin_rate_or_amount / 100));
      } else {
        setDiscount(data.margin_rate_or_amount);
      }

      setDiscountApplied(true);
      localStorage.setItem("coupon", coupon);
      toast.success("Coupon applied successfully");
    },
    onError: () => {
      setDiscount(0);
      setDiscountApplied(false);
      // toast.error(" The coupon code you have entered not valid for the selected product");
      setCouponError(
        "The coupon code you have entered is not valid for the selected product",
      );
    },
  });

  const handleCouponApply = async () => {
    try {
      if (!coupon) {
        // toast.error("Please enter a coupon code");
        setCouponError("Please enter a coupon code");
        return;
      }
      await couponMutate(coupon);
    } catch (error) {
      console.error("Error applying coupon:", error);
    }
  };

  // Calculate the service cover amount, using useMemo for optimization
  const serviceCoverAmount = useMemo(() => {
    if (!pricingDetails?.options) return 0;
    return calculateServiceCoverAmount(pricingDetails.options);
  }, [pricingDetails?.options]);

  // Calculate the additional amount based on selected options
  const additionalAmount = useMemo(() => {
    if (!pricingDetails?.options) return 0;
    return calculateAdditionalAmount(pricingDetails.options, selectedOptions);
  }, [pricingDetails?.options, selectedOptions]);

  const totalAmount = useMemo(() => {
    return serviceCoverAmount + additionalAmount;
  }, [serviceCoverAmount, additionalAmount]);

  const totalAmountWithDiscount = useMemo(() => {
    return totalAmount - discount;
  }, [totalAmount, discount]);

  //save the total amount in local storage
  useEffect(() => {
    localStorage.setItem("totalAmount", totalAmountWithDiscount.toString());
  }, [totalAmountWithDiscount]);

  const handleTermsAndConditions = useCallback(() => {
    setTermsAndConditions((prev) => !prev);
  }, []);

  const handleOptionToggle = useCallback(
    (optionName: string) => {
      setSelectedOptions((prev) =>
        prev.includes(optionName)
          ? prev.filter((item) => item !== optionName)
          : [...prev, optionName],
      );
      if (selections.includes(optionName)) {
        dispatch(removeSelection(optionName));
      } else {
        dispatch(addSelection(optionName));
      }
      console.log(selections);
    },
    [dispatch, selectedOptions, selections],
  );

  if (isLoading) return <OnboardingPricingSkeleton />;
  if (isError || !pricingDetails || !item_code) {
    return (
      <div className="flex h-fit w-11/12 flex-col items-center justify-center space-y-8 md:w-[525px] ">
        <div className="flex min-h-[650px] w-full flex-col items-center space-y-4 rounded-3xl  bg-transparent px-6 py-7 shadow-sm md:px-14">
          <h2 className="mt-48 text-2xl font-medium text-primary">
            Something went wrong
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Sorry, something went wrong. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <h2 className="mb-6 text-center text-2xl font-medium text-primary md:text-4xl">
        Your Quote
      </h2>
      <Card className="-space-y-5 border border-l-[5px] border-l-secondary dark:border-y-0 dark:border-r-0 dark:bg-gray-100">
        <CardHeader>
          <CardTitle className="text-primary">Chosen options:</CardTitle>
        </CardHeader>
        <CardContent className="-space-y-4">
          {userSelection.selectedServer &&
            userSelection.selectedHost &&
            userSelection.selectedSize && (
              <>
                <ServerDetails
                  xs={true}
                  currBlock={userSelection.selectedServer}
                />
                <ServerDetails
                  xs={true}
                  currBlock={userSelection.selectedHost}
                />
                <ServerDetails
                  xs={true}
                  currBlock={userSelection.selectedSize}
                />
              </>
            )}
        </CardContent>
      </Card>

      <Card className="border-none dark:bg-gray-100">
        <CardHeader className="text-primary">
          <div className="flexjustify-between">
            <CardTitle className="text-lg font-thin">Service Covers</CardTitle>
            <CardTitle className="text-lg font-thin">
              QAR {serviceCoverAmount} / Month
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="text-primary">
          {pricingDetails.options
            .filter((option) => option.enable === 1 && option.included === 1)
            .map((option, index) => (
              <React.Fragment key={index}>
                <Separator />
                <Accordion type="single" collapsible className="px-4">
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger className="text-sm">
                      {option.option_name}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-500">
                      {option.option_description}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </React.Fragment>
            ))}
        </CardContent>
      </Card>

      {pricingDetails.options
        .filter((option) => option.enable === 1 && option.included === 0)
        .map((option, index) => (
          <Card
            key={index}
            className="border-none text-primary dark:bg-gray-100"
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg">
                {option.option_name}
                <Switch
                  id={`option-${index}`}
                  className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-200 dark:data-[state=checked]:bg-green-500 dark:data-[state=unchecked]:bg-gray-200"
                  checked={selectedOptions.includes(option.option_name)}
                  onCheckedChange={() => handleOptionToggle(option.option_name)}
                />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mr-2 text-sm text-primary">
                {option.option_description}
              </p>
            </CardContent>
          </Card>
        ))}

      <Card className="border-none text-primary dark:bg-gray-100">
        <CardHeader>
          <div className="flex h-[100px] w-full flex-col space-y-2">
            <div className="flex h-[20%] w-full">
              <h4 className="text-sm md:text-base">Your quote</h4>
              <h4 className="ml-auto text-sm md:text-base">
                QAR {serviceCoverAmount}
              </h4>
            </div>
            <div className="flex h-[20%] w-full">
              <h4 className="text-sm md:text-base">Additional Features</h4>
              <h4 className="ml-auto text-sm md:text-base">
                QAR {additionalAmount}
              </h4>
            </div>
            {discountApplied && (
              <div className="flex w-full ">
                <h4 className="text-sm md:text-base">Discount Applied</h4>
                <h4 className="ml-auto text-sm md:text-base">QAR {discount}</h4>
              </div>
            )}
            <div className="flex h-[60%] w-full items-end">
              <h4 className="text-base font-medium md:text-xl">Total</h4>
              <h4 className="ml-auto text-base font-medium md:text-xl">
                QAR {totalAmountWithDiscount}
              </h4>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Card className="space-y-3 bg-primary-foreground p-4 text-primary">
            <CardHeader className="p-1">
              <CardTitle className="text-left">
                Have a coupon? Enter your code here
              </CardTitle>
            </CardHeader>
            <CardContent className=" p-1">
              <div className="flex w-full justify-start space-x-2">
                <div className="relative w-full">
                  <FloatingInput
                    id="coupon"
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="bg-transparent"
                  />
                  <FloatingLabel
                    htmlFor="coupon"
                    className="dark:bg-white peer-focus:dark:bg-primary peer-focus:dark:text-primary-foreground"
                  >
                    Coupon code
                  </FloatingLabel>
                </div>

                <Button
                  className="w-20"
                  onClick={!isPending ? handleCouponApply : undefined}
                >
                  {isPending ? <Loader className="animate-spin" /> : "Apply"}
                </Button>
              </div>
              <p className="ml-2 mt-3 text-xs text-red-500">{couponError}</p>
            </CardContent>
          </Card>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              className="rounded"
              checked={termsAndConditions}
              onClick={handleTermsAndConditions}
            />
            <label htmlFor="terms" className="text-xs md:text-sm">
              I agree to{" "}
              <span className="text-blue-600">Terms and Conditions</span>
            </label>
          </div>

          {/*<OnboardingPayment itemCode={item_code} totalAmount={totalAmount} />*/}
          <Button className="w-full" onClick={handleProceed}>
            Buy Now
          </Button>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <p className="text-center text-xs md:text-sm">
            By continuing, you agree to our <br />
            <span className="text-blue-600">Payment Terms & Conditions</span>
          </p>

          <p className="text-center text-xs text-muted-foreground md:text-sm">
            All payments on this page are protected by SSL
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OnboardingPricing;
