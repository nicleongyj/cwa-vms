SELECT 'CREATE DATABASE cwa'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'cwa')\gexec

SELECT 'CREATE DATABASE cwa_test'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'cwa_test')\gexec
