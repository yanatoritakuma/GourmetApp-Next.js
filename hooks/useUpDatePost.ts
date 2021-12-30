import { useCallback } from "react";
import { db, storage } from "../firebas/initFirebase";

export const useUpDatePost = () => {
  const postsRef = db.collection("posts");

  const upDateBtn = useCallback(
    async (id, upDateContents) => {
      const ret = window.confirm("この内容で編集しますか？");
      if (!ret) {
        return false;
      } else {
        return postsRef.doc(id).update({
          storeName: upDateContents.storeName,
          storeTel: upDateContents.phoneNumber,
          streetAddress: upDateContents.streetAddress,
          note: upDateContents.note,
          category: upDateContents.category,
          // image:
          //   "https://firebasestorage.googleapis.com/v0/b/gourmetapp-4940d.appspot.com/o/images%2Fdb061HENaLIra8x9_26263A44-2D26-4B48-88FD-3E2835BBCD7E.jpeg?alt=media&token=9642a69d-b8b9-4a36-bfbf-11f67906b511",
        });
      }
    },
    [postsRef]
  );

  return { upDateBtn };
};
