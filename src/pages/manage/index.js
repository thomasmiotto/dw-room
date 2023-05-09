import Head from 'next/head';
import styles from './manage.module.css';

const pageMetadata = {
  title: 'Dental Waiting Room - Manage'
};

export default function Manage() {
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

  const displayWaitingRooms = () => {
    const display = [];
    waitingRooms.forEach((appointments, room) => {
      display.push(
        <div className={styles.waitingRoom} key={`room-${room}`}>
          <h3 className={styles.waitingRoomTitle}>{`Salle ${room}`}</h3>
          {
            appointments.map((appointment, index) =>
              <div className={`${styles.waitingRoomPatient} ${styles['waitingRoomPatient' + appointment.reference.charAt(2)]}`} key={`appointment-${appointment.reference}`}>
                {appointment.name}
                {index !== appointments.length - 1 && <span className={styles.waitingRoomSeparator}></span>}
              </div>
            )
          }
        </div>
      )
    });
    return display;
  }

  return (
    <main className={'container'}>
      <Head>
        <title>{pageMetadata.title}</title>
      </Head>
      <section className={'row'}>
        <h2>Salles d'attente</h2>
        {
          displayWaitingRooms()
        }
      </section>
      <section className={'row'}>
        <h2>Créer un rendez-vous</h2>
        <form onSubmit={() => null}>
          <label htmlFor={'patient-name'}>{'Nom du patient'}</label>
          <input id={'patient-name'} type={'text'} />
          <label htmlFor={'no-ss'}>{'No Sécurité Sociale'}</label>
          <input id={'no-ss'} type={'text'} />
          <label htmlFor={'type'}>{'Type de soins'}</label>
          <select id={'type'}>
            <option value={'A'}>A</option>
            <option value={'B'}>B</option>
            <option value={'C'}>C</option>
            <option value={'D'}>D</option>
          </select>
          <button type={'submit'}>Nouveau rdv</button>
        </form>
      </section>
    </main>
  );
}