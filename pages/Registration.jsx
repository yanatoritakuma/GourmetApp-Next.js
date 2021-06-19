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
            <option value="meat">肉</option>
            <option value="fish">魚</option>
            <option value="noodle">麺</option>
          </select>
          <textarea placeholder="メモ" ></textarea>
          <button type="button">Registration</button>
        </div>
      </section>
    </Layout>
  )
}