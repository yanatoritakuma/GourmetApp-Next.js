import Image from 'next/image'
import Layout from "../components/Layout"
import utilStyles from '../styles/registration.module.css'

export default function Registration(){
  return(
    <Layout>
      <section className={utilStyles.registration}>
        <h2>Registration</h2>
        <label>店名</label>
        <input placeholder="店名" />
        <label>電話番号</label>
        <input placeholder="電話番号" />
        <label>住所</label>
        <input placeholder="住所" />
        <label for="category">カテゴリー</label>
        <select id="category" >
          <option value="">カテゴリー選択</option>
          <option value="meat">肉</option>
          <option value="fish">魚</option>
          <option value="noodle">麺</option>
        </select>
      <label>メモ</label>
      <textarea placeholder="メモ" ></textarea>
      </section>
    </Layout>
  )
}