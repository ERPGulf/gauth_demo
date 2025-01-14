import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectProduct } from "@/redux/slices/ProductSlice";
import { selectCoupon } from "@/redux/slices/CouponSlice";
import { setTotal } from "@/redux/slices/TotalSlice";
import { selectLogin } from "@/redux/slices/LoginSlice";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { useMutation } from "@tanstack/react-query";
import { getCoupon } from "@/utils/api/product/API-products";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import OrderPayment from "@/components/payment/OrderPayment";

const Orderpayment: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectLogin);
  const selectedProduct = useSelector(selectProduct);
  const couponPercent = useSelector(selectCoupon);
  const [TOTAL, setTOTAL] = useState<number>(selectedProduct.amount);
  const [coupon, setCoupon] = useState<string>("");
  const { mutateAsync: couponMutate, isPending } = useMutation({
    mutationFn: (couponCode: string) => getCoupon(couponCode),
    onSuccess: (data) => {
      setTOTAL(calculateDiscountedPrice(selectedProduct.amount, data));
      dispatch(
        setTotal(calculateDiscountedPrice(selectedProduct.amount, data)),
      );
      toast.success("Coupon applied successfully");
    },
    onError: () => {
      toast.error("Error applying coupon");
    },
  });
  const handleCouponApply = async () => {
    try {
      if (!coupon) {
        toast.error("Please enter a coupon code");
        return;
      }
      await couponMutate(coupon);
    } catch (error) {
      console.error("Error applying coupon:", error);
    }
  };

  function calculateDiscountedPrice(amount: number, percent: number) {
    // Convert discount percentage to decimal
    const discountDecimal = percent / 100;

    // Calculate discounted price
    const discountedPrice = amount - amount * discountDecimal;

    // Return discounted price
    return discountedPrice;
  }
  const dispatch = useDispatch();

  useEffect(() => {
    // Calculate discounted price if coupon applied
    if (couponPercent && selectedProduct) {
      const discountedPrice = calculateDiscountedPrice(
        selectedProduct.amount,
        couponPercent,
      );
      dispatch(setTotal(discountedPrice));
    } else {
      // Set total to the initial selected product amount

      dispatch(setTotal(selectedProduct?.amount || 0));
    }
  }, [selectedProduct, couponPercent]);

  const [fullname, setFullname] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [id, setId] = useState<string>("");

  const handleRedirect = (url: string) => {
    navigate(url, { state: { from: "/order-payment" } });
  };
  return (
    <main className="no_scrollbar flex h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-5 overflow-y-scroll bg-muted/40 px-16 py-6 2xl:px-32">
      <header className="w-full">
        <span className="text-3xl font-medium">Billing Details</span>
      </header>
      <div className="flex flex-row space-x-6">
        <div className="w-full">
          <div className="space-y-2.5">
            <div className="flex space-x-2.5">
              <Input
                type="text"
                placeholder="Full name"
                required
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
              <Input
                placeholder="ID"
                required
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <Input
              className="mt-1"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              className="mt-1"
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              className="mt-1"
              type="tel"
              placeholder="Mobile Number"
              required
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <Input
              className="mt-1"
              type="text"
              placeholder="Company name (optional)"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <Input
              className="mt-1"
              type="text"
              placeholder="Country / Region"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <Input
              className="mt-1"
              type="text"
              placeholder="Street address"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
            <Input
              className="mt-1"
              type="text"
              placeholder="Town / City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <Input
              className="mt-1"
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            <Input
              className="mt-1"
              type="text"
              placeholder="Postcode / ZIP"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-3">
          <span className="text-2xl font-bold">Your order</span>
          <div className="flex justify-between rounded-md border p-5">
            <div className="flex flex-col gap-5 text-base font-semibold">
              <span>Product</span>
              <span>Subtotal</span>
              <span>Discount after using coupen</span>
              <span>VAT</span>
              <span>Total</span>
            </div>
            <div className="flex flex-col gap-5 text-base">
              <span>SubTotal</span>
              <span>QAR {selectedProduct.amount}</span>
              <span> QAR {selectedProduct.amount - TOTAL}</span>
              <span>QAR 0.00</span>

              <span>QAR {TOTAL}</span>
            </div>
          </div>
          <div className="w-[400px] space-y-3 rounded-md border p-5">
            <span className="text-sm font-bold">
              Have a coupon? Enter your code here
            </span>
            <div className="flex space-x-2.5">
              <Input
                type="text"
                placeholder="Coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              {isPending ? (
                <Button className="w-20">
                  <Loader className="animate-spin" />
                </Button>
              ) : (
                <Button className="w-20" onClick={handleCouponApply}>
                  Apply
                </Button>
              )}
            </div>
          </div>
          <div className="w-[400px] rounded-md border p-5">
            {isLoggedIn ? (
              <div className="w-full space-y-3">
                <span className="text-sm">
                  By clicking Place order, I agree with the terms of the license
                  agreement, privacy policy and terms and conditions. I also
                  agree to the refund policy.
                </span>
                <OrderPayment />
              </div>
            ) : (
              <div className="w-full space-y-3">
                <span className="text-sm font-bold">
                  To continue, please create an account or login.
                </span>
                <Button
                  className="w-full"
                  onClick={() => handleRedirect("/login")}
                >
                  Login
                </Button>
                <div className="flex w-full items-center justify-center space-x-2">
                  <Separator className="w-[40%]" />
                  <span className="text-sm">or</span>
                  <Separator className="w-[40%]" />
                </div>
                <Button
                  variant={"outline"}
                  className="w-full"
                  onClick={() => handleRedirect("/signup")}
                >
                  Create Account
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Orderpayment;
