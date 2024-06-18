-- DropIndex
DROP INDEX "GroupChat_name_key";

-- AlterTable
ALTER TABLE "GroupChat" ADD COLUMN     "pictureUrl" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "profileUrl" TEXT;
