import Loader from "@/components/Loader";
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthRoute from "./AuthRoute";
import LoginAuthRoute from "./LoginAuthRoute";
import ApiLayout from "@/components/APIs/Layout/ApiLayout";

const Home = lazy(() => import("@/pages/Home"));
const ProductDetails = lazy(() => import("@/pages/ProductDetails"));
const _benchViewLayout = lazy(() => import("@/pages/_benchViewLayout"));
const Claudions = lazy(() => import("@/pages/Claudions"));
const ContactUs = lazy(() => import("@/pages/ContactUs"));
const HelpAndSupport = lazy(() => import("@/pages/HelpAndSupport"));
const Html = lazy(() => import("@/pages/Html"));
const Orderpayment = lazy(() => import("@/pages/Orderpayment"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Cpu = lazy(() => import("@/components/bechviewTabs/Cpu"));
const Network = lazy(() => import("@/components/bechviewTabs/Network"));
const Storage = lazy(() => import("@/components/bechviewTabs/Storage"));
const Memory = lazy(() => import("@/components/bechviewTabs/Memory"));
const Firewall = lazy(() => import("@/components/firewall/Firewall"));
const Countries = lazy(() => import("@/pages/Countries"));
const Backup = lazy(() => import("@/components/bechviewTabs/Backup"));
const BillingInfo = lazy(() => import("@/components/accounts/BillingInfo"));
const LoginHistory = lazy(() => import("@/components/accounts/LoginHistory"));
const Settings = lazy(() => import("@/components/accounts/Settings"));
const _layout = lazy(() => import("@/pages/_layout"));
const _onboardingLayout = lazy(() => import("@/pages/_onboardingLayout"));
const _accountsLayout = lazy(() => import("@/pages/_accountsLayout"));
const _consoleLayout = lazy(() => import("@/pages/_consoleLayout"));
const OnboardingPageIndex = lazy(() => import("@/pages/OnboardingPageIndex"));
const OnboardingPages = lazy(() => import("@/pages/OnboardingPages"));
const OnboardingSignUp = lazy(() => import("@/pages/OnboardingSignUp"));
const OnboardingPricing = lazy(() => import("@/pages/OnboardingPricing"));
const OnboardingServerSettings = lazy(
  () => import("@/pages/OnboardingServerSettings"),
);
const OnboardingUserAgreement = lazy(
  () => import("@/pages/OnboardingUserAgreement"),
);
const Progress = lazy(() => import("@/pages/Progress"));
const InstanceDetails = lazy(() => import("@/pages/InstanceDetails"));
const Login = lazy(() => import("@/pages/Login"));
const Signup = lazy(() => import("@/pages/Signup"));
const OTPverify = lazy(() => import("@/pages/OTPverify"));
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"));
const UpdatePassword = lazy(() => import("@/pages/UpdatePassword"));
const CreateUser = lazy(() => import("@/pages/CreateUser"));
const BackendApi = lazy(() => import("@/pages/BackendApi"));
const MasterAuth = lazy(() => import("@/components/APIs/MasterAuth"));
const ApiList = lazy(() => import("@/components/APIs/ApiList"));
const UserAuth = lazy(() => import("@/components/APIs/UserAuth"));
const MasterEncryptionAuth = lazy(() => import("@/components/APIs/MasterEncryptionAuth"));
const UserEncryptionAuth = lazy(() => import("@/components/APIs/UserEncryptionAuth"));
const CreateUserAuth = lazy(() => import("@/components/APIs/CreateUserAuth"));
const ResetPasswordKeyAuth = lazy(() => import("@/components/APIs/ResetPasswordKeyAuth"));
const DeleteUserAuth = lazy(() => import("@/components/APIs/DeleteUserAuth"));
const AccountBalanceAuth = lazy(() => import("@/components/APIs/AccountBalanceAuth"));
const CountryRestriction = lazy(() => import("@/components/APIs/CountryRestriction"));
const CustomerDetailsAuth = lazy(() => import("@/components/APIs/CustomerDetailsAuth"));
const RandomPasswordAuth = lazy(() => import("@/components/APIs/RandomPasswordAuth"));
const UploadFilesAuth = lazy(() => import("@/components/APIs/UploadFilesAuth"));
const TestRedirectAuth = lazy(() => import("@/components/APIs/TestRedirectAuth"));
const IsApiRequestAuth = lazy(() => import("@/components/APIs/IsApiRequestAuth"));
const LogDetailsAuth = lazy(() => import("@/components/APIs/LogDetailsAuth"));
const EnableUserAuth = lazy(() => import("@/components/APIs/EnableUserAuth"));
const IsUserAvailableAuth = lazy(() => import("@/components/APIs/IsUserAvailableAuth"));
const UpdatePasswordAuth = lazy(() => import("@/components/APIs/UpdatePasswordAuth"));
const UpdatePasswordUsertokenAuth = lazy(() => import("@/components/APIs/UpdatePasswordUsertokenAuth"));
const LoginAuth = lazy(() => import("@/components/APIs/LoginAuth"));
const SwaggerPage = lazy(() => import("@/pages/SwaggerPage"));






const OnboardingRoutes = () => (
  <Route path="/onboarding" element={<_onboardingLayout />}>
    <Route index element={<OnboardingPageIndex />} />
    <Route path="pages/:id" element={<OnboardingPages />} />
    <Route path="signup" element={<OnboardingSignUp />} />
    <Route path="pricing" element={<OnboardingPricing />} />
    <Route path="server-settings" element={<OnboardingServerSettings />} />
    <Route path="user-agreement" element={<OnboardingUserAgreement />} />
  </Route>
);

const AccountRoutes = () => (
  <Route path="account" element={<_accountsLayout />}>
    <Route index element={<Navigate to="billing-info" replace />} />
    <Route path="billing-info" element={<BillingInfo />} />
    <Route path="users-grants" element={<div>Users & Grants</div>} />
    <Route path="login-history" element={<LoginHistory />} />
    <Route path="service-transfer" element={<div>Service Transfer</div>} />
    <Route path="maintenance" element={<div>Maintenance</div>} />
    <Route path="settings" element={<Settings />} />
  </Route>
);

const ClaudionsRoutes = () => (
  <Route path="claudions/:id" element={<_benchViewLayout />}>
    <Route index element={<Navigate to="cpu" replace />} />
    <Route
      path="cpu"
      element={
        <Suspense fallback={<Loader />}>
          <Cpu />
        </Suspense>
      }
    />
    <Route path="network" element={<Network />} />
    <Route path="storage" element={<Storage />} />
    <Route path="memory" element={<Memory />} />
    <Route path="firewall" element={<Firewall />} />
    <Route path="country" element={<Countries />} />
    <Route path="backup" element={<Backup />} />
  </Route>
);

const Router = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            <LoginAuthRoute>
              <Login />
            </LoginAuthRoute>
          }
        />
       
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp-verify" element={<OTPverify />} />
        <Route path="/CreateUser" element={<CreateUser />} />
        <Route path="/BackendApi" element={<BackendApi />} />
        <Route path="SwaggerPage" element={<SwaggerPage />} />

        <Route path="/api" element={<ApiLayout />}> 

        <Route path="MasterAuth" element={<MasterAuth />} />
        <Route index  element={<ApiList />} />
        <Route path="UserAuth" element={<UserAuth />} />
        <Route path="EnableUserAuth" element={<EnableUserAuth />} />
        <Route path="MasterEncryptionAuth" element={<MasterEncryptionAuth />} />
        <Route path="UserEncryptionAuth" element={<UserEncryptionAuth />} />
        <Route path="CreateUserAuth" element={<CreateUserAuth />} />
        <Route path="IsUserAvailableAuth" element={<IsUserAvailableAuth />} />
        <Route path="UpdatePasswordAuth" element={<UpdatePasswordAuth />} />
        <Route path="UpdatePasswordUsertokenAuth" element={<UpdatePasswordUsertokenAuth />} />

        <Route path="ResetPasswordKeyAuth" element={<ResetPasswordKeyAuth />} />
        <Route path="DeleteUserAuth" element={<DeleteUserAuth />} />
        <Route path="AccountBalanceAuth" element={<AccountBalanceAuth />} />
        <Route path="CountryRestriction" element={<CountryRestriction />} />
        <Route path="CustomerDetailsAuth" element={<CustomerDetailsAuth />} />
        <Route path="RandomPasswordAuth" element={<RandomPasswordAuth />} />
        <Route path="UploadFilesAuth" element={<UploadFilesAuth />} />
        <Route path="TestRedirectAuth" element={<TestRedirectAuth />} />
        <Route path="IsApiRequestAuth" element={<IsApiRequestAuth />} />
        <Route path="LogDetailsAuth" element={<LogDetailsAuth />} />
        <Route path="LoginAuth" element={<LoginAuth />} />
       
        </Route>






        {/* Onboarding Routes */}
        {OnboardingRoutes()}
        {/* Main Layout */}
        <Route
          path="/console"
          element={
            <AuthRoute>
              <_consoleLayout />
            </AuthRoute>
          }
        >
          {/* Claudions Routes */}
          <Route path="*" element={<NotFound />} />
          <Route path="contactus" element={<ContactUs />} />
          <Route path="help" element={<HelpAndSupport />} />
          <Route index element={<Navigate to="claudions" replace />} />
          <Route path="claudions" element={<Claudions />} />
          <Route path="progress" element={<Progress />} />
          <Route path="instance-details" element={<InstanceDetails />} />
          {ClaudionsRoutes()}

          {/* Account Routes */}
          {AccountRoutes()}
        </Route>
        <Route path="/" element={<_layout />}>
          <Route path="*" element={<NotFound />} />
          <Route index element={<Home />} />
          {/* Other Routes */}
          <Route path="/pricing" element={<Pricing />} />
          <Route
            path="/item-detail/:payment_plan/:item_code/:type"
            element={<ProductDetails />}
          />
          <Route path="/order-payment" element={<Orderpayment />} />
          <Route path="/html" element={<Html />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Router;
