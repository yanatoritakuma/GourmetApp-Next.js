import utilStyles from '../styles/modalStaet.module.css'
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, loginIDStates } from "../provider/dishesSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";

export default function ModalStaet(props){
  const { selectedState, modal, setModal } = props;
  const { loginID } = useSelector((state) => state.dishes);
  const dispatch = useDispatch();
  const checkLoginID = dispatch(loginIDStates(loginID));

  const onClickDelete = (selectedState) => {
    dispatch(deleteCategory(selectedState));
    setModal(!modal);
  }

  return(
    <section className={modal ? utilStyles.modalStaetOpen : utilStyles.modalStaet}>
      <div className={utilStyles.modalStaet__box}>
        <h3>
          <FontAwesomeIcon className={utilStyles.modalStaet__icon} icon={faArrowCircleLeft} onClick={()=> setModal(false)} />
          Detail
        </h3>
        <div className={utilStyles.modalStaet__boxIn}>
          <img src={selectedState?.photoUrl} />
          <h4>StoreName</h4>
          <p className={utilStyles.modalStaet__boxText}>{selectedState?.name}</p>
          <h4>PhoneNumber</h4>
          <p className={utilStyles.modalStaet__boxText}>{selectedState?.tel}</p>
          <h4>StreetAddress</h4>
          <p className={utilStyles.modalStaet__boxText}>{selectedState?.streetAddress}</p>
          <h4>Note</h4>
          <p className={utilStyles.modalStaet__boxNote}>{selectedState?.note}</p>
          {
           (() => {
            if (checkLoginID.payload === "3") {
              return(
                <button className={utilStyles.deleteBtn} onClick={()=> onClickDelete(selectedState.id)}>Delete</button>
              )
            }
          })()
          }
          </div>
      </div>
    </section>
  )
}