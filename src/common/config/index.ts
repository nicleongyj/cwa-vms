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
};
