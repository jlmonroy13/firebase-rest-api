import { RequestHandler, Request, Response } from 'express';
import * as admin from 'firebase-admin';

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).send({ message: 'Unauthorized' });
  } else if (!authorization.startsWith('Bearer')) {
    res.status(401).send({ message: 'Unauthorized' });
  } else {
    const split = authorization.split('Bearer ');
    if (split.length !== 2) {
      res.status(401).send({ message: 'Unauthorized' });
    } else {
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
        next();
      } catch (err) {
        console.error(`${err.code} -  ${err.message}`);
        res.status(401).send({ message: 'Unauthorized' });
      }
    }
  }
};

export const isAuthorized = (opts: {
  hasRole: Array<'admin' | 'realtor' | 'client'>;
  allowSameUser?: boolean;
}) => (req: Request, res: Response, next: Function) => {
  const { role, uid } = res.locals;
  const { id } = req.params;

  if (opts.allowSameUser && id && uid === id) {
    next();
  } else if (!role) {
    res.status(403).send();
  } else if (opts.hasRole.includes(role)) {
    next();
  } else {
    res.status(403).send();
  }
};
