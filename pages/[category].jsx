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
      { params: { category: 'all'} },
      { params: { category: 'meat'} },
      { params: { category: 'fish'} },
      { params: { category: 'noodle'} },
      { params: { category: 'salad'} },
      { params: { category: 'dessert'} },
      { params: { category: 'coffee'} }
    ],
    fallback: false
  }
}

export const getStaticProps = async context => {
  const { category } = context.params 
  return {
    props: { category }
  }
}

const Categorypage = ({ category }) => {
  const { categories } = useSelector((state) => state.dishes);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const { onSelectState, selectedState } = useSelect();

  const onClickModal = () => {
    setModal(!modal);
  }

  const onClickOpen = (categoryValue) => {
    onSelectState({ categories,categoryValue });
    onClickModal();
  }

  const categoryArray = category === "all" ? categories : categories.filter((v) => v.category === category);
  
  const onClickDelete = (i) => {
    dispatch(deleteCategory(i));
  }

  const activeTitle = () =>{
    if(category === "meat"){
      return utilStyles.meat
    }else if(category === "fish"){
      return utilStyles.fish
    }else if(category === "noodle"){
      return utilStyles.noodle
    }else if(category === "salad"){
      return utilStyles.salad
    }else if(category === "dessert"){
      return utilStyles.dessert
    }else if(category === "coffee"){
      return utilStyles.coffee
    }
  }
  
  return (
    <Layout>
      <section className={utilStyles.categoryPage}>
        <h2 className={utilStyles.category}>{category}Page</h2>
        <ul>
          {
            categoryArray.map((categoryValue, i) => {
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

