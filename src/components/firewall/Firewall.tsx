import InboundRules from "./InboundRules";
import OutboundRules from "./OutboundRules";

const Firewall = () => {
  return (
    <div className="w-full space-y-4">
      <InboundRules />
      <OutboundRules />
    </div>
  );
};

export default Firewall;
