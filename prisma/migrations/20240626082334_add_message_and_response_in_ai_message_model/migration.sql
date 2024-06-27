/*
  Warnings:

  - You are about to drop the column `response` on the `AIConversation` table. All the data in the column will be lost.
  - Added the required column `message` to the `AIMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AIConversation" DROP COLUMN "response";

-- AlterTable
ALTER TABLE "AIMessage" ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "response" TEXT;
