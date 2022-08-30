import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function CharacterCard({ charObj }) {
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={charObj.characterImg} alt={charObj.charName} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{charObj.charName}</Card.Title>
        <h3>Race: {charObj.race}</h3><h3> Class: {charObj.nameOfCLass}</h3>
        <h5>Level: {charObj.level}</h5>
      </Card.Body>

    </Card>
  );
}

CharacterCard.propTypes = {
  charObj: PropTypes.shape({
    charName: PropTypes.string,
    characterImg: PropTypes.string,
    level: PropTypes.string,
    nameOfCLass: PropTypes.string,
    race: PropTypes.string,
    descriptions: PropTypes.string,
    equipment: PropTypes.string,
    spells: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};
