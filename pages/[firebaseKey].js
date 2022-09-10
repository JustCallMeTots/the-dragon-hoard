/* eslint-disable @next/next/no-img-element */
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
      <div className="">
        <img className="charImg" variant="top" src={charDetails.characterImg} alt={charDetails.charName} style={{ height: '400px' }} />
      </div>
      <div
        className=""
        style={{
          margin: '20px', width: '200px', justifyContent: 'space-between', color: 'wheat',
        }}
      >
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
