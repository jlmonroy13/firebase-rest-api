import { RequestHandler } from 'express';

import { db } from '../../index';
import { getDocData } from '../../utils';


const getLocations: RequestHandler = async (req, res) => {
  try {
    const [citiesResponse, countriesResponse] = await Promise.all([
      db.collection('cities').get(),
      db.collection('countries').get(),
    ]);
    const cities = citiesResponse.docs.map(getDocData);
    const countries = countriesResponse.docs.map(getDocData);

    const response = countries.map(({ id, name }) => ({
      id,
      country: name,
      cities: cities.reduce((acc, { countryId, ...city }) => {
        if (countryId === id) acc.push(city);
        return acc;
      }, []),
    }));

    return res.status(200).send(response);
  } catch (err) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
  }
}

export {
  getLocations,
};
