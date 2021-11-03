import utilStyles from "../styles/modalStaet.module.css";
import { deleteCategory } from "../provider/dishesSlice";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { selectUser } from "../provider/userSlice";
// import { Avatar } from "@material-ui/core";

type Props = {
  selectedState:
    | {
        category: "";
        id: string;
        name: string;
        note: string;
        photoUrl: string;
        streetAddress: string;
        tel: string;
      }
    | any;
  modal: boolean;
  setModal: any;
};

export const ModalStaet = (props: Props) => {
  const { selectedState, modal, setModal } = props;
  const { loginIDs } = useAppSelector((state) => state.dishes);
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);

  const onClickDelete = (selectedState: string) => {
    dispatch(deleteCategory(selectedState));
    setModal(!modal);
  };

  return (
    <section
      className={modal ? utilStyles.modalStaetOpen : utilStyles.modalStaet}
    >
      <div className={utilStyles.modalStaet__box}>
        <h3>
          <FontAwesomeIcon
            className={utilStyles.modalStaet__icon}
            icon={faArrowCircleLeft}
            onClick={() => setModal(false)}
          />
          Detail
        </h3>
        <div className={utilStyles.modalStaet__boxIn}>
          <img src={selectedState?.photoUrl} />
          <h4>StoreName</h4>
          <p className={utilStyles.modalStaet__boxText}>
            {selectedState?.name}
          </p>
          <h4>PhoneNumber</h4>
          <p className={utilStyles.modalStaet__boxText}>{selectedState?.tel}</p>
          <h4>StreetAddress</h4>
          <p className={utilStyles.modalStaet__boxText}>
            {selectedState?.streetAddress}
          </p>
          <h4>Note</h4>
          <p className={utilStyles.modalStaet__boxNote}>
            {selectedState?.note}
          </p>
          {loginIDs === "3" ? (
            <button
              className={utilStyles.deleteBtn}
              onClick={() => onClickDelete(selectedState.id)}
            >
              Delete
            </button>
          ) : (
            ""
          )}
        </div>

        {/* <Avatar src={user.photoUrl} /> */}
      </div>
    </section>
  );
};
