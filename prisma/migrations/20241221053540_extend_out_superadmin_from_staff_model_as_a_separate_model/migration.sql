/*
  Warnings:

  - You are about to drop the column `super_admin` on the `Staff` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "super_admin";

-- CreateTable
CREATE TABLE "Superadmin" (
    "superadmin_id" TEXT NOT NULL,
    "staff_id" TEXT NOT NULL,

    CONSTRAINT "Superadmin_pkey" PRIMARY KEY ("superadmin_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Superadmin_staff_id_key" ON "Superadmin"("staff_id");

-- AddForeignKey
ALTER TABLE "Superadmin" ADD CONSTRAINT "Superadmin_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "Staff"("staff_id") ON DELETE RESTRICT ON UPDATE CASCADE;
