import Head from "next/head";
import { getWaitingRoomColor } from "@/shared/colors";

const pageMetadata = {
  title: "Dental Waiting Room - Manage",
};

export default function ManageView({ waitingRooms }) {
  const displayWaitingRooms = () => {
    const display = [];
    waitingRooms.forEach((appointments, room) => {
      display.push(
        <div className={`mt-4`} key={`room-${room}`}>
          <h3
            className={`px-3 py-2 ${getWaitingRoomColor(room)}`}
          >{`Salle ${room}`}</h3>

          {appointments.map((appointment, index) => (
            <>
              <div
                className={`card mb-2`}
                key={`appointment-${appointment.reference}`}
              >
                <div className={"card-body"}>
                  {appointment.name}&nbsp;|&nbsp;{appointment.noSS}
                </div>
              </div>
              {index !== appointments.length - 1 && (
                <span
                  className={"px-3 material-icons material-symbols-outlined"}
                >
                  arrow_downward
                </span>
              )}
            </>
          ))}
        </div>
      );
    });
    return display;
  };

  return (
    <main className={"container my-5"}>
      <Head>
        <title>{pageMetadata.title}</title>
      </Head>

      <div className="container text-center">
        <div className="row gap-5">
          <div className={"col"}>
            <section>
              <h2>Salles d'attente</h2>
              {displayWaitingRooms()}
            </section>
          </div>
          <div className="col">
            <h2>Inscription</h2>
            <form className="text-start">
              <label className="form-label">Nom :</label>
              <input
                className="form-control mb-3"
                type="text"
                id="nom"
                name="name"
                required
              />

              <label className="form-label">Prénom :</label>
              <input
                className="form-control mb-3"
                type="text"
                id="prenom"
                name="prenom"
                required
              />

              <label className="form-label" for="numero">
                Numéro Sécurité Sociale:
              </label>
              <input
                className="form-control mb-3"
                type="text"
                id="numero"
                name="numero"
                pattern="[0-9]{13}"
                minlength="13"
                maxlength="13"
                required
              />

              <label className="form-label">Mail :</label>
              <input
                className="form-control mb-3"
                type="text"
                id="mail"
                name="mail"
                required
              />

              <label className="form-label">Téléphone :</label>
              <input
                className="form-control mb-3"
                type="text"
                id="phone"
                name="tel"
                pattern="[0-9]{10}"
                minlength="10"
                maxlength="10"
                required
              />
              <div className="d-flex">
                <input className="mx-auto" type="submit" value="Valider" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
