/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Content` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "url" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Content_url_key" ON "Content"("url");
