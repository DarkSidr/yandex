import { useDispatch } from "react-redux";
import { AppDispatch } from "../..";

type DispatchFunc = () => AppDispatch;

export const useAppDispatch: DispatchFunc = useDispatch;
