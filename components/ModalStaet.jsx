import utilStyles from '../styles/modalStaet.module.css'

export default function ModalStaet(props){
  const { selectedState, modal, setModal } = props;
  
  return(
      <section className={modal ? utilStyles.modalStaetOpen : utilStyles.modalStaet}>
        <div className={utilStyles.modalStaet__box}>
          <h3>詳細</h3>
          <p>{selectedState?.name}</p>
          <p>{selectedState?.tel}</p>
          <p>{selectedState?.streetAddress}</p>
          <p>{selectedState?.note}</p>
          <button onClick={()=> setModal(false)}>close</button>
        </div>
      </section>
  )
}