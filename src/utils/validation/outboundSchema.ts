import * as yup from "yup";

// Regex patterns
const IP_PATTERN =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/; // IP pattern
const PORT_PATTERN = /^([0-9]|[1-9][0-9]{1,3}|[0-9]{4})$/; // Port range pattern

const outboundSchema = yup.object().shape({
  protocol: yup
    .string()
    .required("Protocol is required")
    .oneOf(["tcp", "udp"], "Protocol must be TCP or UDP"),
  source: yup
    .string()
    .required("Source is required")
    .test(
      "valid-subnet-or-any",
      "Outbound source must be a valid subnet (e.g., x.x.x.x/x) or 'any'",
      (value) => {
        const subnetPattern = /^(\d{1,3}\.){3}\d{1,3}\/\d{1,2}$/;
        return subnetPattern.test(value || "") || value.toLowerCase() === "any";
      },
    ),
  destination: yup
    .string()
    .required("Destination is required")
    .test(
      "valid-ip-or-any",
      "Outbound destination must be a valid IP address or 'any'",
      (value) => value.toLowerCase() === "any" || IP_PATTERN.test(value || ""),
    ),
  destination_port_range: yup
    .string()
    .required("Destination port range is required")
    .test(
      "is-valid-port-or-any",
      "Destination port must be between 0-9999 or 'any'",
      function (value) {
        const { protocol } = this.parent;
        if (protocol === "udp") {
          return value === "53" || value.toLowerCase() === "any";
        }
        return value.toLowerCase() === "any" || PORT_PATTERN.test(value || "");
      },
    ),

  source_port_range: yup
    .string()
    .required("Source port range is required")
    .test(
      "is-valid-source-port-or-any",
      "Source port must be between 0-9999 or 'any'",
      (value) =>
        value.toLowerCase() === "any" || PORT_PATTERN.test(value || ""),
    ),

  description: yup.string().required("Description is required"),
});

export default outboundSchema;
