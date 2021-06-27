import utilStyles from '../styles/modalStaet.module.css'

export default function ModalStaet(props){
  const { selectedState, modal, setModal } = props;
  
  return(
      <section className={modal ? utilStyles.modalStaetOpen : utilStyles.modalStaet}>
        <div className={utilStyles.modalStaet__box}>
          <h3>詳細</h3>
          <div className={utilStyles.modalStaet__boxIn}>
            <h4>StoreName</h4>
            <p className={utilStyles.modalStaet__boxText}>{selectedState?.name}</p>
            <h4>PhoneNumber</h4>
            <p className={utilStyles.modalStaet__boxText}>{selectedState?.tel}</p>
            <h4>StreetAddress</h4>
            <p className={utilStyles.modalStaet__boxText}>{selectedState?.streetAddress}</p>
            <h4>Note</h4>
            <p className={utilStyles.modalStaet__boxNote}>{selectedState?.note}</p>
            <button onClick={()=> setModal(false)}>close</button>
            </div>
        </div>
      </section>
  )
}