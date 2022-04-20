import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { calcActions } from "../store/slices/calculator";
import { resultActions } from "../store/slices/result";

const allActions = {...calcActions, ...resultActions};

export const useTypedActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(allActions, dispatch);
};
