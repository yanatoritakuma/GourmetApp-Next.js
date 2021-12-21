/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { Box, Modal, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../provider/userSlice";
import NoImage from "../public/image/noimage.png";
import Image from "next/image";

type Props = {
  modal: boolean;
  setModal: (value: React.SetStateAction<boolean>) => void;
  selectedState:
    | {
        id: string;
        avatar: string;
        image: string;
        storeName: string;
        storeTel: string;
        streetAddress: string;
        note: string;
        category: string;
        timestamp: null;
        username: string;
        userID: string;
      }
    | any;
  deleteBtn: (id: any, img: any) => Promise<false | void>;
  upDateBtn: (id: any, upDateContents: any) => Promise<false | void>;
};

export const ModalDishes = (props: Props) => {
  const { modal, setModal, selectedState, deleteBtn, upDateBtn } = props;
  const user = useSelector(selectUser);
  const [upDateContents, setUpDateContents] = useState({
    storeName: "",
    phoneNumber: "",
    streetAddress: "",
    note: "",
    category: "",
  });

  const initContents = {
    storeName: selectedState?.storeName,
    phoneNumber: selectedState?.storeTel,
    streetAddress: selectedState?.streetAddress,
    note: selectedState?.note,
    category: selectedState?.category,
  };

  // 初期化がundefinedが入ってくるのでuseEffectで再代入
  useEffect(() => {
    setUpDateContents({
      ...upDateContents,
      storeName: selectedState?.storeName,
      phoneNumber: selectedState?.storeTel,
      streetAddress: selectedState?.streetAddress,
      note: selectedState?.note,
      category: selectedState?.category,
    });
  }, [selectedState]);

  const [change, setChange] = useState({
    storeName: false,
    phoneNumber: false,
    streetAddress: false,
    note: false,
    category: false,
  });

  const resetUpDateContents = () => {
    if (
      upDateContents.storeName === initContents.storeName &&
      upDateContents.phoneNumber === initContents.phoneNumber &&
      upDateContents.streetAddress === initContents.streetAddress &&
      upDateContents.category === initContents.category &&
      upDateContents.note === initContents.note
    ) {
      return alert("変更がありません。");
    }

    upDateBtn(selectedState?.id, upDateContents);
    setChange({
      storeName: false,
      phoneNumber: false,
      streetAddress: false,
      note: false,
      category: false,
    });
  };

  const targetImg = selectedState?.image.substring(
    84,
    selectedState?.image.indexOf("?")
  );

  return (
    <Modal open={modal} onClose={() => setModal(false)}>
      <Box css={ModalBox}>
        <h3>{selectedState?.storeName}</h3>
        {selectedState?.image === "" ? (
          <div className="ModalBox__noImg">
            <Image src={NoImage} alt="NoImage" />
          </div>
        ) : (
          <img src={selectedState?.image} alt="image" />
        )}

        <div className="ModalBox__in">
          <h4>StoreName</h4>
          <div className="ModalBox__inTextBox">
            <p
              style={
                change.storeName ? { display: "none" } : { display: "block" }
              }
            >
              {selectedState?.storeName}
            </p>
            <input
              type="text"
              value={upDateContents.storeName}
              onChange={(e) =>
                setUpDateContents({
                  ...upDateContents,
                  storeName: e.target.value,
                })
              }
              style={
                change.storeName ? { display: "block" } : { display: "none" }
              }
            />
            {user.uid === selectedState?.userID ||
            user.uid === "8c6Z46nQleTRI16dqRgtQUiDt1X2" ? (
              <Button
                className="upDateBtn"
                onClick={() =>
                  setChange({ ...change, storeName: !change.storeName })
                }
              >
                編集
              </Button>
            ) : (
              ""
            )}
          </div>

          <h4>PhoneNumber</h4>
          <div className="ModalBox__inTextBox">
            <p
              style={
                change.phoneNumber ? { display: "none" } : { display: "block" }
              }
            >
              {selectedState?.storeTel}
            </p>
            <input
              type="text"
              value={upDateContents.phoneNumber}
              onChange={(e) =>
                setUpDateContents({
                  ...upDateContents,
                  phoneNumber: e.target.value,
                })
              }
              style={
                change.phoneNumber ? { display: "block" } : { display: "none" }
              }
            />
            {user.uid === selectedState?.userID ||
            user.uid === "8c6Z46nQleTRI16dqRgtQUiDt1X2" ? (
              <Button
                className="upDateBtn"
                onClick={() =>
                  setChange({ ...change, phoneNumber: !change.phoneNumber })
                }
              >
                編集
              </Button>
            ) : (
              ""
            )}
          </div>

          <h4>StreetAddress</h4>
          <div className="ModalBox__inTextBox">
            <p
              style={
                change.streetAddress
                  ? { display: "none" }
                  : { display: "block" }
              }
            >
              {selectedState?.streetAddress}
            </p>
            <input
              type="text"
              value={upDateContents.streetAddress}
              onChange={(e) =>
                setUpDateContents({
                  ...upDateContents,
                  streetAddress: e.target.value,
                })
              }
              style={
                change.streetAddress
                  ? { display: "block" }
                  : { display: "none" }
              }
            />
            {user.uid === selectedState?.userID ||
            user.uid === "8c6Z46nQleTRI16dqRgtQUiDt1X2" ? (
              <Button
                className="upDateBtn"
                onClick={() =>
                  setChange({ ...change, streetAddress: !change.streetAddress })
                }
              >
                編集
              </Button>
            ) : (
              ""
            )}
          </div>

          <h4>category</h4>
          <div className="ModalBox__inTextBox">
            <p
              style={
                change.category ? { display: "none" } : { display: "block" }
              }
            >
              {selectedState?.category}
            </p>

            <select
              value={upDateContents.category}
              onChange={(e) =>
                setUpDateContents({
                  ...upDateContents,
                  category: e.target.value,
                })
              }
              style={
                change.category ? { display: "block" } : { display: "none" }
              }
            >
              <option value="all">All</option>
              <option value="meat">MeatDish</option>
              <option value="fish">FishDish</option>
              <option value="noodle">Noodles</option>
              <option value="salad">Salad</option>
              <option value="dessert">Dessert</option>
              <option value="coffee">Coffee</option>
            </select>

            {user.uid === selectedState?.userID ||
            user.uid === "8c6Z46nQleTRI16dqRgtQUiDt1X2" ? (
              <Button
                className="upDateBtn"
                onClick={() =>
                  setChange({ ...change, category: !change.category })
                }
              >
                編集
              </Button>
            ) : (
              ""
            )}
          </div>

          <h4>Note</h4>
          <div className="ModalBox__inTextBox">
            <p style={change.note ? { display: "none" } : { display: "block" }}>
              {selectedState?.note}
            </p>
            <textarea
              value={upDateContents.note}
              onChange={(e) =>
                setUpDateContents({
                  ...upDateContents,
                  note: e.target.value,
                })
              }
              style={change.note ? { display: "block" } : { display: "none" }}
            />
            {user.uid === selectedState?.userID ||
            user.uid === "8c6Z46nQleTRI16dqRgtQUiDt1X2" ? (
              <Button
                className="upDateBtn"
                onClick={() => setChange({ ...change, note: !change.note })}
              >
                編集
              </Button>
            ) : (
              ""
            )}
          </div>
        </div>
        {user.uid === selectedState?.userID ||
        user.uid === "8c6Z46nQleTRI16dqRgtQUiDt1X2" ? (
          <>
            <Button
              className="deleteBtn"
              onClick={() => deleteBtn(selectedState?.id, targetImg)}
            >
              delete
            </Button>
            <Button className="upDateBtn" onClick={() => resetUpDateContents()}>
              upDate
            </Button>
          </>
        ) : (
          ""
        )}
      </Box>
    </Modal>
  );
};

const ModalBox = css`
  padding-bottom: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 10px;
  outline: none;
  width: 100%;
  max-width: 1000px;
  height: auto;
  max-height: 750px;
  overflow-wrap: break-word;
  overflow: scroll;

  h3 {
    margin: 0;
    padding: 20px;
    text-align: center;
    font-size: 24px;
    color: #fff;
    background-color: #fcc800;
    overflow-wrap: break-word;
    overflow: scroll;
    max-height: 100px;
  }

  img,
  .ModalBox__noImg {
    margin: 0 auto;
    display: block;
    width: 100%;
    max-width: 500px;
  }

  .deleteBtn {
    margin: 10px auto;
    display: block;
    background-color: #ea5549;
    color: #fff;

    &:hover {
      background-color: #ea5549;
    }
  }

  .upDateBtn {
    margin: 10px auto;
    display: block;
    background-color: #2cb4ad;
    color: #fff;

    &:hover {
      background-color: #2cb4ad;
    }
  }

  .ModalBox__in {
    padding: 20px 20px 60px 20px;

    p {
      padding-bottom: 4px;
    }
  }

  .ModalBox__inTextBox {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p,
    input,
    textarea {
      width: 90%;
    }

    p {
      border-bottom: 1px solid #aaa;
    }

    input {
      border: 1px solid #333;
    }
  }

  @media screen and (max-width: 1024px) {
    margin: 30px 0;
    width: 90%;
    max-height: 700px;

    img,
    .ModalBox__noImg {
      width: 90%;
    }
  }
`;
