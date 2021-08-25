import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import ExtendedFlatList from "../UI/ExtendedFlatList";
import MemoItem from "./MemoItem";
import * as memosActions from "../../store/actions/memo";

const MemoList = (props) => {
  const memos = useSelector((state) => state.memo.memos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(memosActions.loadMemos());
  }, [dispatch]);

  return (
    <ExtendedFlatList
      key="memoList"
      data={memos}
      keyExtractor={(item) => "memo-" + item.id}
      renderItem={(itemData) => <MemoItem item={itemData.item} />}
    />
  );
};
export default React.memo(MemoList);
