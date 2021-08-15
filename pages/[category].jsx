import React, { useState, useMemo } from "react";
import utilStyles from '../styles/categorypage.module.css'
import Layout from "../components/Layout"
import ModalStaet from '../components/ModalStaet'
import { useSelector } from "react-redux";
import { useSelect } from "../hooks/useSelectState";

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
  
  return useMemo(() =>
    <Layout>
      <section className={utilStyles.categoryPage}>
        <h2 className={activeTitle()}>{category}Page</h2>
        <ul>
          {
            categoryArray.map((categoryValue) => {
              return(
                <li key={categoryValue.id} onClick={() => onClickOpen(categoryValue)}>
                  <div className={utilStyles.categoryPage__img}>
                    <img src={categoryValue.photoUrl} alt="" />
                  </div>
                  <h3>{categoryValue.name}</h3>
                </li>
              )
            })
          }
        </ul>
      </section>
      <ModalStaet selectedState={selectedState} modal={modal} setModal={setModal} />
    </Layout>
  ,[onClickOpen])
}
export default Categorypage

