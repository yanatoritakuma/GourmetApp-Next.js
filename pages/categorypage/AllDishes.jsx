import React, { useState } from "react";
import utilStyles from '../../styles/categorypage.module.css'
import utilStylesModal from '../../styles/modalStaet.module.css'
import Layout from "../../components/Layout"
import ModalStaet from '../../components/ModalStaet'
import Image from 'next/image'
import { useDispatch } from "react-redux";
import {useSelector} from "react-redux";
import { deleteAllStates } from "../../provider/dishesSlice";
import { useSelect } from "../../hooks/useSelectState";


export default function AllDishes(){
  const [modal, setModal] = useState(false);

  const onClickModal = () => {
    setModal(!modal);
  }

  const dispatch = useDispatch();

  const { allCategoryStates } = useSelector((state) => state.dishes);

  const onClickDelete = (i) => {
    dispatch(deleteAllStates(i));
  }

  const { onSelectState, selectedState } = useSelect();

  const onClickOpen = (i) => {
    onSelectState({ allCategoryStates, i });
    onClickModal();
  }

  

  return(
    <Layout>
      <section className={utilStyles.categoryPage}>
        <h2>AllDishes</h2>
        <ul>
          {
            allCategoryStates.map((allState, i) => {
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
                  <p>{allState.tel}</p>
                  <p>{allState.streetAddress}</p>
                  <p>{allState.note}</p>
                  <button onClick={() => onClickDelete(i)}>Delete</button>
                </li>
              )
            })
          }
        </ul>
      </section>
      <ModalStaet selectedState={selectedState} modal={modal} />
    </Layout>
  )
}