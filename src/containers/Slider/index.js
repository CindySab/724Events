import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    /*
    Inversement de l'opérateur logique pour trier les dates en ordre décroissant
    */
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );

  const nextCard = () => {
    if (byDateDesc && byDateDesc.length > 0) { // Ajout de vérification de lenght pour envlever erreur console
      setTimeout(
        /** Ajout de +1 à l'index pour supprimer l'image blanche */
        () => setIndex((index + 1) % byDateDesc.length),
        5000
      );
    }
  };
  
  useEffect(() => {
    nextCard();
  });

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        /** Ajout de React Fragment afin d'envelopper chaque élément de la map et ainsi leur attribuer une clé unique */
        <React.Fragment key={`focus-${event.title}-${event.date}-${event.description}`}>
          <div
            /** Modification de la key afin qu'elle soit unique */
            className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  /* Remplacement de la key pour la date en cours */
                  key={_.date}
                  type="radio"
                  name="radio-button"
                  /** Changement de idx par index pour que les boutons radio se mettent bien à jour */
                  checked={index === radioIdx}
                  readOnly // Ajout de readOnly pour enlever erreur console + modification css pour ajout couleur bleue
                />
              ))}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Slider;