/*
  Warnings:

  - You are about to drop the column `loction` on the `Location` table. All the data in the column will be lost.
  - Added the required column `city` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryName` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Location" DROP COLUMN "loction",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "countryName" TEXT NOT NULL,
ADD COLUMN     "region" TEXT NOT NULL;
