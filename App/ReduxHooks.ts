import { useDispatch, useSelector, UseSelector } from "react-redux";

import type { TypedUseSelectorHook } from "react-redux";

import type { RootState, AppDispatch } from "../ReduxApp/store";

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
