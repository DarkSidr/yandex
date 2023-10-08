import { useDispatch } from "react-redux";
import { AppDispatch } from "../types";

type DispatchFunc = () => AppDispatch;

export const useAppDispatch: DispatchFunc = useDispatch;
