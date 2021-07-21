import React, { useState, memo } from 'react'
import { useDispatch } from "react-redux";
import Layout from "../components/Layout"
import utilStyles from '../styles/registration.module.css'
import { pushRegistration } from "../provider/dishesSlice";
import { useUuId } from "../hooks/useUuId";


  const  Registration = memo(() => {
  const [ name, setName ] = useState("");
  const [ tel, setTel ] = useState("");
  const [ streetAddress, setStreetAddress ] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");
  const { getUnique } = useUuId();

  console.log(getUnique);

  const dishesState = {
    name,
    tel,
    streetAddress,
    note,
    category,
    id:getUnique
  };

  const dispatch = useDispatch();

  const onClickPushRegistration = () => {
    dispatch(pushRegistration(dishesState));
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
            <option value="all">Category</option>
            <option value="meat">MeatDish</option>
            <option value="fish">FishDish</option>
            <option value="noodle">Noodles</option>
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
})
export default Registration