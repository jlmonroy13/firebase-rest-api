import { RequestHandler, Request, Response } from 'express';
import * as admin from 'firebase-admin';

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).send({ message: 'Unauthorized' });

  if (!authorization.startsWith('Bearer'))
    return res.status(401).send({ message: 'Unauthorized' });

  const split = authorization.split('Bearer ');
  if (split.length !== 2)
    return res.status(401).send({ message: 'Unauthorized' });

  const token = split[1];

  try {
    const decodedToken: admin.auth.DecodedIdToken = await admin
      .auth()
      .verifyIdToken(token);
    res.locals = {
      ...res.locals,
      uid: decodedToken.uid,
      role: decodedToken.role,
      email: decodedToken.email,
    };

    return next();
  } catch (err) {
    console.error(`${err.code} -  ${err.message}`);
    return res.status(401).send({ message: 'Unauthorized' });
  }
};

export const isAuthorized = (opts: {
  hasRole: Array<'admin' | 'realtor' | 'client'>;
  allowSameUser?: boolean;
}) => (req: Request, res: Response, next: Function) => {
  const { role, email, uid } = res.locals;
  const { id } = req.params;

  if (email === 'admin@toptal.com') return next();

  if (opts.allowSameUser && id && uid === id) return next();

  if (!role) return res.status(403).send();

  if (opts.hasRole.includes(role)) return next();

  return res.status(403).send();
};
