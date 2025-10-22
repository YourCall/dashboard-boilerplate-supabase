import fs from "fs";

const args = process.argv.slice(2);
const params: Record<string, string> = {};
for (let i = 0; i < args.length; i += 2) {
  const key = args[i].replace(/^--/, "");
  params[key] = args[i + 1];
}

const TOKEN = params.token;
const ORG_ID = params.org;
const PROJECT_NAME = params.name;
const DB_PASSWORD = params.password;

if (!TOKEN || !ORG_ID) {
  console.error(
    "❌ Erreur : Veuillez spécifier --token et --org (ou les définir dans .env)"
  );
  process.exit(1);
}

async function main() {
  console.log("🚀 Création du projet Supabase...");

  const res = await fetch("https://api.supabase.com/v1/projects", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      organization_id: ORG_ID,
      name: PROJECT_NAME,
      db_pass: DB_PASSWORD,
      plan: "free",
      region: "eu-central-1",
    }),
  });

  const project = await res.json();
  console.log("✅ Projet créé :", project);

  const projectId = project.id;

  console.log("⏳ Attente de la génération des clés API...");
  await new Promise((resolve) => setTimeout(resolve, 10000));

  const keysRes = await fetch(
    `https://api.supabase.com/v1/projects/${projectId}/api-keys`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!keysRes.ok) {
    throw new Error(
      `Erreur lors de la récupération des clés: ${keysRes.statusText}`
    );
  }

  const keysData = await keysRes.json();

  const anonKey = keysData.find((k: any) => k.name === "anon")?.api_key;
  const serviceKey = keysData.find(
    (k: any) => k.name === "service_role"
  )?.api_key;
  const url = `https://${projectId}.supabase.co`;

  if (!anonKey || !serviceKey) {
    throw new Error(
      "❌ Impossible de récupérer les clés API (anon ou service_role)."
    );
  }

  const envContent = `
  NEXT_PUBLIC_SUPABASE_URL="${url}"
  NEXT_PUBLIC_SUPABASE_ANON_KEY="${anonKey}"
  SUPABASE_SERVICE_ROLE_KEY="${serviceKey}"
    `;

  fs.writeFileSync(".env", envContent.trim() + "\n");
  console.log("📝 Fichier .env mis à jour !");
}

main().catch((err) => {
  console.error("❌ Erreur :", err.message);
});
