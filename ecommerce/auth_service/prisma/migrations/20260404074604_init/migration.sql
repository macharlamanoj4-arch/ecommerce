/*
  Warnings:

  - You are about to drop the column `email` on the `Token` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Token` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Token_email_key";

-- AlterTable
ALTER TABLE "Token" DROP COLUMN "email",
ADD COLUMN     "blacklisted" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Token_userId_key" ON "Token"("userId");
