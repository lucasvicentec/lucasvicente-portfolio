// Convierte las capturas de public/images a WebP y borra los PNG originales.
// Mantiene las dimensiones (el modal muestra la imagen a tamaño completo);
// el ahorro viene solo del formato.
// Uso desde la raíz del repo:  node scripts/optimize-images.mjs
import sharp from "sharp";
import { readdir, stat, unlink } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join, extname, basename } from "node:path";

const DIR = resolve(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");
const QUALITY = 85;

const size = async (p) => (await stat(p)).size;
const kb = (n) => (n / 1024).toFixed(0).padStart(6) + " KB";

const files = (await readdir(DIR)).filter((f) => extname(f).toLowerCase() === ".png");
if (files.length === 0) {
  console.log("No hay PNG que convertir (ya está todo en WebP).");
  process.exit(0);
}

let antes = 0;
let despues = 0;

for (const file of files) {
  const src = join(DIR, file);
  const out = join(DIR, basename(file, extname(file)) + ".webp");

  await sharp(src).webp({ quality: QUALITY, effort: 5 }).toFile(out);

  const [a, d] = [await size(src), await size(out)];
  if (d >= a) {
    // Si no mejora, nos quedamos con el PNG y descartamos el WebP.
    await unlink(out);
    console.log(`  =  ${file} (WebP no mejora, se mantiene el PNG)`);
    antes += a;
    despues += a;
    continue;
  }

  await unlink(src);
  antes += a;
  despues += d;
  console.log(`  ✓ ${file.padEnd(34)} ${kb(a)} → ${kb(d)}  (-${Math.round((1 - d / a) * 100)}%)`);
}

console.log(
  `\nTotal: ${kb(antes)} → ${kb(despues)}  (-${Math.round((1 - despues / antes) * 100)}%)`,
);
console.log("Recuerda que las rutas en src/App.tsx deben apuntar a .webp");
