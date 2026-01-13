/*
  Warnings:

  - You are about to drop the column `isMobileVerified` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `mobileNumber` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_mobileNumber_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "isMobileVerified",
DROP COLUMN "mobileNumber";
