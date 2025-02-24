/*
  Warnings:

  - You are about to drop the column `availability` on the `Volunteer` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "VolunteerStatus" AS ENUM ('PENDING', 'AVAILABLE', 'ASSIGNED', 'REJECTED');

-- AlterTable
ALTER TABLE "Volunteer" DROP COLUMN "availability",
ADD COLUMN     "status" "VolunteerStatus" NOT NULL DEFAULT 'PENDING';
