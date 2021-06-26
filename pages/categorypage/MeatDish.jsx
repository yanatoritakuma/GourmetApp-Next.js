import utilStyles from '../../styles/categorypage.module.css'
import Layout from "../../components/Layout"
import Image from 'next/image'
import { useDispatch } from "react-redux";
import {useSelector} from "react-redux";
import { deleteMeatStates } from "../../provider/dishesSlice";


export default function MeatDish(){
  const dispatch = useDispatch();
  const { meatCategoryStates } = useSelector((state) => state.dishes);

  const onClickDelete = (i) => {
    dispatch(deleteMeatStates(i));
  }

  return(
    <Layout>
      <section className={utilStyles.categoryPage}>
        <h2 className={utilStyles.meatDishTitle}>MeatDish</h2>
        <ul>
          {
            meatCategoryStates.map((meatState, i) => {
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
                  <h3>{meatState.name}</h3>
                  <p>{meatState.tel}</p>
                  <p>{meatState.streetAddress}</p>
                  <p>{meatState.note}</p>
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