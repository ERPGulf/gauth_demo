import { InboundRule, OutboundRule } from "@/types/firewall-types";

export const sanitizeInboundData = (data: InboundRule): InboundRule => {
  const sanitizedData = { ...data };

  // Handle 'any' for source and destination
  sanitizedData.source =
    sanitizedData.source === "any" ? "0.0.0.0/0" : sanitizedData.source;
  sanitizedData.source_port_range =
    sanitizedData.source_port_range === "any"
      ? "80"
      : sanitizedData.source_port_range;
  sanitizedData.destination_port_range =
    sanitizedData.destination_port_range === "any"
      ? "8080"
      : sanitizedData.destination_port_range;

  // Ensure protocol is 'tcp'
  sanitizedData.protocol =
    sanitizedData.protocol !== "tcp" ? "tcp" : sanitizedData.protocol;

  return sanitizedData;
};
export const sanitizeOutboundData = (data: OutboundRule): OutboundRule => {
  const sanitizedData = { ...data };

  if (sanitizedData.destination_port_range === "53") {
    sanitizedData.protocol = "udp";
  }
  // Handle 'any' for source and destination
  sanitizedData.source =
    sanitizedData.source === "any"
      ? "0.0.0.0"
      : sanitizedData.source.split("/")[0];
  sanitizedData.source_port_range =
    sanitizedData.source_port_range === "any"
      ? "80"
      : sanitizedData.source_port_range;
  sanitizedData.destination_port_range =
    sanitizedData.destination_port_range === "any"
      ? "8080"
      : sanitizedData.destination_port_range;
  sanitizedData.destination =
    sanitizedData.destination === "any"
      ? "1.0.0.0"
      : sanitizedData.destination.split("/")[0];
  return sanitizedData;
};
