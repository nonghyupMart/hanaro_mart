import { rootReducer, store } from "../helpers";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, useRef } from "react";

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// taken from https://usehooks.com/usePrevious/
export const usePrevious = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export const useEffectAllDepsChange = (fn, deps) => {
  const prevDeps = usePrevious(deps);
  const changeTarget = useRef();

  useEffect(() => {
    // nothing to compare to yet
    if (changeTarget.current === undefined) {
      changeTarget.current = prevDeps;
    }

    // we're mounting, so call the callback
    if (changeTarget.current === undefined) {
      return fn();
    }

    // make sure every dependency has changed
    if (changeTarget.current.every((dep, i) => dep !== deps[i])) {
      changeTarget.current = deps;

      return fn();
    }
  }, [fn, prevDeps, deps]);
};
