import { mkdir, access } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const source = path.join(root, "assets", "source");
const logoSource = path.join(source, "logo1.png");
const churchSource = path.join(source, "igreja.jpeg");

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  for (const dir of [
    "public/images/logo",
    "public/images/igreja",
    "public/images/og",
    "src/app",
  ]) {
    await mkdir(path.join(root, dir), { recursive: true });
  }

  if (!(await exists(logoSource)) || !(await exists(churchSource))) {
    throw new Error(
      "Coloque logo1.png e igreja.jpeg em assets/source antes de rodar este script.",
    );
  }

  const logoMeta = await sharp(logoSource).metadata();
  const logoSize = Math.min(logoMeta.width ?? 500, logoMeta.height ?? 500);
  const circleMask = Buffer.from(
    `<svg width="${logoSize}" height="${logoSize}"><circle cx="${logoSize / 2}" cy="${logoSize / 2}" r="${logoSize / 2 - 2}" fill="#fff"/></svg>`,
  );

  const logoTransparent = await sharp(logoSource)
    .resize(1024, 1024, { fit: "cover" })
    .composite([{ input: circleMask, blend: "dest-in" }])
    .png()
    .toBuffer();

  await sharp(logoTransparent)
    .resize(512, 512)
    .webp({ quality: 92 })
    .toFile(path.join(root, "public", "images", "logo", "ipad-logo.webp"));

  await sharp(logoTransparent)
    .resize(512, 512)
    .png({ compressionLevel: 9 })
    .toFile(path.join(root, "public", "images", "logo", "ipad-logo.png"));

  await sharp(logoTransparent)
    .resize(1024, 1024)
    .webp({ quality: 90 })
    .toFile(path.join(root, "public", "images", "logo", "ipad-logo-lg.webp"));

  await sharp(logoTransparent)
    .resize(512, 512)
    .png({ compressionLevel: 9 })
    .toFile(path.join(root, "src", "app", "icon.png"));

  await sharp(logoTransparent)
    .resize(180, 180)
    .png({ compressionLevel: 9 })
    .toFile(path.join(root, "src", "app", "apple-icon.png"));

  const churchMeta = await sharp(churchSource).metadata();
  const churchWidth = churchMeta.width ?? 540;
  const churchHeight = churchMeta.height ?? 448;

  const churchBase = () =>
    sharp(churchSource).resize(1080, null, {
      kernel: "lanczos3",
      withoutEnlargement: false,
    });

  await churchBase()
    .sharpen({ sigma: 0.6 })
    .webp({ quality: 82, effort: 6 })
    .toFile(path.join(root, "public", "images", "igreja", "igreja.webp"));

  await sharp(churchSource)
    .extract({
      left: 0,
      top: 0,
      width: churchWidth,
      height: Math.round(churchHeight * 0.46),
    })
    .resize(1080, null, { kernel: "lanczos3" })
    .sharpen({ sigma: 0.7 })
    .webp({ quality: 84, effort: 6 })
    .toFile(
      path.join(root, "public", "images", "igreja", "igreja-detalhe.webp"),
    );

  await sharp(churchSource)
    .extract({
      left: 0,
      top: Math.round(churchHeight * 0.36),
      width: churchWidth,
      height: churchHeight - Math.round(churchHeight * 0.36),
    })
    .resize(1080, null, { kernel: "lanczos3" })
    .sharpen({ sigma: 0.6 })
    .webp({ quality: 84, effort: 6 })
    .toFile(
      path.join(root, "public", "images", "igreja", "igreja-familia.webp"),
    );

  const ogSvg = `
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="glow" cx="78%" cy="28%" r="70%">
        <stop offset="0%" stop-color="#1b2c4d" stop-opacity="0.95"/>
        <stop offset="60%" stop-color="#07101f" stop-opacity="1"/>
        <stop offset="100%" stop-color="#03070f" stop-opacity="1"/>
      </radialGradient>
      <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#f6e4b0"/>
        <stop offset="50%" stop-color="#d4ad63"/>
        <stop offset="100%" stop-color="#9b7436"/>
      </linearGradient>
      <linearGradient id="fire" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stop-color="#e2571e" stop-opacity="0"/>
        <stop offset="100%" stop-color="#e2571e" stop-opacity="0.55"/>
      </linearGradient>
      <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
        <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#c9a45c" stroke-opacity="0.055" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="1200" height="630" fill="#03070f"/>
    <rect width="1200" height="630" fill="url(#glow)"/>
    <rect width="1200" height="630" fill="url(#grid)"/>
    <circle cx="1260" cy="560" r="380" fill="url(#fire)"/>
    <rect x="42" y="42" width="1116" height="546" rx="22" fill="none" stroke="url(#gold)" stroke-opacity="0.45"/>
    <text x="96" y="150" fill="#d4ad63" font-family="Arial, sans-serif" font-size="19" letter-spacing="7">IGREJA PENTECOSTAL</text>
    <text x="92" y="258" fill="#f7f2e7" font-family="Georgia, serif" font-size="76" font-weight="700">Aliança com Deus</text>
    <text x="96" y="315" fill="#ece3cf" font-family="Arial, sans-serif" font-size="28" letter-spacing="2">São Bernardo — Maranhão</text>
    <line x1="96" y1="370" x2="520" y2="370" stroke="url(#gold)" stroke-width="1.5" stroke-opacity="0.7"/>
    <text x="96" y="430" fill="#c9bfa8" font-family="Georgia, serif" font-style="italic" font-size="28">“Uma igreja alinhada com Deus.”</text>
    <text x="96" y="500" fill="#d4ad63" font-family="Arial, sans-serif" font-size="18" letter-spacing="4">ORANDO · ADORANDO · EVANGELIZANDO</text>
    <text x="96" y="548" fill="#8d846f" font-family="Arial, sans-serif" font-size="17">IPAD — Igreja Pentecostal Aliança com Deus</text>
  </svg>`;

  const ogBase = sharp(Buffer.from(ogSvg));
  const logoOg = await sharp(logoTransparent).resize(220, 220).png().toBuffer();

  await ogBase
    .composite([{ input: logoOg, left: 912, top: 142 }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(root, "src", "app", "opengraph-image.png"));

  await ogBase
    .composite([{ input: logoOg, left: 912, top: 142 }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(root, "public", "images", "og", "og-image.png"));

  await ogBase
    .composite([{ input: logoOg, left: 912, top: 142 }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(root, "src", "app", "twitter-image.png"));

  console.log("Imagens preparadas com sucesso:", {
    logo: "512/1024",
    igreja: `${churchWidth}x${churchHeight} -> 1080`,
    og: "1200x630",
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
