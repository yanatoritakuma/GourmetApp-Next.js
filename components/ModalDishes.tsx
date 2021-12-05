/** @jsxImportSource @emotion/react */
import React from "react";
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
  deleteBtn: any;
};

export const ModalDishes = (props: Props) => {
  const { modal, setModal, selectedState, deleteBtn } = props;
  const user = useSelector(selectUser);
  console.log("user", user.uid);
  console.log("selectedState", selectedState?.userID);

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
          <p>{selectedState?.storeName}</p>
          <h4>PhoneNumber</h4>
          <p>{selectedState?.storeTel}</p>
          <h4>StreetAddress</h4>
          <p>{selectedState?.streetAddress}</p>
          <h4>category</h4>
          <p>{selectedState?.category}</p>
          <h4>Note</h4>
          <p>{selectedState?.note}</p>
        </div>
        {user.uid === selectedState?.userID ||
        user.uid === "8c6Z46nQleTRI16dqRgtQUiDt1X2" ? (
          <Button
            className="deleteBtn"
            onClick={() => deleteBtn(selectedState?.id)}
          >
            deleteBtn
          </Button>
        ) : (
          ""
        )}
      </Box>
    </Modal>
  );
};

const ModalBox = css`
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
  max-height: 900px;
  overflow-wrap: break-word;
  overflow: scroll;

  h3 {
    margin-top: 0px;
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

  .ModalBox__in {
    padding: 20px 20px 60px 20px;

    p {
      padding-bottom: 4px;
      border-bottom: 1px solid #aaa;
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
