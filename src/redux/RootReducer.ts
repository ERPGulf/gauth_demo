import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "./slices/ProductSlice";
import couponReducer from "./slices/CouponSlice";
import loginReducer from "./slices/LoginSlice";
import totalReducer from "./slices/TotalSlice";
import sidebarReducer from "./slices/SidebarSlice";
import amountReducer from "./slices/AddamountSlice";
import balanceReducer from "./slices/BalanceSlice";
import cloudServerReducer from "./slices/CloudserverSlice";
import onBoardPageReducer from "./slices/OnboardPagesSlice";
import statusFilterReducer from "./slices/StatusSlice";
import blocksReducer from "./slices/BlocksSlice";
import usersReducer from "./slices/userSlice";
import progressReducer from "./slices/ProgressSlice";
import hostnameReducer from "./slices/HostnameSlice";
import cloudPlatformReducer from "./slices/CloudPlatformSlice";
import userSelectionReducer from "./slices/UserSelectionSlice";
import userPlanSelectionReducer from "./slices/PlanSelectionSlice";

const rootReducer = combineReducers({
  product: productReducer,
  coupon: couponReducer,
  login: loginReducer,
  total: totalReducer,
  sidebar: sidebarReducer,
  amount: amountReducer,
  balance: balanceReducer,
  cloudserver: cloudServerReducer,
  onBoardPage: onBoardPageReducer,
  statusFilter: statusFilterReducer,
  blocks: blocksReducer,
  user: usersReducer,
  progress: progressReducer,
  hostname: hostnameReducer,
  cloudPlatform: cloudPlatformReducer,
  userSelection: userSelectionReducer,
  userPlanSelection: userPlanSelectionReducer,
});

export default rootReducer;
