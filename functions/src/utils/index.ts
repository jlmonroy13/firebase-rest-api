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
