/*
  Warnings:

  - The primary key for the `Assignment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Donation` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_pkey",
ALTER COLUMN "assignment_id" DROP DEFAULT,
ALTER COLUMN "assignment_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Assignment_pkey" PRIMARY KEY ("assignment_id");
DROP SEQUENCE "Assignment_assignment_id_seq";

-- AlterTable
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_pkey",
ALTER COLUMN "donation_id" DROP DEFAULT,
ALTER COLUMN "donation_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Donation_pkey" PRIMARY KEY ("donation_id");
DROP SEQUENCE "Donation_donation_id_seq";
