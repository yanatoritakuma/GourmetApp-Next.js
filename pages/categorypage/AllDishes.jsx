import utilStyles from '../../styles/categorypage.module.css'
import Layout from "../../components/Layout"
import Image from 'next/image'


export default function AllDishes(){
  return(
    <Layout>
      <section className={utilStyles.allDishes}>
        <h2>AllDishes</h2>
        <ul>
          <li>
            <div className={utilStyles.allDishes__img}>
              <Image
                src="/image/logo.png"
                layout='responsive'
                width={100}
                height={100}
                alt="icon"
              />
            </div>
            <h3>name</h3>
            <p>tel</p>
            <p>streetAddress</p>
            <p>memo</p>
            <button>Delete</button>
          </li>
          
          <li>
            <div className={utilStyles.allDishes__img}>
              <Image
                src="/image/logo.png"
                layout='responsive'
                width={100}
                height={100}
                alt="icon"
              />
            </div>
            <h3>name</h3>
            <p>tel</p>
            <p>streetAddress</p>
            <p>memo</p>
            <button>Delete</button>
          </li>
        </ul>
        
      </section>
    </Layout>
  )
}