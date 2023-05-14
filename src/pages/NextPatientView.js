import Head from 'next/head';
import styles from './app.module.css';

const pageMetadata = {
  title: 'Dental Waiting Room'
};

export default function NextPatientView({waitingRooms}) {

  const displayRoom = (room) => {
    let nextAppointement;
    const appointments = waitingRooms.get(room);
    nextAppointement = appointments ? appointments[0] : undefined;

    return <>
      <div className={`d-flex justify-content-center waiting-room__title waiting-room__title--${room}`}>
        {`Salle ${room}`}
      </div>
      {
        nextAppointement && <>
          <div className='d-flex justify-content-center waiting-room__patient-reference'>{nextAppointement.reference}</div>
          <div className='d-flex justify-content-center waiting-room__patient-name'>{nextAppointement.name}</div>
        </>
      }
    </>
  };

  return (
    <main className={'container'}>
      <Head>
        <title>{pageMetadata.title}</title>
      </Head>
      <div className={'row'}>
        <div className={`col-6 d-flex flex-column align-content-center justify-content-center ${styles.waitingRoom} waiting-room--A`}>
          {
            displayRoom('A')
          }
        </div>
        <div className={`col-6 d-flex flex-column align-content-center justify-content-center ${styles.waitingRoom} waiting-room--B`}>
          {
            displayRoom('C')
          }
        </div>
      </div>
      <div className={'row'}>
        <div className={`col-6 d-flex flex-column align-content-center justify-content-center ${styles.waitingRoom} waiting-room--C`}>
          {
            displayRoom('B')
          }
        </div>
        <div className={`col-6 d-flex flex-column align-content-center justify-content-center ${styles.waitingRoom} waiting-room--B`}>
          {
            displayRoom('D')
          }
        </div>
      </div>
    </main>
  );
}
