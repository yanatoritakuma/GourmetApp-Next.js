import { useCallback } from "react";
import { db, storage } from "../firebas/initFirebase";

export const useDeletePost = () => {
  const postsRef = db.collection("posts");

  const deleteBtn = useCallback(
    (id, img) => {
      const ret = window.confirm("削除しますか？");
      if (!ret) {
        return false;
      } else {
        storage.ref().child(`images/${img}`).delete();
        return postsRef.doc(id).delete();
      }
    },
    [postsRef]
  );
  return { deleteBtn };
};
