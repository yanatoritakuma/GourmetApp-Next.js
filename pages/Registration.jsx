import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import Layout from "../components/Layout"
import utilStyles from '../styles/registration.module.css'
import { dishesSlice } from "../provider/dishesSlice";
import {useSelector} from "react-redux";


export default function Registration(){
  const { allCategory } = useSelector((state) => state.dishes);
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
    id:allCategory.length
  };

  console.log("dishesState",dishesState);

  const dispatch = useDispatch();

  const onClickPushRegistration = () => {
    if(name === ""){
      return alert("Please enter StoreName");
    }

    dispatch(dishesSlice.actions.pushRegistration(dishesState));

    // switch(category){
    //   case "meatDish":
    //   dispatch(dishesSlice.actions.pushMeatStates({
    //     name,
    //     tel,
    //     streetAddress,
    //     note
    //   }));
    //   break;

    //   case "fishDish":
    //   dispatch(dishesSlice.actions.pushFishStates({
    //     name,
    //     tel,
    //     streetAddress,
    //     note
    //   }));
    //   break;

    //   case "noodles":
    //   dispatch(dishesSlice.actions.pushNoodlesStates({
    //     name,
    //     tel,
    //     streetAddress,
    //     note
    //   }));
    //   break;

    //   case "salad":
    //   dispatch(dishesSlice.actions.pushSaladStates({
    //     name,
    //     tel,
    //     streetAddress,
    //     note
    //   }));
    //   break;

    //   case "dessert":
    //   dispatch(dishesSlice.actions.pushDessertStates({
    //     name,
    //     tel,
    //     streetAddress,
    //     note
    //   }));
    //   break;

    //   case "coffee":
    //   dispatch(dishesSlice.actions.pushCoffeeStates({
    //     name,
    //     tel,
    //     streetAddress,
    //     note
    //   }));
    //   break;
    // }
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