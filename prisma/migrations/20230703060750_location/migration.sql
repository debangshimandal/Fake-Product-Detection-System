-- CreateEnum
CREATE TYPE "UserPermissionEnum" AS ENUM ('member', 'Viewer', 'Admin');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "orgID" TEXT,
ADD COLUMN     "permissions" "UserPermissionEnum"[];

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "shipping_details" TEXT NOT NULL,
    "delivery_details" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_orgID_fkey" FOREIGN KEY ("orgID") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
