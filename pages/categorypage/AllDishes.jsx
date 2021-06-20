import utilStyles from '../../styles/categorypage.module.css'
import Layout from "../../components/Layout"
import Image from 'next/image'
import { useDispatch } from "react-redux";
import {useSelector} from "react-redux";


export default function AllDishes(){
  const dispatch = useDispatch();
  const { allStates } = useSelector((state) => state.dishes);

  return(
    <Layout>
      <section className={utilStyles.allDishes}>
        <h2>AllDishes</h2>
        <ul>
          {
            allStates.map((allState, i) => {
              return(
                <li key={i}>
                  <div className={utilStyles.allDishes__img}>
                    <Image
                      src="/image/logo.png"
                      layout='responsive'
                      width={100}
                      height={100}
                      alt="icon"
                    />
                  </div>
                  <h3>{allState.name}</h3>
                  <p>{allState.tel}</p>
                  <p>{allState.streetAddress}</p>
                  <p>{allState.note}</p>
                  <button>Delete</button>
                </li>
              )
            })
          }
        </ul>
        
      </section>
    </Layout>
  )
}