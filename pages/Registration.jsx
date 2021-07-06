import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import Layout from "../components/Layout"
import utilStyles from '../styles/registration.module.css'
import { dishesSlice } from "../provider/dishesSlice";
import {useSelector} from "react-redux";


export default function Registration(){
  const { categoriesState } = useSelector((state) => state.dishes);
  const [ name, setName ] = useState("");
  const [ tel, setTel ] = useState("");
  const [ streetAddress, setStreetAddress ] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");
  const dishesState = {
    name,
    tel,
    streetAddress,
    note,
    category,
    id:categoriesState.length
  };

  const dispatch = useDispatch();

  const onClickPushRegistration = () => {
    dispatch(dishesSlice.actions.pushRegistration(dishesState));
    setName(""),
    setTel(""),
    setStreetAddress(""),
    setNote(""),
    setCategory("")
  }

  return(
      <Layout>
        <section className={utilStyles.registration}>
          <h2>Registration</h2>
          <div className={utilStyles.registration__box}>
            <input placeholder="StoreName" value={name} onChange={(e) => {setName(e.target.value )}} />
            <input placeholder="PhoneNumber" value={tel} onChange={(e) => {setTel(e.target.value)}} />
            <input placeholder="StreetAddress" value={streetAddress} onChange={(e) => {setStreetAddress(e.target.value)}} />
            <select id="category" value={category} onChange={(e) => {setCategory(e.target.value)}} >
              <option value="">Category</option>
              <option value="meatDish">MeatDish</option>
              <option value="fishDish">FishDish</option>
              <option value="noodles">Noodles</option>
              <option value="salad">Salad</option>
              <option value="dessert">Dessert</option>
              <option value="coffee">Coffee</option>
            </select>
            <textarea placeholder="Note" value={note} onChange={(e) => {setNote(e.target.value)}}></textarea>
            <button type="button" onClick={onClickPushRegistration}>Registration</button>
          </div>
        </section>
      </Layout>
  )
}