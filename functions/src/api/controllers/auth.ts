import { RequestHandler } from 'express';
import * as admin from 'firebase-admin';

import { mapUser } from '../../utils';

// SIGN-UP
export const signUp: RequestHandler = async (req, res) => {
  try {
    const { name, password, email, role } = req.body;

    if (!name || !password || !email || !role) {
      return res.status(400).send({ message: 'Missing fields' });
    }

    const { uid } = await admin.auth().createUser({
      displayName: name,
      password,
      email,
    });
    await admin.auth().setCustomUserClaims(uid, { role });

    return res.status(201).send({ uid });
  } catch (err) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
  }
};

// GET USERS
export const getUsers: RequestHandler = async (_, res) => {
  try {
    const listUsers = await admin.auth().listUsers();
    const users = listUsers.users.map(mapUser);

    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
  }
};

// GET USER
export const getUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await admin.auth().getUser(id);

    return res.status(200).send(mapUser(user));
  } catch (err) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
  }
};

// UPDATE USER
export const updateUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    await admin.auth().updateUser(id, { ...req.body });
    if (role) await admin.auth().setCustomUserClaims(id, { role });
    const user = await admin.auth().getUser(id);

    return res.status(200).send(mapUser(user));
  } catch (err) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
  }
};

// DELETE USER
export const deleteUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await admin.auth().deleteUser(id);

    return res.status(200).send({ uid: id });
  } catch (err) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
  }
};
