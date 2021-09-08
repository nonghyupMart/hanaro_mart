import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import * as memosActions from "../../store/actions/memo";
import ExtendedFlatList from "../UI/ExtendedFlatList";
import MemoItem from "./MemoItem";

const MemoList = (props) => {
  const memos = useAppSelector((state) => state.memo.memos);
  const dispatch = useAppDispatch();

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
