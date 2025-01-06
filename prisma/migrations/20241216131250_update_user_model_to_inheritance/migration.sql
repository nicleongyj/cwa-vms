/*
  Warnings:

  - The primary key for the `Donor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `entity` on the `Donor` table. All the data in the column will be lost.
  - The primary key for the `Project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Staff` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `permissions` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `role_name` on the `Staff` table. All the data in the column will be lost.
  - The primary key for the `Volunteer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `skillsets` on the `Volunteer` table. All the data in the column will be lost.
  - You are about to drop the `Assignments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[donor_id]` on the table `Donation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[project_id]` on the table `Donation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[end_user_id]` on the table `Donor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[general_user_id]` on the table `Staff` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[end_user_id]` on the table `Volunteer` will be added. If there are existing duplicate values, this will fail.
  - Made the column `project_id` on table `Donation` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `end_user_id` to the `Donor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `general_user_id` to the `Staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_user_id` to the `Volunteer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Assignments" DROP CONSTRAINT "Assignments_project_id_fkey";

-- DropForeignKey
ALTER TABLE "Assignments" DROP CONSTRAINT "Assignments_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Assignments" DROP CONSTRAINT "Assignments_volunteer_id_fkey";

-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_donor_id_fkey";

-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_project_id_fkey";

-- DropForeignKey
ALTER TABLE "Donor" DROP CONSTRAINT "Donor_donor_id_fkey";

-- DropForeignKey
ALTER TABLE "Volunteer" DROP CONSTRAINT "Volunteer_volunteer_id_fkey";

-- AlterTable
ALTER TABLE "Donation" ADD COLUMN     "tax_deduction" BOOLEAN,
ALTER COLUMN "donor_id" SET DATA TYPE TEXT,
ALTER COLUMN "project_id" SET NOT NULL,
ALTER COLUMN "project_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Donor" DROP CONSTRAINT "Donor_pkey",
DROP COLUMN "entity",
ADD COLUMN     "end_user_id" TEXT NOT NULL,
ALTER COLUMN "donor_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Donor_pkey" PRIMARY KEY ("donor_id");

-- AlterTable
ALTER TABLE "Project" DROP CONSTRAINT "Project_pkey",
ALTER COLUMN "project_id" DROP DEFAULT,
ALTER COLUMN "project_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Project_pkey" PRIMARY KEY ("project_id");
DROP SEQUENCE "Project_project_id_seq";

-- AlterTable
ALTER TABLE "Staff" DROP CONSTRAINT "Staff_pkey",
DROP COLUMN "permissions",
DROP COLUMN "role_name",
ADD COLUMN     "general_user_id" TEXT NOT NULL,
ALTER COLUMN "staff_id" DROP DEFAULT,
ALTER COLUMN "staff_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Staff_pkey" PRIMARY KEY ("staff_id");
DROP SEQUENCE "Staff_staff_id_seq";

-- AlterTable
ALTER TABLE "Volunteer" DROP CONSTRAINT "Volunteer_pkey",
DROP COLUMN "skillsets",
ADD COLUMN     "end_user_id" TEXT NOT NULL,
ADD COLUMN     "expertise" TEXT,
ADD COLUMN     "volunteering_hours" INTEGER,
ALTER COLUMN "volunteer_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Volunteer_pkey" PRIMARY KEY ("volunteer_id");

-- DropTable
DROP TABLE "Assignments";

-- DropTable
DROP TABLE "Users";

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "GeneralUser" (
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GeneralUser_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "EndUser" (
    "end_user_id" TEXT NOT NULL,
    "general_user_id" TEXT NOT NULL,
    "contact_number" TEXT,
    "address" TEXT,
    "nationality" TEXT,
    "ethnicity" TEXT,
    "gender" TEXT,
    "dob" TIMESTAMP(3),
    "occupation" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EndUser_pkey" PRIMARY KEY ("end_user_id")
);

-- CreateTable
CREATE TABLE "Assignment" (
    "assignment_id" SERIAL NOT NULL,
    "volunteer_id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "status" "AssignmentStatus" NOT NULL DEFAULT 'REJECT',
    "volunteer_role" TEXT NOT NULL,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("assignment_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GeneralUser_email_key" ON "GeneralUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "EndUser_general_user_id_key" ON "EndUser"("general_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Assignment_volunteer_id_key" ON "Assignment"("volunteer_id");

-- CreateIndex
CREATE UNIQUE INDEX "Donation_donor_id_key" ON "Donation"("donor_id");

-- CreateIndex
CREATE UNIQUE INDEX "Donation_project_id_key" ON "Donation"("project_id");

-- CreateIndex
CREATE UNIQUE INDEX "Donor_end_user_id_key" ON "Donor"("end_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_general_user_id_key" ON "Staff"("general_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Volunteer_end_user_id_key" ON "Volunteer"("end_user_id");

-- AddForeignKey
ALTER TABLE "EndUser" ADD CONSTRAINT "EndUser_general_user_id_fkey" FOREIGN KEY ("general_user_id") REFERENCES "GeneralUser"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_general_user_id_fkey" FOREIGN KEY ("general_user_id") REFERENCES "GeneralUser"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Volunteer" ADD CONSTRAINT "Volunteer_end_user_id_fkey" FOREIGN KEY ("end_user_id") REFERENCES "EndUser"("end_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donor" ADD CONSTRAINT "Donor_end_user_id_fkey" FOREIGN KEY ("end_user_id") REFERENCES "EndUser"("end_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_donor_id_fkey" FOREIGN KEY ("donor_id") REFERENCES "Donor"("donor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("project_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_volunteer_id_fkey" FOREIGN KEY ("volunteer_id") REFERENCES "Volunteer"("volunteer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("project_id") ON DELETE RESTRICT ON UPDATE CASCADE;
