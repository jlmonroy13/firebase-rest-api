import express from 'express';

interface CatchErrorProps {
  error: express.ErrorRequestHandler;
  res: express.Response;
}

export const catchError = ({ error, res }: CatchErrorProps) => {
  console.log(error);
  return res.status(500).send(error);
};

export const getDocData = (doc: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>) => doc.data();

export const evaluateMaxAndMinQuery = (min: string, max: string, value: string) => {
  const hasMinAndMax = !!min && !!max;
  const onlyHasMin = !!min && !max;
  const onlyHasMax = !!max && !min;

  if (hasMinAndMax) return value >= min && value <= max;
  if (onlyHasMin) return value >= min;
  if (onlyHasMax) return value <= max;
  return false;
};
