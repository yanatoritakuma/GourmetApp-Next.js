import utilStyles from '../../styles/categorypage.module.css'
import Layout from "../../components/Layout"
import Image from 'next/image'
import { useDispatch } from "react-redux";
import {useSelector} from "react-redux";
import { deleteMeatStates } from "../../provider/dishesSlice";


export default function MeatDish(){
  const dispatch = useDispatch();
  const { meatStates } = useSelector((state) => state.dishes);

  const onClickDelete = (i) => {
    const newMeatStates = [...meatStates];
    newMeatStates.splice(i,1);
    dispatch(deleteMeatStates(newMeatStates));
  }

  return(
    <Layout>
      <section className={utilStyles.categorypage}>
        <h2 className={utilStyles.MeatDishTitle}>MeatDish</h2>
        <ul>
          {
            meatStates.map((allState, i) => {
              return(
                <li key={i}>
                  <div className={utilStyles.categorypage__img}>
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