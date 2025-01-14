import * as yup from "yup";

const SUBNET_PATTERN = /^(\d{1,3}\.){3}\d{1,3}\/\d{1,2}$/;
const PORT_PATTERN = /^([0-9]|[1-9][0-9]{1,3}|[0-9]{4})$/;

const inboundSchema = yup.object().shape({
  protocol: yup
    .string()
    .required("Protocol required")
    .oneOf(["tcp"], "Only 'TCP' is allowed"), // only 'tcp' is allowed
  source: yup
    .string()
    .required("Enter valid subnet or 'any'")
    .test(
      "is-valid-subnet-or-any",
      "Invalid subnet or 'any'",
      function (value) {
        return (
          SUBNET_PATTERN.test(value || "") || value?.toLowerCase() === "any"
        );
      },
    ),
  source_port_range: yup
    .string()
    .required("Enter valid port or 'any'")
    .test(
      "is-valid-port-or-any",
      "Port must be 0-9999 or 'any'",
      function (value) {
        return PORT_PATTERN.test(value || "") || value?.toLowerCase() === "any";
      },
    ),
  destination: yup
    .string()
    .required("Enter valid subnet or 'any'")
    .test(
      "is-valid-subnet-or-any",
      "Invalid subnet or 'any'",
      function (value) {
        return (
          SUBNET_PATTERN.test(value || "") || value?.toLowerCase() === "any"
        );
      },
    ),
  destination_port_range: yup
    .string()
    .required("Enter valid port or 'any'")
    .test(
      "is-valid-port-or-any",
      "Port must be 0-9999 or 'any'",
      function (value) {
        return PORT_PATTERN.test(value || "") || value?.toLowerCase() === "any";
      },
    ),
  description: yup.string().required("Description required"),
});

export default inboundSchema;
