import { NextApiRequest, NextApiResponse } from "next";
import calls from "@/data/calls.json";

// Mock data for demonstration purposes

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== "string") {
    res.status(400).json({ error: "Invalid ID format" });
    return;
  }

  const subCalls = calls.filter((call) => call.magazineId?.$oid === id);

  res.status(200).json(subCalls);
}
