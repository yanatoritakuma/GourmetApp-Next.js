import React, { useState } from "react";
import utilStyles from '../../styles/categorypage.module.css'
import utilStylesModal from '../../styles/modalStaet.module.css'
import Layout from "../../components/Layout"
import ModalStaet from '../../components/ModalStaet'
import Image from 'next/image'
import { useDispatch } from "react-redux";
import {useSelector} from "react-redux";
import { deleteAllCategoryStates } from "../../provider/dishesSlice";
import { useSelect } from "../../hooks/useSelectState";


export default function AllDishes(){
  const [modal, setModal] = useState(false);
  const { onSelectState, selectedState } = useSelect();

  const onClickModal = () => {
    setModal(!modal);
  }

  const onClickOpen = (i) => {
    onSelectState({ allCategory, i });
    onClickModal();
  }

  const dispatch = useDispatch();

  const { allCategory } = useSelector((state) => state.dishes);

  const onClickDelete = (i) => {
    dispatch(deleteAllCategoryStates(i));
  }


  return(
    <Layout>
      <section className={utilStyles.categoryPage}>
        <h2>AllDishes</h2>
        <ul>
          {
            allCategory.map((allState, i) => {
              return(
                <li key={i} onClick={() => onClickOpen(i)}>
                  <div className={utilStyles.categoryPage__img}>
                    <Image
                      src="/image/logo.png"
                      layout='responsive'
                      width={100}
                      height={100}
                      alt="icon"
                    />
                  </div>
                  <h3>{allState.name}</h3>
                  <button onClick={() => onClickDelete(i)}>Delete</button>
                </li>
              )
            })
          }
        </ul>
      </section>
      <ModalStaet selectedState={selectedState} modal={modal} setModal={setModal} onClickDelete={onClickDelete} />
    </Layout>
  )
}