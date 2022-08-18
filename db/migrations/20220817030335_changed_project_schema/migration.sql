/*
  Warnings:

  - You are about to drop the column `githubLink` on the `Project` table. All the data in the column will be lost.
  - Added the required column `link1` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link2` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "githubLink",
ADD COLUMN     "link1" TEXT NOT NULL,
ADD COLUMN     "link2" TEXT NOT NULL;
