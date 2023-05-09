export default function Manage() {
  const waitingRooms = {
    "A" : [{
      reference: '#A101',
      date: '06/05/2023',
      noSS: '2 95 10 75 414 149',
      name: 'Jennah Aribat'
    }],
    "B" : [{
      reference: '#B101',
      date: '06/05/2023',
      noSS: '1 95 10 75 414 149',
      name: 'Paul Margotton'
    }],
    "C" : [{
      reference: '#C409',
      date: '06/05/2023',
      noSS: '1 95 10 75 414 149',
      name: 'David Golliath'
    },{
      reference: '#C210',
      date: '06/05/2023',
      noSS: '1 95 10 75 414 149',
      name: 'Oleksander Lee'
    },{
      reference: '#C311',
      date: '06/05/2023',
      noSS: '2 95 10 75 414 149',
      name: 'Jazmine Black'
    }],
    "D" : []
  };

  const displayWaitingRooms = () => {
    const display = [];
    waitingRooms.forEach((appointments, room) => {
       display.push(
        <>
          <div className='next-patient__room'>
            {`Salle ${room}`}
          </div>
          {
            appointments.length !== 0 && <>
              <div className='next-patient__reference'>{appointments[0].reference}</div>
              <div className='next-patient__name'>{appointments[0].name}</div>
            </>
          }
        </>
       )
    });
    return display;
  }

  return (
    <main className={'manage'}>
      <section className={'manage__waiting-room'}>
        {
          waitingRooms.map((appointments, room) => {
            <div className={'waiting-room'}>
              <h3 className={'waiting-room__title'}>{`Salle ${room}`}</h3>
              {
                appointments.map(appointment => {
                  <div className={`waiting-room__patient waiting-room__patient--${appointment.reference.charAt(2)}`}>
                    {appointment.name}
                  </div>
                })
              }
            </div>
          })
        }
      </section>
      <section className={'manage__new-appointment'}>
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
    </main>);
}