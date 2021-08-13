import * as FileSystem from "expo-file-system";

import {
  insertMemo,
  updateMemo,
  fetchMemo,
  dropTable,
  deleteMemo,
} from "../../helpers/db";
import { ADD_MEMO, SET_MEMOS, DELETE_MEMO } from "./actionTypes";
import * as Util from "../../utils";

export const addMemo = (title, isChecked) => {
  return async (dispatch) => {
    try {
      const dbResult = await insertMemo(title, isChecked);
      dispatch({
        type: ADD_MEMO,
        memoData: {
          id: dbResult.insertId,
          title: title,
          isChecked: isChecked,
        },
      });
    } catch (err) {
      throw err;
    }
  };
};

export const removeMemo = (id) => {
  return async (dispatch) => {
    try {
      const dbResult = await deleteMemo(id);
      const fetchResult = await fetchMemo();
      dispatch({ type: SET_MEMOS, memos: fetchResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};

export const checkMemo = (id, title, isChecked) => {
  return async (dispatch) => {
    try {
      const dbResult = await updateMemo(id, title, isChecked);
      const fetchResult = await fetchMemo();
      dispatch({ type: SET_MEMOS, memos: fetchResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};

export const loadMemos = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchMemo();
      dispatch({ type: SET_MEMOS, memos: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};
