import { Separator } from "@/components/ui/separator";
import ProductSection from "@/components/product/ProductSection";
import About from "@/components/About";
import Footer from "@/components/Footer";
import GroupSection from "@/components/product/GroupSection";
import { usePageTitle } from "@/hooks/usePageTitle";

const Pricing = () => {
  usePageTitle("Pricing");
  return (
    <main className="flex h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-y-4 overflow-y-scroll bg-muted/40">
      <header className="flex flex-col items-center gap-y-5 py-6">
        <h3 className="text-3xl text-blue-600 ">Pricing</h3>
        <h1 className="text-4xl font-bold">
          Start using Claudion's products{" "}
          <span className="text-blue-600">for free!</span>
        </h1>
        <h3 className="text-sm text-gray-600">
          Switch to a commercial plan to access advanced features & technical
          support.
        </h3>
      </header>
      <ProductSection type="products" />
      <Separator className="my-1 w-10/12 self-center shadow-sm" />
      <ProductSection type="service" />
      <Separator className="my-1 w-10/12 self-center shadow-sm" />
      <GroupSection />
      <div className="w-[80vw] self-center">
        <About />
        {/* <Questions /> */}
        {/* <Comments /> */}
      </div>
      <Footer />
    </main>
  );
};

export default Pricing;
