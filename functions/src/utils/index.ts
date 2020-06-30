import express from 'express';
import { admin } from 'firebase-admin/lib/auth';

interface CatchErrorProps {
  error: express.ErrorRequestHandler;
  res: express.Response;
}

export const catchError = ({ error, res }: CatchErrorProps) => {
  console.log(error);
  return res.status(500).send(error);
};

export const getDocData = (
  doc: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>,
) => doc.data();

export const evaluateMaxAndMinQuery = (
  min: string,
  max: string,
  value: string,
) => {
  const hasMinAndMax = !!min && !!max;
  const onlyHasMin = !!min && !max;
  const onlyHasMax = !!max && !min;

  if (hasMinAndMax) return value >= min && value <= max;
  if (onlyHasMin) return value >= min;
  if (onlyHasMax) return value <= max;
  return false;
};

export const mapUser = (user: admin.auth.UserRecord) => {
  const customClaims = (user.customClaims || { role: '' }) as { role?: string };
  const role = customClaims.role ? customClaims.role : '';

  return {
    uid: user.uid,
    email: user.email || '',
    displayName: user.displayName || '',
    role,
    lastSignInTime: user.metadata.lastSignInTime,
    creationTime: user.metadata.creationTime,
  };
};
