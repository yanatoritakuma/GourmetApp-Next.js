/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { Box, Modal } from "@material-ui/core";
import NoImage from "../public/image/noimage.png";
import Image from "next/image";

type Props = {
  open: boolean;
  setOpen: (value: React.SetStateAction<boolean>) => void;
  storeName: string;
  storeTel: string;
  streetAddress: string;
  note: string;
  category: string;
  image: string;
};

export const ModalDishes = (props: Props) => {
  const {
    open,
    setOpen,
    storeName,
    storeTel,
    streetAddress,
    note,
    category,
    image,
  } = props;

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box css={ModalBox}>
        <h3>{storeName}</h3>
        {image === "" ? (
          <div className="ModalBox__noImg">
            <Image src={NoImage} alt="NoImage" />
          </div>
        ) : (
          <img src={image} alt="image" />
        )}
        <div className="ModalBox__in">
          <h4>StoreName</h4>
          <p>{storeName}</p>
          <h4>PhoneNumber</h4>
          <p>{storeTel}</p>
          <h4>StreetAddress</h4>
          <p>{streetAddress}</p>
          <h4>category</h4>
          <p>{category}</p>
          <h4>Note</h4>
          <p>{note}</p>
        </div>
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
