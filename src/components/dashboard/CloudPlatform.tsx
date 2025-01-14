import {
  setApps,
  setCloudPlatform,
  setPlan,
  setRegion,
} from "@/redux/slices/CloudPlatformSlice";
import { selectLogin } from "@/redux/slices/LoginSlice";
import { getDetails } from "@/utils/api/dashboard/API-getDetails";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CloudPlatform = () => {
  const dispatch = useDispatch();
  const isLoggedin = useSelector(selectLogin);
  const { data } = useQuery({
    queryKey: ["GetDetails"],
    queryFn: getDetails,
    enabled: isLoggedin,
  });
  useEffect(() => {
    if (data) {
      dispatch(setCloudPlatform(data?.cloud_platform));
      dispatch(setPlan(data?.plan));
      dispatch(setRegion(data?.region));
      dispatch(setApps(data?.apps));
    }
  }, [data, dispatch]);

  return <div></div>;
};

export default CloudPlatform;
