import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "./store";

type DispatchFunction = () => AppDispatch;

export const useAppDispatch: DispatchFunction = useDispatch;

export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;