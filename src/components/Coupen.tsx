import { getCoupon } from "@/utils/api/product/API-products";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { setCouponPercent } from "@/redux/slices/CouponSlice";
import { toast } from "sonner";

const Coupen = () => {
  const dispatch = useDispatch();
  const [coupen, setCoupen] = useState<string>("");

  const handleSubmit = async () => {
    try {
      const Discount = await getCoupon(coupen);
      const percent = Discount.data.message[0].custom_discount_percentage;
      if (percent) {
        toast("Coupon applied successfully");
        dispatch(setCouponPercent(percent));
      }
    } catch (error) {
      toast("Error applying coupon");
      console.error("Error fetching Coupon:", error);
    }
  };

  return (
    <div className="ml-5 mt-2 flex gap-5">
      <Input
        className=" w-60"
        type="text"
        placeholder="Coupen Code"
        value={coupen}
        onChange={(e) => setCoupen(e.target.value)}
      />
      <Button className="w-60" onClick={handleSubmit}>
        Apply
      </Button>
    </div>
  );
};

export default Coupen;
