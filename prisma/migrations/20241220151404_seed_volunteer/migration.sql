-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('STAFF', 'VOLUNTEER', 'DONOR');

-- CreateEnum
CREATE TYPE "VolunteerDuration" AS ENUM ('AD_HOC', 'LONG_TERM', 'SHORT_TERM');

-- CreateEnum
CREATE TYPE "VolunteerInterest" AS ENUM ('BEFRIENDER', 'EVENT_SUPPORT', 'FUNDRAISER');

-- CreateEnum
CREATE TYPE "DonationFrequency" AS ENUM ('ONE_TIME', 'MONTHLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('VISA', 'MASTERCARD', 'CHEQUE', 'CASH');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('ACTIVE', 'COMPLETED');

-- CreateEnum
CREATE TYPE "AssignmentStatus" AS ENUM ('ACCEPT', 'REJECT', 'RECONSIDER');

-- CreateTable
CREATE TABLE "Users" (
    "user_id" SERIAL NOT NULL,
    "nric" TEXT NOT NULL,
    "email" TEXT,
    "password_hash" TEXT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "contact_number" TEXT,
    "address" TEXT,
    "nationality" TEXT,
    "ethnicity" TEXT,
    "dob" TIMESTAMP(3),
    "gender" TEXT,
    "occupation" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Volunteer" (
    "volunteer_id" INTEGER NOT NULL,
    "languages_spoken" TEXT,
    "education" TEXT,
    "duration" "VolunteerDuration" NOT NULL,
    "availability" TEXT,
    "interest" "VolunteerInterest" NOT NULL,
    "skillsets" TEXT,
    "past_experience" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Volunteer_pkey" PRIMARY KEY ("volunteer_id")
);

-- CreateTable
CREATE TABLE "Donor" (
    "donor_id" INTEGER NOT NULL,
    "entity" TEXT,
    "frequency" "DonationFrequency" NOT NULL,

    CONSTRAINT "Donor_pkey" PRIMARY KEY ("donor_id")
);

-- CreateTable
CREATE TABLE "Project" (
    "project_id" SERIAL NOT NULL,
    "project_name" TEXT NOT NULL,
    "description" TEXT,
    "skills_required" TEXT,
    "commitment_duration" TEXT,
    "status" "ProjectStatus" NOT NULL DEFAULT 'ACTIVE',
    "assigned_volunteers" JSONB,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("project_id")
);

-- CreateTable
CREATE TABLE "Donation" (
    "donation_id" SERIAL NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "payment_method" "PaymentMethod",
    "donation_date" TIMESTAMP(3),
    "donor_id" INTEGER NOT NULL,
    "project_id" INTEGER,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("donation_id")
);

-- CreateTable
CREATE TABLE "Assignments" (
    "assignment_id" SERIAL NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "status" "AssignmentStatus" NOT NULL DEFAULT 'REJECT',
    "volunteer_role" TEXT NOT NULL,
    "volunteer_id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Assignments_pkey" PRIMARY KEY ("assignment_id")
);

-- CreateTable
CREATE TABLE "Staff" (
    "staff_id" SERIAL NOT NULL,
    "role_name" TEXT NOT NULL,
    "permissions" JSONB NOT NULL,
    "super_admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("staff_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_nric_key" ON "Users"("nric");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Volunteer" ADD CONSTRAINT "Volunteer_volunteer_id_fkey" FOREIGN KEY ("volunteer_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donor" ADD CONSTRAINT "Donor_donor_id_fkey" FOREIGN KEY ("donor_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_donor_id_fkey" FOREIGN KEY ("donor_id") REFERENCES "Donor"("donor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("project_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignments" ADD CONSTRAINT "Assignments_volunteer_id_fkey" FOREIGN KEY ("volunteer_id") REFERENCES "Volunteer"("volunteer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignments" ADD CONSTRAINT "Assignments_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("project_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignments" ADD CONSTRAINT "Assignments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
