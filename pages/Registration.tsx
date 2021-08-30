import React, { useState, useMemo, ChangeEvent } from 'react';
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import utilStyles from '../styles/registration.module.css';
import { pushRegistration } from "../provider/dishesSlice";
import { genRandSt } from "../components/genRandSt";

const  Registration = () => {
  const [ name, setName ] = useState("");
  const [ tel, setTel ] = useState("");
  const [ streetAddress, setStreetAddress ] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");
  const [photoUrl, setPhotoUrl] = useState<null | string>(null);

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const onChangeTel = (e: ChangeEvent<HTMLInputElement>) => setTel(e.target.value);
  const onChangeStreetAddress = (e: ChangeEvent<HTMLInputElement>) => setStreetAddress(e.target.value);
  const onChangeNote = (e: ChangeEvent<HTMLTextAreaElement>) => setNote(e.target.value);
  const onChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value);


  const dishesState = {
    name,
    tel,
    streetAddress,
    note,
    category,
    photoUrl,
    id: genRandSt()
  }

  const dispatch = useDispatch();

  const onClickPushRegistration = () => {
    dispatch(pushRegistration(dishesState));
    setName(""),
    setTel(""),
    setStreetAddress(""),
    setNote(""),
    setCategory(""),
    setPhotoUrl(null);
  }

  const onChangePhoto = (e:ChangeEvent<HTMLInputElement>) => {
    const photoFile = e.target.files[0];
    const photoFileUrl = URL.createObjectURL(photoFile);
    setPhotoUrl(photoFileUrl);
    console.log("photoFile",photoFile);
  };

  return useMemo(() =>
    <Layout>
      <section className={utilStyles.registration}>
        <h2>Registration</h2>
        <div className={utilStyles.registration__box}>
          <input placeholder="StoreName" value={name} onChange={onChangeName} />
          <input placeholder="PhoneNumber" value={tel} onChange={onChangeTel} />
          <input placeholder="StreetAddress" value={streetAddress} onChange={onChangeStreetAddress} />
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={onChangePhoto}
          />
          <img src={photoUrl} alt="プレビュー画像" />
          <select id="category" value={category} onChange={onChangeCategory} >
            <option value="all">Category</option>
            <option value="meat">MeatDish</option>
            <option value="fish">FishDish</option>
            <option value="noodle">Noodles</option>
            <option value="salad">Salad</option>
            <option value="dessert">Dessert</option>
            <option value="coffee">Coffee</option>
          </select>
          <textarea placeholder="Note" value={note} onChange={onChangeNote}></textarea>
          <button type="button" onClick={onClickPushRegistration}>Registration</button>
        </div>
      </section>
    </Layout>
  ,[name,tel,streetAddress,category,note,photoUrl])
}
export default Registration
