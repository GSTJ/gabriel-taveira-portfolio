import type { NextApiRequest, NextApiResponse } from "next";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  // Only run if the key is correct
  if (request.query.key !== "plsRefetchYoutubeData") {
    response.status(404).end();
    return;
  }

  // Only run on Wednesdays
  if (new Date().getDay() !== 3) {
    response.status(404).end();
    return;
  }

  await fetch(process.env.DEPLOY_URL);

  response.status(200).json({ success: true });
};
