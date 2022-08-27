import React, { useEffect, useState } from 'react';
import { getCharacters } from '../api/characterData';
import CharacterCard from '../components/CharacterCard';
// import { useAuth } from '../utils/context/authContext';

export default function Characters() {
  const [characters, setCharacters] = useState();

  //   const { user } = useAuth();

  const getAllCharacters = () => {
    getCharacters().then(setCharacters);
  };
  useEffect(() => {
    getAllCharacters();
  }, []);

  return (
    <div className="d-flex flex-wrap">
      {/* TODO: map over books here using BookCard component */}
      {characters?.map((chars) => (
        <CharacterCard key={chars.firebaseKey} charObj={chars} onUpdate={getAllCharacters} />
      ))}
    </div>
  );
}
