import jwt from "jsonwebtoken";

// Ele gera o token
const sign = (data) => {
  if (!process.env.JWT_SECRET) return "JWT_SECRET_NOT_FOUND";
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "8h" });
};

const verify = (token) => {
  if (!process.env.JWT_SECRET) return "JWT_SECRET_NOT_FOUND";

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof decoded === "string") {
      return "INVALID_TOKEN";
    }
    return decoded;
  } catch (error) {
    return "INVALID_TOKEN";
  }
};

export const JWTService = {
  sign,
  verify,
};
