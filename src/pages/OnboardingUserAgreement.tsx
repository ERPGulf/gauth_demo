import OnboardingPayment from "@/components/payment/onboardingPayment";
import { ScrollArea } from "@/components/ui/scroll-area";

const OnboardingUserAgreement = () => {
  // get the itemcode and total amount from the local storage and convert totalAmount to a number
  const itemCode = localStorage.getItem("item_code");
  const totalAmount = Number(localStorage.getItem("totalAmount"));

  return (
    <>
      <h2 className="text-3xl font-medium lg:text-4xl">User Agreement</h2>
      <div className="w-full ">
        <p className="text-md text-muted-foreground">
          Please read and accept the terms and conditions of the user agreement.
        </p>

        <ScrollArea className=" my-4 h-80 rounded-lg border bg-background bg-scroll p-3">
          <h3 className="text-lg font-medium  text-gray-600 dark:text-white/85">
            1. Acceptance of Agreement
          </h3>
          <p className="my-1 text-sm text-muted-foreground">
            By signing up for, accessing, or using the Services, the User agrees
            to comply with all terms and conditions of this Agreement. If the
            User does not agree to any of the terms, they may not use the
            Services.
          </p>

          <h3 className="text-lg font-medium   text-gray-600 dark:text-white/85">
            2. Definitions
          </h3>
          <p className="my-1 text-sm text-muted-foreground">
            Cloud Serverrefers to the virtual server infrastructure provided by
            the Provider to the User. Services refer to the provision of cloud
            computing resources, including virtual machines, storage, and
            network resources. Data refers to all information, files, and
            content uploaded, stored, or transmitted by the User on the Cloud
            Server.
          </p>

          <h3 className="text-lg font-medium  text-gray-600 dark:text-white/85">
            3. Services Provided
          </h3>
          <p className="my-1 text-sm text-muted-foreground">
            The Provider will provide the User access to virtualized computing
            resources through a cloud server. These resources may include, but
            are not limited to, virtual machines, data storage, and bandwidth.
          </p>

          <h3 className="text-lg font-medium  text-gray-600 dark:text-white/85">
            4. User Responsibilities
          </h3>
          <p className="my-1 text-sm text-muted-foreground">
            The User agrees to use the Services only for lawful purposes and in
            accordance with this Agreement. The User is responsible for
            maintaining the security of their login credentials and ensuring
            that no unauthorized persons access the Services. The User agrees
            not to: Engage in illegal or prohibited activities using the Cloud
            Server. Upload or distribute malicious software or code (such as
            viruses, worms, or trojans). Use the Services in a way that
            negatively impacts other users or the Provider's systems.
          </p>

          <h3 className="text-lg font-medium  text-gray-600 dark:text-white/85">
            5. Data Ownership and Privacy
          </h3>
          <p className="my-1  text-sm text-muted-foreground">
            The User retains ownership of all data they upload or store on the
            Cloud Server. The Provider will not access, modify, or disclose the
            User's data except as necessary to provide the Services or as
            required by law. the User is responsible for maintaining backups of
            their data, and the Provider is not liable for data loss.
          </p>
        </ScrollArea>

        <div className="mt-5 flex justify-center">
          {/* <Button className="w-full" type="submit">Accept and Continue</Button> */}
          <OnboardingPayment
            itemCode={itemCode || ""}
            totalAmount={totalAmount || 0}
          />
        </div>
      </div>
    </>
  );
};

export default OnboardingUserAgreement;
