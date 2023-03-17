/*
  Warnings:

  - You are about to drop the column `bottels` on the `User` table. All the data in the column will be lost.
  - Added the required column `bottles` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "bottels",
ADD COLUMN     "bottles" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_AuthorBy_id_fkey" FOREIGN KEY ("AuthorBy_id") REFERENCES "Employee"("Employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;
