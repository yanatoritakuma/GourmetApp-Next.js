import React, { useState } from "react";
import utilStyles from '../styles/categorypage.module.css'
import Layout from "../components/Layout"
import ModalStaet from '../components/ModalStaet'
import Image from 'next/image'
import { useDispatch,useSelector } from "react-redux";
import { deleteCategory } from "../provider/dishesSlice";
import { useSelect } from "../hooks/useSelectState";
import clsx from 'clsx'; 


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
  return {
    props: { id }
  }
}

const Categorypage = ({ id }) => {
  const { allCategory } = useSelector((state) => state.dishes);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const { onSelectState, selectedState } = useSelect();

  const onClickModal = () => {
    setModal(!modal);
  }

  const onClickOpen = (categoryValue) => {
    onSelectState({ allCategory,categoryValue });
    onClickModal();
  }

  const categoryStates = id === "all" ? allCategory : allCategory.filter((v) => v.category === id);
  
  const onClickDelete = (i) => {
    dispatch(deleteCategory(i));
  }

  const activeTitle = () =>{
    if(id === "meat"){
      return utilStyles.meat
    }else if(id === "fish"){
      return utilStyles.fish
    }else if(id === "noodle"){
      return utilStyles.noodle
    }else if(id === "salad"){
      return utilStyles.salad
    }else if(id === "dessert"){
      return utilStyles.dessert
    }else if(id === "coffee"){
      return utilStyles.coffee
    }
  }

  

  
  return (
    <Layout>
      <section className={utilStyles.categoryPage}>
        <h2 className={clsx(activeTitle())}>{id}Page</h2>
        <ul>
          {
            categoryStates.map((categoryValue, i) => {
              return(
                <li key={i} onClick={() => onClickOpen(categoryValue)}>
                  <div className={utilStyles.categoryPage__img}>
                    <Image
                      src="/image/logo.png"
                      layout='responsive'
                      width={100}
                      height={100}
                      alt="icon"
                    />
                  </div>
                  <h3>{categoryValue.name}</h3>
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

