import Memo from "../../models/Memo";
import { SET_MEMOS, ADD_MEMO } from "../actions/actionTypes";

const initialState = {
  memos: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MEMOS:
      return {
        memos: action.memos.map(
          (m) => new Memo(m.id.toString(), m.title, m.isChecked)
        ),
      };
    case ADD_MEMO:
      const newMemo = new Memo(
        action.memoData.id.toString(),
        action.memoData.title,
        action.memoData.isChecked
      );
      return {
        memos: state.memos.concat(newMemo),
      };
  
    default:
      return state;
  }
};
