import React from "react";
import { Box, Button, Typography, Modal } from "@material-ui/core";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type Props = {
  open: boolean;
  setOpen: (value: React.SetStateAction<boolean>) => void;
};

export const ModalDishes = (props: Props) => {
  const { open, setOpen } = props;

  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography>test!!!</Typography>
        </Box>
      </Modal>
    </div>
  );
};
