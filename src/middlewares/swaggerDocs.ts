import createHttpError from "http-errors";
import swaggerUI from "swagger-ui-express";
import fs from "node:fs";
import { RequestHandler } from "express";
import { SWAGGER_PATH } from "../constants/constants";

export const swaggerDocs = (): RequestHandler[] => {
  try {
    const file = fs.readFileSync(SWAGGER_PATH, "utf-8");
    const docs = JSON.parse(file);

    return [...swaggerUI.serve, swaggerUI.setup(docs)];
  } catch (error) {
    return [
      (req, res, next) => {
        throw createHttpError(500, "Unable to load Swagger documentation");
      }
    ];
  }
};