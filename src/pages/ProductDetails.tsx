import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { setProduct } from "@/redux/slices/ProductSlice";
import { setTotal } from "@/redux/slices/TotalSlice";
import { getProductById } from "@/utils/api/product/API-products";
import { useQuery } from "@tanstack/react-query";
import { Dot, LoaderCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { item_code, type, payment_plan } = useParams();
  const isAnnual = payment_plan === "annual";
  const handleCheckout = () => {
    // localStorage.setItem("Total", data.amount.toString());
    dispatch(
      setProduct({
        product: data.item_code,
        description: data.description,
        amount: isAnnual ? data.annual_amount : data.perpetual_amount,
        amountType: isAnnual ? "Annual" : "Perpetual",
      }),
    );
    dispatch(setTotal(isAnnual ? data.annual_amount : data.perpetual_amount));
    navigate("/order-payment");
  };
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [type, item_code],
    queryFn: () => getProductById(type, item_code),
  });

  const handlePlanChange = (plan: string) => {
    navigate(`/item-detail/${plan}/${item_code}/${type}`, {
      replace: true,
    });
  };
  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col bg-muted/40">
      <Dialog open={isError}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Something went wrong!.</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <div className="space-x-2">
            <Button onClick={() => refetch()}>Retry</Button>
            <Button onClick={() => navigate(-1)} variant={"outline"}>
              Go back
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <header className="flex w-full flex-col items-center space-y-2 py-5">
        {isLoading ? (
          <>
            <Skeleton className="h-[16px] w-48 rounded-sm" />
            <Skeleton className="h-[30px] w-80 rounded-sm" />
          </>
        ) : (
          <>
            <h3 className="text-3xl font-medium">{data?.item_name}</h3>
            <span className="text-sm text-muted-foreground">
              {data?.description}
            </span>
          </>
        )}
      </header>
      <section className="w-[80vw] self-center">
        <div className="flex w-full flex-col gap-y-4">
          <span className="text-sm font-normal text-muted-foreground">
            Choose a plan:
          </span>
          <div className="flex w-full space-x-3">
            <div className="flex w-[70%] flex-row gap-x-4">
              {isLoading ? (
                <>
                  <Skeleton className="h-[250px] w-[400px]" />
                  <Skeleton className="h-[250px] w-[400px]" />
                </>
              ) : (
                <>
                  <Card
                    onClick={() => handlePlanChange("annual")}
                    className={`h-[250px] w-[400px] ${isAnnual ? "ring-4 ring-primary" : "border-muted-foreground"}`}
                  >
                    <CardHeader className="text-center">
                      <CardTitle className="text-lg">Annual</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex w-full flex-col">
                        <ul className="text-sm">
                          <li className="flex items-center">
                            <Dot />
                            Development use :{" "}
                            <span className="font-medium text-primary">
                              1 Year
                            </span>
                          </li>
                          <li className="flex items-center">
                            <Dot />
                            Production use :{" "}
                            <span className="font-medium text-primary">
                              Annual
                            </span>
                          </li>
                          <li className="flex items-center">
                            <Dot />
                            Updates :{" "}
                            <span className="font-medium text-primary">
                              1 Year
                            </span>
                          </li>
                          <li className="flex items-center">
                            <Dot />
                            Support :{" "}
                            <span className="font-medium text-primary">
                              1 Year
                            </span>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                  <Card
                    onClick={() => handlePlanChange("perpetual")}
                    className={`h-[250px] w-[400px] ${isAnnual ? "border-muted-foreground" : "ring-4 ring-primary"}`}
                  >
                    <CardHeader className="text-center">
                      <CardTitle className="text-lg">perpetual</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex w-full flex-col">
                        <ul className="text-sm">
                          <li className="flex items-center">
                            <Dot />
                            Development use :{" "}
                            <span className="font-medium text-primary">
                              1 Month
                            </span>
                          </li>
                          <li className="flex items-center">
                            <Dot />
                            Production use :{" "}
                            <span className="font-medium text-primary">
                              Prepetual
                            </span>
                          </li>
                          <li className="flex items-center">
                            <Dot />
                            Updates :{" "}
                            <span className="font-medium text-primary">
                              1 Month
                            </span>
                          </li>
                          <li className="flex items-center">
                            <Dot />
                            Support :{" "}
                            <span className="font-medium text-primary">
                              1 Month
                            </span>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
            <div className="flex h-fit w-[30%] flex-col items-center space-y-3">
              <div className="flex h-fit w-full flex-col items-center rounded-lg border-2  p-3">
                <div className="flex w-[70%] justify-between text-base font-normal text-muted-foreground">
                  <span>Licenses</span>
                  <span>1</span>
                </div>
                <div className="flex w-[70%] justify-between text-base font-normal text-muted-foreground">
                  <span>Unit Price</span>
                  <span>1</span>
                </div>
                <div className="flex w-[70%] justify-between text-lg font-semibold">
                  <span>Total</span>
                  {isLoading ? (
                    <span className="flex items-center">
                      <LoaderCircle className="animate-spin" />
                    </span>
                  ) : (
                    <span>
                      {isAnnual ? data?.annual_amount : data?.perpetual_amount}{" "}
                      QAR
                    </span>
                  )}
                </div>
              </div>
              <Button
                className="w-full text-base font-medium"
                onClick={handleCheckout}
              >
                Process to Checkout
              </Button>
            </div>
          </div>
          <span className="text-xs font-light">
            Now select plan : {isAnnual ? "Annual" : "Perpetual"}
          </span>
        </div>
      </section>
    </main>
  );
};

export default ProductDetails;
