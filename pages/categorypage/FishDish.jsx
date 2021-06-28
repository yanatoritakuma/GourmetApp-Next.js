import utilStyles from '../../styles/categorypage.module.css'
import Layout from "../../components/Layout"
import Image from 'next/image'
import { useDispatch } from "react-redux";
import {useSelector} from "react-redux";
import { deleteFishStates } from "../../provider/dishesSlice";


export default function FishDish(){
  const dispatch = useDispatch();
  const { fishCategory } = useSelector((state) => state.dishes);

  const onClickDelete = (i) => {
    dispatch(deleteFishStates(i));
  }

  return(
    <Layout>
      <section className={utilStyles.categoryPage}>
        <h2 className={utilStyles.fishDishTitle}>FishDish</h2>
        <ul>
          {
            fishCategory.map((fishState, i) => {
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
                  <h3>{fishState.name}</h3>
                  <p>{fishState.tel}</p>
                  <p>{fishState.streetAddress}</p>
                  <p>{fishState.note}</p>
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