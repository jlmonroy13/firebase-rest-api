import { RequestHandler, Request } from 'express';

import { db } from '../../index';
import { catchError, getDocData, evaluateMaxAndMinQuery } from '../../utils';

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

const filterApartment = (req: Request, apartment: FirebaseFirestore.DocumentData) => {
  const maxPriceQuery: string = req.query.maxPrice as string;
  const minPriceQuery: string = req.query.minPrice as string;
  const maxSizeQuery: string = req.query.maxSize as string;
  const minSizeQuery: string = req.query.minSize as string;

  const matchedPrice = evaluateMaxAndMinQuery(minPriceQuery, maxPriceQuery, apartment.price);
  const matchedSize = evaluateMaxAndMinQuery(minSizeQuery, maxSizeQuery, apartment.size);

  if ((maxPriceQuery || minPriceQuery) && (maxSizeQuery || minSizeQuery)) return matchedPrice && matchedSize;
  if (maxPriceQuery || minPriceQuery) return matchedPrice;
  return matchedSize;
};

//Get Apartments
const getApartments: RequestHandler = async (req, res) => {
  try {
    const cityIdQuery = req.query.cityId;
    const realtorIdQuery = req.query.realtorId;
    const rentedByQuery = req.query.rentedBy;
    const bedroomsQuery = req.query.bedrooms;
    const maxPriceQuery = req.query.maxPrice;
    const minPriceQuery = req.query.minPrice;
    const maxSizeQuery = req.query.maxSize;
    const minSizeQuery = req.query.minSize;

    let document;
    if (cityIdQuery && bedroomsQuery) {
      document = db.collection(collectionName).where('cityId', '==', cityIdQuery).where('bedrooms', '==', Number(bedroomsQuery));
    } else if (cityIdQuery) {
      document = db.collection(collectionName).where('cityId', '==', cityIdQuery);
    } else if (realtorIdQuery) {
      document = db.collection(collectionName).where('realtorId', '==', realtorIdQuery);
    } else if (rentedByQuery) {
      document = db.collection(collectionName).where('rentedBy', '==', rentedByQuery);
    } else {
      document = db.collection(collectionName);
    }

    const response = await document.get();
    let apartments = response.docs.map(getDocData);

    if (maxPriceQuery || minPriceQuery || maxSizeQuery || minSizeQuery) {
      apartments = apartments.filter((apartment) => filterApartment(req, apartment));
    }

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
