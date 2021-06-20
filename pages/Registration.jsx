import React, { useState } from 'react'
import Layout from "../components/Layout"
import utilStyles from '../styles/registration.module.css'

export default function Registration(){
  const [ name, setName ] = useState("");
  const [ tel, setTel ] = useState("");
  const [ streetAddress, setStreetAddress ] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");

  // console.log("name",name);
  // console.log("tel",tel);
  // console.log("streetAddress",streetAddress);
  // console.log("category",category);
  // console.log("note",note);

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
          <button type="button">Registration</button>
        </div>
      </section>
    </Layout>
  )
}