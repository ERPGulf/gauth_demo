import AccountBalance from "./AccountBalance";
import AccruedCharges from "./AccruedCharges";
import BillingCards from "./BillingCards";
import BillingContact from "./BillingContact";
import BillingHistory from "./BillingHistory";
import OnetimeHistory from "./OnetimeHistory";
import Subcriptionhistory from "./Subcriptionhistory";

const BillingInfo = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3">
        <AccountBalance />
        <AccruedCharges />
        <BillingContact />
        <BillingCards />
      </div>
      <div className="space-y-6">
        <BillingHistory />
        <OnetimeHistory />
        <Subcriptionhistory />
      </div>
    </div>
  );
};

export default BillingInfo;
