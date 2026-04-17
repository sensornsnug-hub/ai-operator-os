const requiredServer = [
  "NEXT_PUBLIC_APP_URL",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY"
] as const;

export function getEnv(name: string) {
  return process.env[name];
}

export function hasEnv(name: string) {
  return Boolean(process.env[name] && process.env[name]?.trim());
}

export function assertServerEnv() {
  const missing = requiredServer.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(`Missing environment variables: ${missing.join(", ")}`);
  }
}

export function integrationHealth() {
  const checks = {
    supabase:
      hasEnv("NEXT_PUBLIC_SUPABASE_URL") &&
      hasEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY") &&
      hasEnv("SUPABASE_SERVICE_ROLE_KEY"),
    whatsapp:
      hasEnv("WHATSAPP_PHONE_NUMBER_ID") &&
      hasEnv("WHATSAPP_ACCESS_TOKEN") &&
      hasEnv("WHATSAPP_VERIFY_TOKEN"),
    meta:
      hasEnv("META_APP_ID") &&
      hasEnv("META_APP_SECRET") &&
      hasEnv("META_WEBHOOK_VERIFY_TOKEN"),
    stripe:
      hasEnv("STRIPE_SECRET_KEY") &&
      hasEnv("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY") &&
      hasEnv("STRIPE_WEBHOOK_SECRET"),
    openai: hasEnv("OPENAI_API_KEY")
  };

  return checks;
}
