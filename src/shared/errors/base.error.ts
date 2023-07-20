export abstract class BaseError extends Error {
  abstract httpCode: number;
}
