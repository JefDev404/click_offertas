import bcrypt from "bcrypt";

async function gerarHash() {
  const senha = "Ht5hu8hbhn";
  const hash = await bcrypt.hash(senha, 10);
  console.log("Hash gerado:", hash);
}

gerarHash();
