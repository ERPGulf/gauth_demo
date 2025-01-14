import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
interface Props {
  annual_amount: number;
  description: string;
  item_code: string;
  item_name: string;
  perpetual_amount: number;
  type: "products" | "service" | "group";
}
const CardPricing = ({
  annual_amount,
  description,
  item_code,
  item_name,
  perpetual_amount,
  type,
}: Props) => {
  const navigate = useNavigate();
  const [paymentPlan, setPaymentPlan] = useState("annual");
  const handleBuy = () => {
    try {
      navigate(`/item-detail/${paymentPlan}/${item_code}/${type}`);
    } catch (error) {
      console.error(`buy error`, error);
    }
  };
  return (
    <Card className="w-[275px]">
      <CardHeader className="w-[275px]">
        <CardTitle className="truncate text-center text-xl">
          {item_name}
        </CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          value={paymentPlan}
          onValueChange={(value) => setPaymentPlan(value)}
          defaultValue={paymentPlan}
        >
          <TabsList className="w-full">
            <TabsTrigger
              value="annual"
              className="w-1/2"
              // onClick={() => handlePlanChange(1, "annual")}
            >
              Annual
            </TabsTrigger>
            <TabsTrigger
              value="perpetual"
              className="w-1/2"
              // onClick={() => handlePlanChange(1, "perpetual")}
            >
              Perpetual
            </TabsTrigger>
          </TabsList>
          <TabsContent value="annual">
            <div className="flex h-[150px] flex-col">
              <div className="flex h-[100px] flex-wrap items-center justify-center">
                <span className="truncate text-xl font-semibold text-blue-600">
                  {annual_amount}-QAR
                </span>{" "}
                <span className="text-xl font-medium text-gray-500">
                  /month
                </span>
                <span className="text-xl font-medium text-gray-500">/dev</span>
              </div>
              <div className="h-[25px] w-full text-center">
                <span className="text-center text-sm text-gray-500">
                  Billed Annually ({item_code})
                </span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="perpetual">
            <div className="flex h-[150px] flex-col">
              <div className="flex h-[100px] flex-wrap items-center justify-center">
                <span className="truncate text-xl font-semibold text-blue-600">
                  {perpetual_amount}-QAR
                </span>{" "}
                <span className="text-xl font-medium text-gray-500">
                  /month
                </span>
                <span className="text-xl font-medium text-gray-500">/dev</span>
              </div>
              <div className="h-[25px] w-full text-center">
                <span className="text-center text-sm text-gray-500">
                  Billed Perpetually ({item_code})
                </span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button className="w-full text-lg font-semibold" onClick={handleBuy}>
          Buy Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardPricing;
