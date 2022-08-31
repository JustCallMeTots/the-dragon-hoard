import axios from 'axios';
import { clientCredentials } from '../utils/client';
// API CALLS FOR CHARACTERS

const dbUrl = clientCredentials.databaseURL;

const getClasses = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/class.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

export default getClasses;
