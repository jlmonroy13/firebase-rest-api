import { RequestHandler } from 'express';

import { db } from '../../index';
import { catchError, getDocData } from '../../utils';

const collectionName = 'apartments';

//Create Apartment
const createApartment: RequestHandler = async (req, res) => {
  try {
    const ref = db.collection(collectionName).doc();
    const apartmentId = ref.id;

    await db
      .collection(collectionName)
      .doc(apartmentId)
      .create({
        ...req.body,
        id: apartmentId,
      });

    return res.status(200).send();
  } catch (error) {
    return catchError({ error, res });
  }
};

//Get Apartments
const getApartments: RequestHandler = async (req, res) => {
  try {
    const document = db.collection(collectionName);
    const response = await document.get();
    const apartments = response.docs.map(getDocData);

    return res.status(200).send(apartments);
  } catch (error) {
    return catchError({ error, res });
  }
};

//Get Apartment
const getApartment: RequestHandler = async (req, res) => {
  try {
    const document = db.collection(collectionName).doc(req.params.id);
    const response = await document.get();
    const apartment = response.data();

    return res.status(200).send(apartment);
  } catch (error) {
    return catchError({ error, res });
  }
};

//Update Apartment
const updateApartment: RequestHandler = async (req, res) => {
  try {
    const document = db
      .collection(collectionName)
      .doc(req.params.id);

    await document.update({
      ...req.body,
    });

    return res.status(200).send();
  } catch (error) {
    return catchError({ error, res });
  }
};

//Delete Apartment
const deleteApartment: RequestHandler = async (req, res) => {
  try {
    const document = db
      .collection(collectionName)
      .doc(req.params.id);

    await document.delete();

    return res.status(200).send();
  } catch (error) {
    return catchError({ error, res });
  }
};

export {
  createApartment,
  getApartments,
  getApartment,
  updateApartment,
  deleteApartment,
};
