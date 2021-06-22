import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import Layout from "../components/Layout"
import utilStyles from '../styles/registration.module.css'
import { dishesSlice } from "../provider/dishesSlice";


export default function Registration(){
  const [ name, setName ] = useState("");
  const [ tel, setTel ] = useState("");
  const [ streetAddress, setStreetAddress ] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const pushAllStates = () => {
    if(name === ""){
      return alert("Please enter StoreName");
    } 
    dispatch(dishesSlice.actions.pushAllStates({
      name,
      tel,
      streetAddress,
      note
    }),
      setName(""),
      setTel(""),
      setStreetAddress(""),
      setNote(""),
      setCategory(""),
      pushMeatStates()
    )
  }

  const pushMeatStates = () => {
    if(category === "meatDish"){
      dispatch(dishesSlice.actions.pushMeatStates({
        name,
        tel,
        streetAddress,
        note
      }));
    }
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
              <option value="moodles">Noodles</option>
              <option value="salad">Salad</option>
              <option value="dessert">Dessert</option>
              <option value="coffee">Coffee</option>
            </select>
            <textarea placeholder="Note" value={note} onChange={(e) => {setNote(e.target.value)}}></textarea>
            <button type="button" onClick={pushAllStates}>Registration</button>
          </div>
        </section>
      </Layout>
  )
}