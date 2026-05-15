-- CreateEnum
CREATE TYPE "IocType" AS ENUM ('IP', 'DOMAIN', 'URL', 'HASH', 'EMAIL');

-- CreateEnum
CREATE TYPE "Severity" AS ENUM ('MALICIOUS', 'SUSPICIOUS', 'CLEAN', 'UNKNOWN');

-- CreateTable
CREATE TABLE "iocs" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" "IocType" NOT NULL,
    "severity" "Severity" NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "iocs_pkey" PRIMARY KEY ("id")
);
