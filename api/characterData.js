import axios from 'axios';
import { clientCredentials } from '../utils/client';
// API CALLS FOR CHARACTERS

const dbUrl = clientCredentials.databaseURL;

const getSingleCharacter = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/character/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const getCharactersByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/character.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const getCharacters = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/character.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createCharacter = (charObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/character.json`, charObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/character/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const updateCharacter = (charObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/character/${charObj.firebaseKey}.json`, charObj)
    .then(resolve)
    .catch(reject);
});

const deleteCharacter = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/character/${firebaseKey}.json`)
    .then(() => resolve('deleted'))
    .catch((error) => reject(error));
});

export {
  getCharacters,
  getSingleCharacter,
  createCharacter,
  updateCharacter,
  deleteCharacter,
  getCharactersByUid,
};
