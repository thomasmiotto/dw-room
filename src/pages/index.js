import Head from 'next/head';
import styles from './app.module.css';

const pageMetadata = {
  title: 'Dental Waiting Room'
};

export default function NextPatient() {
  const waitingRooms = new Map(Object.entries({
    "A": [{
      reference: '#A101',
      date: '06/05/2023',
      noSS: '2 95 10 75 414 149',
      name: 'Jennah Aribat'
    }],
    "B": [{
      reference: '#B101',
      date: '06/05/2023',
      noSS: '1 95 10 75 414 149',
      name: 'Paul Margotton'
    }],
    "C": [{
      reference: '#C409',
      date: '06/05/2023',
      noSS: '1 95 10 75 414 149',
      name: 'David Golliath'
    }, {
      reference: '#C210',
      date: '06/05/2023',
      noSS: '1 95 10 75 414 149',
      name: 'Oleksander Lee'
    }, {
      reference: '#C311',
      date: '06/05/2023',
      noSS: '2 95 10 75 414 149',
      name: 'Jazmine Black'
    }],
    "D": []
  }));

  const displayRoom = (room) => {
    const appointments = waitingRooms.get(room);

    return <>
      <div className={`d-flex justify-content-center waiting-room__title waiting-room__title--${room}`}>
        {`Salle ${room}`}
      </div>
      {
        appointments.length !== 0 && <>
          <div className='d-flex justify-content-center waiting-room__patient-reference'>{appointments[0].reference}</div>
          <div className='d-flex justify-content-center waiting-room__patient-name'>{appointments[0].name}</div>
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
