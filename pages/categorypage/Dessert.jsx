import utilStyles from '../../styles/categorypage.module.css'
import Layout from "../../components/Layout"
import Image from 'next/image'
import { useDispatch, useSelector } from "react-redux";
import { deleteDessertStates } from "../../provider/dishesSlice";


export default function Dessert(){
  const dispatch = useDispatch();
  const { dessertCategory } = useSelector((state) => state.dishes);

  const onClickDelete = (i) => {
    dispatch(deleteDessertStates(i));
  }

  return(
    <Layout>
      <section className={utilStyles.categoryPage}>
        <h2 className={utilStyles.dessertTitle}>Dessert</h2>
        <ul>
          {
            dessertCategory.map((dessertState, i) => {
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
                  <h3>{dessertState.name}</h3>
                  <p>{dessertState.tel}</p>
                  <p>{dessertState.streetAddress}</p>
                  <p>{dessertState.note}</p>
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