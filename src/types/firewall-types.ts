// Base interface for rules
export interface Rule {
  protocol: string;
  source: string;
  source_port_range: string;
  destination: string;
  destination_port_range: string;
  description: string;
}

export interface InboundRule extends Rule {}

export interface OutboundRule extends Rule {}

export interface FirewallResponse {
  inbound_rules: InboundRule[];
  outbound_rules: OutboundRule[];
}

export interface FirewallRequest {
  data: {
    inbound_rules: InboundRule[];
    outbound_rules: OutboundRule[];
  };
}
