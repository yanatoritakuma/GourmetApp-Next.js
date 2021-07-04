import React, { useState } from "react";
import utilStyles from '../../styles/categorypage.module.css'
import Layout from "../../components/Layout"
import ModalStaet from '../../components/ModalStaet'
import Image from 'next/image'
import { useDispatch,useSelector } from "react-redux";
import { deleteAllCategoryStates } from "../../provider/dishesSlice";
import { useSelect } from "../../hooks/useSelectState";


export async function getStaticPaths() {
  return {
    paths:[
      { params: { id: 'All'} },
      { params: { id: 'Meat'} },
      { params: { id: 'Fish'} },
      { params: { id: 'Noodle'} },
      { params: { id: 'Salad'} },
      { params: { id: 'Dessert'} },
      { params: { id: 'Coffee'} }
    ],
    fallback: false
  }
}

export const getStaticProps = async context => {
  const { id } = context.params 
  const props = {
    title: id
  }
  return { props }
}

const Categorypage = ({ title }) => {

  const [modal, setModal] = useState(false);
  const { onSelectState, selectedState } = useSelect();

  const onClickModal = () => {
    setModal(!modal);
  }

  const onClickOpen = (i) => {
    onSelectState({ categorysState, i });
    onClickModal();
  }

  const dispatch = useDispatch();

  const { categorysState } = useSelector((state) => state.dishes);

  const onClickDelete = (i) => {
    dispatch(deleteAllCategoryStates(i));
  }

  console.log("categorysState",categorysState);
  console.log("title",title);

  return (
    <Layout>
      <section className={utilStyles.categoryPage}>
        <h2>{title}Page</h2>
        <ul>
          {
            categorysState.map((categoryState, i) => {
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
                  <h3>{categoryState.name}</h3>
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
export default Categorypage