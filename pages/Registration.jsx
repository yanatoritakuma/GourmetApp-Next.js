import Image from 'next/image'
import Layout from "../components/Layout"
import utilStyles from '../styles/registration.module.css'

export default function Registration(){
  return(
    <Layout>
      <section className={utilStyles.registration}>
        <h2>Registration</h2>
        <div className={utilStyles.registration__box}>
          <input placeholder="StoreName" />
          <input placeholder="PhoneNumber" />
          <input placeholder="StreetAddress" />
          <select id="category" >
            <option value="">Category</option>
            <option value="meatDish">MeatDish</option>
            <option value="mishDish">FishDish</option>
            <option value="moodles">Noodles</option>
            <option value="salad">Salad</option>
            <option value="Dessert">Dessert</option>
            <option value="Coffee">Coffee</option>
          </select>
          <textarea placeholder="メモ" ></textarea>
          <button type="button">Registration</button>
        </div>
      </section>
    </Layout>
  )
}