import { RequestHandler } from 'express';
import * as admin from 'firebase-admin';

const signUp: RequestHandler = async (req, res) => {
  try {
    const { name, password, email, role } = req.body

    if (!name || !password || !email || !role) {
      return res.status(400).send({ message: 'Missing fields' })
    }

    const { uid } = await admin.auth().createUser({
      displayName: name,
      password,
      email
    })
    await admin.auth().setCustomUserClaims(uid, { role })

    return res.status(201).send({ uid })
  } catch (err) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
  }
}

export {
  signUp,
};
