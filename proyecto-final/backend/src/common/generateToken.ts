import crypto from "crypto";

export default function getToken(length: number): string {
  if (!Number.isInteger(length) || length <= 0) {
    throw new Error("Token length must be a positive integer");
  }

  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}
