import Head from 'next/head';
import styles from './manage.module.css';

const pageMetadata = {
  title: 'Dental Waiting Room - Manage'
};

export default function ManageView({waitingRooms}) {

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
    </main>
  );
}