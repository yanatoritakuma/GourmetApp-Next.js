import React, { useState } from "react";
import utilStyles from '../styles/categorypage.module.css'
import Layout from "../components/Layout"
import ModalStaet from '../components/ModalStaet'
import Image from 'next/image'
import { useDispatch,useSelector } from "react-redux";
import { deleteCategory } from "../provider/dishesSlice";
import { useSelect } from "../hooks/useSelectState";


export async function getStaticPaths() {
  return {
    paths:[
      { params: { id: 'all'} },
      { params: { id: 'meat'} },
      { params: { id: 'fish'} },
      { params: { id: 'noodle'} },
      { params: { id: 'salad'} },
      { params: { id: 'dessert'} },
      { params: { id: 'coffee'} }
    ],
    fallback: false
  }
}

export const getStaticProps = async context => {
  const { id } = context.params 
  const categoryName = `${id}Category`
  
  return {
    props: { id, categoryName }
  }
}

const Categorypage = ({ id, categoryName }) => {

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

  const { 
    allCategory,
    meatCategory,
    fishCategory,
    noodleCategory,
    saladCategory,
    dessertCategory,
    coffeeCategory
  } = useSelector((state) => state.dishes);

  const onClickDelete = (i) => {
    dispatch(deleteCategory(i));
  }

  const categoryMap = {
    allCategory: allCategory,
    meatCategory: meatCategory,
    fishCategory: fishCategory,
    noodleCategory: noodleCategory,
    saladCategory: saladCategory,
    dessertCategory: dessertCategory,
    coffeeCategory: coffeeCategory
  };

  const categoryStates = categoryMap[categoryName];
  

  
  return (
    <Layout>
      <section className={utilStyles.categoryPage}>
        <h2>{id}Page</h2>
        <ul>
          {
            categoryStates.map((categoryState, i) => {
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