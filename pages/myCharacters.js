/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getCharactersByUid } from '../api/characterData';
import CharacterCard from '../components/CharacterCard';
import { useAuth } from '../utils/context/authContext';

export default function MyCharacters() {
  const [characters, setCharacters] = useState();

  const { user } = useAuth();

  const getAllCharacters = () => {
    getCharactersByUid(user.uid).then(setCharacters);
  };
  useEffect(() => {
    getAllCharacters();
  }, []);

  return (
    <div className="d-flex flex-wrap">
      {characters?.map((chars) => (
        <CharacterCard key={chars.firebaseKey} charObj={chars} onUpdate={getAllCharacters} />
      ))}
    </div>
  );
}
