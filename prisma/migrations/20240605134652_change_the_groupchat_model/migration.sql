/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `GroupChat` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GroupChat_name_key" ON "GroupChat"("name");
