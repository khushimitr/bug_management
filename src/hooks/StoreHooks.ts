import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { ApplicationDispatch, ApplicationState } from "@/store/AppStore.ts";

export const useAppDispatch: () => ApplicationDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ApplicationState> = useSelector;