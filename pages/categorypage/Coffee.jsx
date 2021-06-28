import utilStyles from '../../styles/categorypage.module.css'
import Layout from "../../components/Layout"
import Image from 'next/image'
import { useDispatch } from "react-redux";
import {useSelector} from "react-redux";
import { deleteCoffeeStates } from "../../provider/dishesSlice";


export default function Coffee(){
  const dispatch = useDispatch();
  const { coffeeCategory } = useSelector((state) => state.dishes);

  const onClickDelete = (i) => {
    dispatch(deleteCoffeeStates(i));
  }

  return(
    <Layout>
      <section className={utilStyles.categoryPage}>
        <h2 className={utilStyles.coffeeTitle}>Coffee</h2>
        <ul>
          {
            coffeeCategory.map((coffeeState, i) => {
              return(
                <li key={i}>
                  <div className={utilStyles.categoryPage__img}>
                    <Image
                      src="/image/logo.png"
                      layout='responsive'
                      width={100}
                      height={100}
                      alt="icon"
                    />
                  </div>
                  <h3>{coffeeState.name}</h3>
                  <p>{coffeeState.tel}</p>
                  <p>{coffeeState.streetAddress}</p>
                  <p>{coffeeState.note}</p>
                  <button onClick={() => onClickDelete(i)}>Delete</button>
                </li>
              )
            })
          }
        </ul>
      </section>
    </Layout>
  )
}