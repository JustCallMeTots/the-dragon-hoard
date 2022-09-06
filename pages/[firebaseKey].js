import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleCharacter } from '../api/characterData';

export default function ViewCharacter() {
  const [charDetails, setCharDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleCharacter(firebaseKey).then(setCharDetails);
  }, [firebaseKey]);

  return (
    <div className="detailCard">
      <div className="d-flex flex-column">
        <img className="charImg" variant="top" src={charDetails.characterImg} alt={charDetails.charName} style={{ height: '400px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h2>
          {charDetails.charName}
          {charDetails.alive ? '' : '💀'}
        </h2>
        <h3>Level: {charDetails.level}</h3>
        <h4>
          Race: {charDetails.race} Class: {charDetails.nameOfCLass}
        </h4>

        <p>Character Description: {charDetails.descriptions}</p>
        <hr />
        <p>
          Spell list: {charDetails.spells}
        </p>
        <p>
          Equipment: {charDetails.equipment}
        </p>
      </div>
    </div>
  );
}
