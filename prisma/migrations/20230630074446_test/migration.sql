-- CreateEnum
CREATE TYPE "CredentialTypeEnum" AS ENUM ('User');

-- CreateTable
CREATE TABLE "Credential" (
    "id" TEXT NOT NULL,
    "type" "CredentialTypeEnum" NOT NULL,
    "algo" TEXT NOT NULL,
    "digest" TEXT NOT NULL,
    "encrypted" TEXT NOT NULL,

    CONSTRAINT "Credential_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "material" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "highlights" TEXT NOT NULL,
    "ratings" TEXT NOT NULL,
    "QRCode" JSONB NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "password" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
