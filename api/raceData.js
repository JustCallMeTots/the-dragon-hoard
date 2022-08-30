import axios from 'axios';
import { clientCredentials } from '../utils/client';
// API CALLS FOR CHARACTERS

const dbUrl = clientCredentials.databaseURL;

const getRaces = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/race.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

export default getRaces;
