import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    /*
    Reversing the logical operator to sort dates in descending order
    */
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );

  const nextCard = () => {
    if (byDateDesc && byDateDesc.length > 0) { // Added length check to remove console error
      setTimeout(
        /** Adding +1 to index to remove white image */
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
        /** Added React Fragment to wrap each element of the map and thus assign them a unique key */
        <React.Fragment key={`focus-${event.title}-${event.date}-${event.description}`}>
          <div
            /** Changing the key so that it is unique */
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
                  /* Replacing the key for the current date */
                  key={_.date}
                  type="radio"
                  name="radio-button"
                  /** Changing idx by index so that the radio buttons update properly */
                  checked={index === radioIdx}
                  readOnly // Added readOnly to remove console error
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