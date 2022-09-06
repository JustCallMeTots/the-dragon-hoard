import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteCharacter } from '../api/characterData';
import { useAuth } from '../utils/context/authContext';

function CharacterCard({ charObj, onUpdate }) {
  const { user } = useAuth();
  const deleteThisCharacter = () => {
    if (window.confirm(`Send ${charObj.charName} to the Outer Planes?`)) {
      deleteCharacter(charObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card className="characterCard" style={{ width: '18rem', margin: '10px' }}>
      <Card.Img className="charImg" variant="top" src={charObj.characterImg} alt={charObj.charName} style={{ height: '400px' }} />
      <Card.Body>
        <h1>{charObj.charName}</h1>
        <h3>Race: {charObj.race}</h3><h3> Class: {charObj.nameOfCLass}</h3>
        <h5>Level: {charObj.level}</h5>
      </Card.Body>
      { charObj.uid === user.uid
        ? (
          <>
            <Link href={`/edit/${charObj.firebaseKey}`} passHref>
              <Button
                variant="info"
                className="editChar"
              > Edit Character
              </Button>
            </Link>
            <Button
              variant=""
              onClick={deleteThisCharacter}
              className="deleteChar"
            >
              DELETE
            </Button>
          </>
        )
        : ''}
      <Link href={`/${charObj.firebaseKey}`} passHref>
        <Button variant="primary" className="m-2">VIEW</Button>
      </Link>
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
    uid: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
    displayName: PropTypes.string,
    handle: PropTypes.string,
    image: PropTypes.string,
    uid: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
};

CharacterCard.defaultProps = {
  user: {
    displayName: '',
    handle: '',
    image: '',
    uid: '',
  },
};

export default CharacterCard;
