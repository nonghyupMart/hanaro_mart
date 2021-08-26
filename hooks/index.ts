import { rootReducer, store } from "../helpers";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;