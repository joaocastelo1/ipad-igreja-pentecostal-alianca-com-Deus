import { randomBytes, scryptSync } from "node:crypto";

const password = process.argv[2];

if (!password) {
  console.error(
    'Uso: npm run admin:hash -- "sua-senha-forte"\n' +
      "A senha deve ser informada entre aspas.",
  );
  process.exit(1);
}

if (password.length < 10) {
  console.error("Use uma senha com pelo menos 10 caracteres.");
  process.exit(1);
}

const N = 16384;
const r = 8;
const p = 1;
const keyLength = 64;
const salt = randomBytes(16);

const hash = scryptSync(password, salt, keyLength, {
  N,
  r,
  p,
  maxmem: 256 * N * r,
});

const encoded = [
  "scrypt",
  String(N),
  String(r),
  String(p),
  salt.toString("base64url"),
  hash.toString("base64url"),
].join("$");

console.log("");
console.log("Adicione ao seu .env.local (ou às variáveis da Vercel):");
console.log("");
console.log(`ADMIN_PASSWORD_HASH=${encoded}`);
console.log("");
console.log(
  "Nunca versione esse valor. Gere um hash diferente para cada ambiente.",
);
