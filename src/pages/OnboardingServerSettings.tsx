import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectApps,
  selectCloudPlatform,
  selectPlan,
  selectRegion,
} from "@/redux/slices/CloudPlatformSlice";
import { setHostname } from "@/redux/slices/HostnameSlice";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useCallback, useState } from "react";
import { validateServerParams } from "@/utils/api/onboarding/API-validateServerParams";
import { serverParams, ErrorResponse } from "@/types/serverParams-types";
import { FloatingLabelInput } from "@/components/ui/floating-input-label";
import {
  sharedValidationSchema,
  frappeValidationSchema,
  onboardingValidationSchema,
} from "@/utils/validation/createInstanceSchemas";
import { toast } from "sonner";
import { LaunchComputeInstance } from "@/utils/api/instance/API-shared";
import { LaunchFrappeInstance } from "@/utils/api/instance/API-frappecloud";
import { RefactorCreateInstance } from "@/utils/api/instance/API-createInstance";

function OnboardingServerSettings() {
  const [hostnameError, setHostnameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [erpnextPortError, setErpnextPortError] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const SelectedCloudPlatform = useSelector(selectCloudPlatform) || "";
  const plan = useSelector(selectPlan) || "";
  const region = useSelector(selectRegion) || "";
  const apps = useSelector(selectApps) || "";

  // Determine server type based on SelectedCloudPlatform
  const serverType = (() => {
    switch (SelectedCloudPlatform.toLowerCase()) {
      case "shared":
        return "shared";
      case "frappecloud":
        return "frappe";
      case "oci":
        return "oci";
      default:
        return "shared";
    }
  })();

  const getValidationSchema = (serverType: string) => {
    switch (serverType) {
      case "shared":
        return sharedValidationSchema;
      case "frappe":
        return frappeValidationSchema;
      case "oci":
        return onboardingValidationSchema;
      default:
        return sharedValidationSchema;
    }
  };

  // Define the validation schema based on the server type
  const validationSchema = getValidationSchema(serverType);

  const createInstanceFn = {
    shared: LaunchComputeInstance,
    frappe: LaunchFrappeInstance,
    oci: RefactorCreateInstance,
  }[serverType];

  // Setup form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<serverParams>({
    resolver: yupResolver(validationSchema),
  });

  // Log form errors to check for validation issues
  console.log("Validation errors:", errors);

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["server"],
    mutationFn: (data: serverParams) =>
      createInstanceFn({
        hostname: data.hostName,
        username: data.username ?? "",
        password: data.password,
        ssh_port: data.sshPort ?? "",
        erpnext_port: data.ErpNextPort ?? "",
        city: region,
        plan: plan,
        apps: typeof apps === "string" ? [apps] : (apps ?? []),
        cloud_platform: SelectedCloudPlatform,
      }),
    onSuccess: (response) => {
      console.log("Instance created successfully:", response);
      dispatch(setHostname(response));
      navigate("/console/progress");
    },
    onError: (error) => {
      console.error("Error creating instance:", error);
      toast.error("Error creating instance");
    },
  });

  const { mutateAsync: validateMutateFn, isPending: validatePending } =
    useMutation({
      mutationFn: async (data: serverParams) => {
        console.log("Validating server parameters...");
        return await validateServerParams(data, SelectedCloudPlatform);
      },
      onError: (error: ErrorResponse) => {
        console.error("Validation failed:", error);
        if (error?.hostname) {
          setHostnameError(
            error.hostname + " Please try again with a different hostname",
          );
          setPasswordError("");
          setErpnextPortError("");
        } else if (error?.username) {
          setHostnameError("");
          setPasswordError("");
          setErpnextPortError("");
        } else if (error?.erpnext_port) {
          setHostnameError("");
          setPasswordError("");
          setErpnextPortError(
            error.erpnext_port + " Please enter a valid port number",
          );
        } else if (error?.password) {
          setHostnameError("");
          setPasswordError(
            error.password + " Create a strong password and try again",
          );
          setErpnextPortError("");
        } else {
          toast.error("Error validating server parameters");
          console.error("Error validating server parameters:", error);
        }
      },
      onSuccess: (data, variables) => {
        console.log(data);
        mutateAsync(variables);
      },
    });

  const onSubmit: SubmitHandler<serverParams> = useCallback(
    async (data) => {
      await validateMutateFn(data);
    },
    [validateMutateFn],
  );

  return (
    <>
      <h2 className="text-3xl font-medium lg:text-4xl">Server Parameters</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full p-5">
        <div className="grid gap-2">
          <FloatingLabelInput
            id="hostName"
            type="text"
            {...register("hostName")}
            label="Host Name"
            className="border p-4 lg:p-6"
          />
          <p className="mb-3 px-1 text-xs text-red-500">
            {hostnameError || errors?.hostName?.message}
          </p>

          {/* Conditionally render Username input for onboarding */}
          {serverType === "oci" && (
            <>
              <FloatingLabelInput
                id="username"
                type="text"
                {...register("username")}
                label="Username"
                className="border p-4 lg:p-6"
              />
              <p className="mb-3 px-1 text-xs text-red-500">
                {errors?.username?.message}
              </p>
            </>
          )}

          <FloatingLabelInput
            id="password"
            type="password"
            {...register("password")}
            label="Password"
            className="border p-4 lg:p-6"
          />
          <p className="mb-3 px-1 text-xs text-red-500">
            {passwordError || errors?.password?.message}
          </p>

          <FloatingLabelInput
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            label="Confirm Password"
            className="border p-4 lg:p-6"
          />
          <p className="mb-3 px-1 text-xs text-red-500">
            {errors?.confirmPassword?.message}
          </p>

          <FloatingLabelInput
            id="cloudPlatform"
            type="text"
            value={SelectedCloudPlatform}
            {...register("cloudPlatform")}
            className="hidden border p-4 lg:p-6"
          />

          {/* Conditionally render SSH Port input */}
          {serverType === "oci" && (
            <>
              <FloatingLabelInput
                id="sshPort"
                type="text"
                {...register("sshPort")}
                label="SSH Port Eg: 1234"
                className="border p-4 lg:p-6"
              />
              <p className="mb-3 px-1 text-xs text-red-500">
                {errors?.sshPort?.message}
              </p>
            </>
          )}

          {/* Conditionally render ERPNext Port input for frappe and onboarding */}
          {(serverType === "shared" || serverType === "oci") && (
            <>
              <FloatingLabelInput
                id="ErpNextPort"
                type="text"
                {...register("ErpNextPort")}
                label="ERPNext Port Eg: 5678"
                className="border p-4 lg:p-6"
              />
              <p className="mb-3 px-1 text-xs text-red-500">
                {erpnextPortError || errors?.ErpNextPort?.message}
              </p>
            </>
          )}

          {isPending || validatePending ? (
            <Button type="submit" className="w-full">
              <LoaderCircle className="animate-spin" />
            </Button>
          ) : (
            <Button type="submit" className="w-full">
              Build your server now!
            </Button>
          )}
        </div>
      </form>
    </>
  );
}

export default OnboardingServerSettings;
