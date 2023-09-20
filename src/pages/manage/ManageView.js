import Head from "next/head";
import { getWaitingRoomColor } from "@/shared/colors";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_BASE_URL, FETCHER } from "@/shared/api";

const pageMetadata = {
  title: "Dental Waiting Room - Manage",
};

export default function ManageView({ waitingRooms }) {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    numero: "",
    mail: "",
    tel: "",
    specialite: "A",
    id: "",
  });

  const [errors, setErrors] = useState({});

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const validationErrors = { ...errors };
    switch (name) {
      case "nom":
        if (!/^[A-Za-zÀ-ÿ\s-]{2,20}$/.test(value)) {
          validationErrors[name] =
            "Le nom ne doit contenir que des lettres et au moins 3 caractères";
        } else {
          delete validationErrors[name];
          e.target.classList.remove("is-invalid");
        }
        break;
      case "prenom":
        if (!/^[A-Za-zÀ-ÿ\s-]{2,20}$/.test(value)) {
          validationErrors[name] =
            "Le prénom ne doit contenir que des lettres et au moins 3 caractères";
        } else {
          delete validationErrors[name];
          e.target.classList.remove("is-invalid");
        }
        break;
      case "numero":
        if (
          !/^[12][0-9]{2}(0[1-9]|1[0-2])(2[AB]|[0-9]{2})[0-9]{3}[0-9]{3}$/.test(
            value
          )
        ) {
          validationErrors[name] = "Numéro Sécurité Sociale est invalide";
        } else {
          delete validationErrors[name];
          e.target.classList.remove("is-invalid");
        }
        break;

      case "mail":
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!emailRegex.test(value)) {
          validationErrors[name] = "Adresse e-mail invalide";
        } else {
          delete validationErrors[name];
          e.target.classList.remove("is-invalid");
        }
        break;

      case "tel":
        if (!/^[0-9]{10}$/.test(value)) {
          validationErrors[name] = "Le numéro de téléphone est invalide";
        } else {
          delete validationErrors[name];
          e.target.classList.remove("is-invalid");
        }
        break;
      case "id":
        if (!/^[0-9]{3}$/.test(value)) {
          validationErrors[name] = "L'ID doit contenir exactement 3 chiffres";
        } else {
          delete validationErrors[name];
          e.target.classList.remove("is-invalid");
        }
        break;
      default:
        break;
    }

    setFormData({ ...formData, [name]: value });
    setErrors(validationErrors);
  };

  const handleSubmit = (event) => {
  event.preventDefault();

  const nom = event.target.nom.value;
  const prenom = event.target.prenom.value;
  let numero = event.target.numero.value;
  const mail = event.target.mail.value;
  const tel = event.target.tel.value;
  const specialite = event.target.specialite.value;
  const id = event.target.id.value;


 
  numero = numero.replace(/\s/g, '');


  const nameRegex = /^[A-Za-zÀ-ÿ\s-]{2,20}$/;
  const numeroRegex =
    /^[12][0-9]{2}(0[1-9]|1[0-2])(2[AB]|[0-9]{2})[0-9]{3}[0-9]{3}$/;
  const telRegex = /^[0-9]{10}$/;
  const idRegex = /^[0-9]{3}$/;
  const validationErrors = {};

  if (!nom.match(nameRegex)) {
    validationErrors.nom = "Le nom ne doit contenir que des lettres";
  }
  if (!prenom.match(nameRegex)) {
    validationErrors.prenom = "Le prénom ne doit contenir que des lettres";
  }
  if (!numero.match(numeroRegex)) {
    validationErrors.numero = "Numéro Sécurité Sociale est invalide";
  }

  if (!tel.match(telRegex)) {
    validationErrors.tel = "Le numéro de téléphone est invalide";
  }
  if (!id.match(idRegex)) {
    validationErrors.id = "L'ID doit contenir exactement 3 chiffres";
  }

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }
  event.target.reset();
  setErrors({});
  
  numero = numero.replace(
    /(\d)(\d{2})(\d{2})(\d{2})(\d{3})(\d{3})/g,
    "$1 $2 $3 $4 $5 $6"
  );
  const patient = {
    id: `#${specialite}${id}`,
    numero,
    prenom,
    nom,
    mail,
    tel,
  };
  fetch(`${API_BASE_URL}/waiting-rooms`, {
    body: JSON.stringify(patient),
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  });
};




  return (
    <main className={"container my-5"}>
      <Head>
        <title>{pageMetadata.title}</title>
      </Head>

      <div>
        <section className={"row"}>
          <h2>Salles d'attente</h2>
          {displayWaitingRooms()}
        </section>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <div>
        <h2> Prendre RDV</h2>
        <br></br>
        <form method="post" onSubmit={handleSubmit} className="row">
          <div className="col">
            <div className="form-floating">
              <input
                type="text"
                id="nom"
                placeholder="Nom"
                name="nom"
                required
                className={`form-control ${errors.nom ? "is-invalid" : ""}`}
                value={formData.nom}
                onChange={handleInputChange}
              />
              <label for="nom">Nom</label>
              {errors.nom && <p className="error">{errors.nom}</p>}
            </div>

            <br></br>
            <div className="form-floating">
              <input
                type="text"
                id="prenom"
                name="prenom"
                placeholder="Prenom"
                required
                className={`form-control ${errors.prenom ? "is-invalid" : ""}`}
                value={formData.prenom}
                onChange={handleInputChange}
              />
              <label htmlFor="prenom">Prénom</label>
              {errors.prenom && <p className="error">{errors.prenom}</p>}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                type="text"
                id="numero"
                name="numero"
                placeholder="numero"
                pattern="[0-9]{13}"
                minLength="13"
                maxLength="13"
                required
                className={`form-control ${errors.numero ? "is-invalid" : ""}`}
                value={formData.numero}
                onChange={handleInputChange}
              />
              <label htmlFor="numero">Numéro Sécurité Sociale</label>
              {errors.numero && <p className="error">{errors.numero}</p>}
            </div>
          </div>
          <div className="col">
            <div className="form-floating">
              <input
                type="text"
                id="mail"
                name="mail"
                placeholder="mail"
                required
                className={`form-control ${errors.mail ? "is-invalid" : ""}`}
                value={formData.mail}
                onChange={handleInputChange}
              />
              <label htmlFor="mail">Mail</label>
              {errors.mail && <p className="error">{errors.mail}</p>}
            </div>
            <br></br>
            <div className="form-floating">
              <input
                type="text"
                id="phone"
                name="tel"
                placeholder="tel"
                pattern="[0-9]{10}"
                minLength="10"
                maxLength="10"
                required
                className={`form-control ${errors.tel ? "is-invalid" : ""}`}
                value={formData.tel}
                onChange={handleInputChange}
              />
              <label htmlFor="phone">Téléphone</label>
              {errors.tel && <p className="error">{errors.tel}</p>}
            </div>
            <br></br>
            <div className="row align-items-center">
              <div className="col-1">
                <select
                  id="specialite"
                  name="specialite"
                  required
                  value={formData.specialite}
                  onChange={handleInputChange}
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>
              <div className="form-floating col-11">
                <input
                  type="text"
                  id="id"
                  name="id"
                  placeholder="id"
                  pattern="[0-9]{3}"
                  minLength="3"
                  maxLength="3"
                  required
                  className={`form-control ${errors.id ? "is-invalid" : ""}`}
                  value={formData.id}
                  onChange={handleInputChange}
                />
                <label htmlFor="id">&nbsp; Id </label>
                {errors.id && <p className="error">{errors.id}</p>}
              </div>
            </div>
            <br></br>
            <input type="submit" value="Valider" className="btn btn-primary" />
          </div>
        </form>

        <br></br>
      </div>
    </main>
  );
}
