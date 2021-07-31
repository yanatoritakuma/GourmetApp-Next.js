import React, { useState, useMemo } from 'react'
import { useDispatch } from "react-redux";
import Layout from "../components/Layout"
import utilStyles from '../styles/registration.module.css'
import { pushRegistration } from "../provider/dishesSlice";
import { genRandSt } from "../components/genRandSt";

const  Registration = () => {
  const [ name, setName ] = useState("");
  const [ tel, setTel ] = useState("");
  const [ streetAddress, setStreetAddress ] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState(null);

  const dishesState = {
    name,
    tel,
    streetAddress,
    note,
    category,
    photo,
    id:genRandSt()
  };

  const dispatch = useDispatch();

  const onClickPushRegistration = () => {
    dispatch(pushRegistration(dishesState));
    setName(""),
    setTel(""),
    setStreetAddress(""),
    setNote(""),
    setCategory(""),
    setPhoto("")
  }

  const onChangePhoto = (e) => {
    const imageFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setPhoto(imageUrl)
  };

  console.log("photo",photo);

  return useMemo(() =>
    <Layout>
      <section className={utilStyles.registration}>
        <h2>Registration</h2>
        <div className={utilStyles.registration__box}>
          <input placeholder="StoreName" value={name} onChange={(e) => {setName(e.target.value )}} />
          <input placeholder="PhoneNumber" value={tel} onChange={(e) => {setTel(e.target.value)}} />
          <input placeholder="StreetAddress" value={streetAddress} onChange={(e) => {setStreetAddress(e.target.value)}} />
          <input 
            type="file" 
            accept=".png, .jpg, .jpeg"
            onChange={onChangePhoto}
          />
          <img src={photo} />
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
  ,[name,tel,streetAddress,category,note,photo])
}
export default Registration