import utilStyles from '../../styles/categorypage.module.css'
import Layout from "../../components/Layout"
import Image from 'next/image'
import { useDispatch } from "react-redux";
import {useSelector} from "react-redux";
import { deleteSaladStates } from "../../provider/dishesSlice";


export default function Salad(){
  const dispatch = useDispatch();
  const { saladCategoryStates } = useSelector((state) => state.dishes);

  const onClickDelete = (i) => {
    dispatch(deleteSaladStates(i));
  }

  return(
    <Layout>
      <section className={utilStyles.categoryPage}>
        <h2 className={utilStyles.saladTitle}>Salad</h2>
        <ul>
          {
            saladCategoryStates.map((saladState, i) => {
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
                  <h3>{saladState.name}</h3>
                  <p>{saladState.tel}</p>
                  <p>{saladState.streetAddress}</p>
                  <p>{saladState.note}</p>
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