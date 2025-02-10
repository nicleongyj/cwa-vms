/*
  Warnings:

  - You are about to drop the column `interest` on the `Volunteer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Volunteer" DROP COLUMN "interest",
ADD COLUMN     "interest_id" TEXT;

-- DropEnum
DROP TYPE "VolunteerInterest";

-- CreateTable
CREATE TABLE "VolunteerInterest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "VolunteerInterest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VolunteerInterest_name_key" ON "VolunteerInterest"("name");

-- AddForeignKey
ALTER TABLE "Volunteer" ADD CONSTRAINT "Volunteer_interest_id_fkey" FOREIGN KEY ("interest_id") REFERENCES "VolunteerInterest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
