import utilStyles from '../../styles/categorypage.module.css'
import Layout from "../../components/Layout"
import Image from 'next/image'
import { useDispatch } from "react-redux";
import {useSelector} from "react-redux";
import { deleteAllStates } from "../../provider/dishesSlice";


export default function AllDishes(){
  const dispatch = useDispatch();
  const { allCategoryStates } = useSelector((state) => state.dishes);

  const onClickDelete = (i) => {
    dispatch(deleteAllStates(i));
  }

  return(
    <Layout>
      <section className={utilStyles.categoryPage}>
        <h2>AllDishes</h2>
        <ul>
          {
            allCategoryStates.map((allState, i) => {
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
                  <h3>{allState.name}</h3>
                  <p>{allState.tel}</p>
                  <p>{allState.streetAddress}</p>
                  <p>{allState.note}</p>
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