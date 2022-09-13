import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createCharacter, updateCharacter } from '../../api/characterData';
import { useAuth } from '../../utils/context/authContext';
import getRaces from '../../api/raceData';
import getClasses from '../../api/classData';

const initialState = {
  charName: '',
  characterImg: '',
  level: '',
  ability: '',
  descriptions: '',
  equipment: '',
  spells: '',
  alive: true,
};

function CharacterForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [races, setRaces] = useState([]);
  const [classes, setClasses] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getRaces().then(setRaces);
    getClasses().then(setClasses);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateCharacter(formInput)
        .then(() => router.push('/characters'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createCharacter(payload).then(() => {
        router.push('/characters');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Character</h2>
      <FloatingLabel controlId="floatingInput1" label="Character Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter Character Name" name="charName" value={formInput.charName} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Character Image" className="mb-3">
        <Form.Control type="url" placeholder="Enter Character Image" name="characterImg" value={formInput.characterImg} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Level" className="mb-3">
        <Form.Control type="text" placeholder="Enter Level" name="level" value={formInput.level} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Ability Scores" className="mb-3">
        <Form.Control type="text" placeholder="Ability Scores" name="ability" value={formInput.ability} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelect" label="Race">
        <Form.Select
          aria-label="Race"
          name="race"
          onChange={handleChange}
          className="mb-3"
          required
        >
          <option value="">Select a Race</option>
          {
            races.map((race) => (
              <option
                key={race.firebaseKey}
                value={race.firebaseKey}
                selected={obj.race === race.raceName}
              >
                {race.raceName}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelect" label="Class">
        <Form.Select
          aria-label="Class"
          name="nameOfCLass"
          onChange={handleChange}
          className="mb-3"
          required
        >
          <option value="">Select a Class</option>
          {
            classes.map((className) => (
              <option
                key={className.firebaseKey}
                value={className.firebaseKey}
                selected={obj.nameOfCLass === className.nameOfCLass}
              >
                {className.nameOfCLass}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Descriptions" className="mb-3">
        <Form.Control type="text" placeholder="Enter Descriptions" name="descriptions" value={formInput.descriptions} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Equipment" className="mb-3">
        <Form.Control type="text" placeholder="Enter Equipment" name="equipment" value={formInput.equipment} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Spells" className="mb-3">
        <Form.Control type="text" placeholder="Enter Spells" name="spells" value={formInput.spells} onChange={handleChange} required />
      </FloatingLabel>

      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="alive"
        name="alive"
        label="alive?"
        checked={formInput.alive}
        onChange={(e) => setFormInput((prevState) => ({
          ...prevState,
          alive: e.target.checked,
        }))}
      />
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Character</Button>
    </Form>
  );
}

CharacterForm.propTypes = {
  obj: PropTypes.shape({
    charName: PropTypes.string,
    characterImg: PropTypes.string,
    level: PropTypes.string,
    ability: PropTypes.string,
    nameOfCLass: PropTypes.string,
    race: PropTypes.string,
    descriptions: PropTypes.string,
    equipment: PropTypes.string,
    spells: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

CharacterForm.defaultProps = {
  obj: initialState,
};

export default CharacterForm;
