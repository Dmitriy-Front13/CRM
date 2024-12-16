import { useEffect } from "react";
import useCommonStore from "../store/common";

type ReturnProps = {
  statusChoices: any[],
  positions: any[],
  subdivisions: any[],
  roles: any[],
  fetchCommonData: () => Promise<void>;
  
};
export const useCommon = () => {
  const commonState = useCommonStore((state) => state) as ReturnProps;
  useEffect(() => {
    commonState.fetchCommonData();
  }, []);
  return commonState;
};