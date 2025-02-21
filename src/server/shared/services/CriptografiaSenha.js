import { compare, genSalt, hash } from "bcryptjs";

// Complexidade da senha
const PASSWORD_SALT = 8;

const gerandoSenha = async (password) => {
  // Gera um caracter aleatório
  const saltGenerated = await genSalt(PASSWORD_SALT);

  // Criptografa a senha com o caracter gerado
  return await hash(password, saltGenerated);
};

const verificandoSenha = async (password, hashedPassword) => {
  // Compara a senha fornecida com a senha criptografada
  return await compare(password, hashedPassword);
};

export const CriptografiaSenha = {
  gerandoSenha,
  verificandoSenha,
};
