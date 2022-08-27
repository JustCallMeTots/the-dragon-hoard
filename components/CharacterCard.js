import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function CharacterCard({ charObj }) {
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={charObj.characterImg} alt={charObj.charName} style={{ height: '400px' }} />
    </Card>
  );
}

CharacterCard.propTypes = {
  charObj: PropTypes.shape({
    charName: PropTypes.string,
    characterImg: PropTypes.string,
  }).isRequired,
};
