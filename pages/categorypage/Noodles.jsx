import utilStyles from '../../styles/categorypage.module.css'
import Layout from "../../components/Layout"
import Image from 'next/image'
import { useDispatch, useSelector } from "react-redux";
import { deleteNoodlesStates } from "../../provider/dishesSlice";


export default function Noodles(){
  const dispatch = useDispatch();
  const { noodlesCategory } = useSelector((state) => state.dishes);

  const onClickDelete = (i) => {
    dispatch(deleteNoodlesStates(i));
  }

  return(
    <Layout>
      <section className={utilStyles.categoryPage}>
        <h2 className={utilStyles.noodlesTitle}>Noodles</h2>
        <ul>
          {
            noodlesCategory.map((noodlesState, i) => {
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
                  <h3>{noodlesState.name}</h3>
                  <p>{noodlesState.tel}</p>
                  <p>{noodlesState.streetAddress}</p>
                  <p>{noodlesState.note}</p>
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