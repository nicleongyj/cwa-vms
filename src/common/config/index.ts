
export const config = {
  database: {
    url: process.env.DATABASE_URL,
  },
  port: process.env.PORT,
  supabase: {
    url: process.env.SUPABASE_URL,
    jwtSecret: process.env.SUPABASE_JWT_SECRET,
    key: process.env.SUPABASE_KEY,
  },
  msalConfig: {
    auth: {
      clientId: process.env.AZURE_CLIENT_ID, // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
      authority: process.env.AZURE_CLOUD_INSTANCE! + process.env.AZURE_TENANT_ID!, // Full directory URL, in the form of https://login.microsoftonline.com/<tenant>
      clientSecret: process.env.AZURE_CLIENT_SECRET // Client secret generated from the app registration in Azure portal
    },
  }
};
