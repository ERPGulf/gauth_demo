import API from "@/utils/api/API-axios";
import API_URL from "@/utils/api/API-URL";
import { setUserTokenHeader } from "../token/API-app";
import { FirewallRequest } from "@/types/firewall-types";
import {
  sanitizeInboundData,
  sanitizeOutboundData,
} from "@/utils/helper/firewall.helper";

export interface Rule {
  protocol: string;
  source: string;
  source_port_range: string;
  destination: string;
  destination_port_range: string;
  description: string;
}

// Update Security List
export const updateSecurityList = async (
  updateData: FirewallRequest,
  hostName: string,
) => {
  try {
    // Sanitize the inbound rules
    const sanitizedInboundRules = updateData.data.inbound_rules.map((rule) =>
      sanitizeInboundData(rule),
    );

    // Sanitize the outbound rules
    const sanitizedOutboundRules = updateData.data.outbound_rules.map((rule) =>
      sanitizeOutboundData(rule),
    );

    // Update the sanitized data in the request object
    const sanitizedUpdateData = {
      ...updateData,
      data: {
        hostname: hostName,
        inbound_rules: sanitizedInboundRules,
        outbound_rules: sanitizedOutboundRules,
      },
    };

    await API.post(API_URL.UPDATESECURITYLIST, sanitizedUpdateData, {
      headers: await setUserTokenHeader(),
    });
    return Promise.resolve();
  } catch (error) {
    console.error("Update Security List:", error);
    return Promise.reject(
      new Error(
        error instanceof Error ? error.message : "An unknown error occurred",
      ),
    );
  }
};
