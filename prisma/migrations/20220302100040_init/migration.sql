/*
  Warnings:

  - You are about to alter the column `user_name` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(16)`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `user_name` VARCHAR(16) NOT NULL,
    MODIFY `user_email` VARCHAR(255) NOT NULL;
