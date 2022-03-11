/*
  Warnings:

  - The primary key for the `event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `event_id` on the `event` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `parcour` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `parcour_id` on the `parcour` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `result` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `result_id` on the `result` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `event_id` on the `result` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `user_id` on the `result` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `target_id` on the `result` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `target` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `target_id` on the `target` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `target_distance1` on the `target` table. The data in that column could be lost. The data in that column will be cast from `VarChar(45)` to `Int`.
  - You are about to alter the column `target_distance2` on the `target` table. The data in that column could be lost. The data in that column will be cast from `VarChar(45)` to `Int`.
  - You are about to alter the column `target_distance3` on the `target` table. The data in that column could be lost. The data in that column will be cast from `VarChar(45)` to `Int`.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `user_id` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `parcourhastarget` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `parcourhastarget` DROP FOREIGN KEY `ParcourHasTarget_parcour_id_fkey`;

-- DropForeignKey
ALTER TABLE `parcourhastarget` DROP FOREIGN KEY `ParcourHasTarget_target_id_fkey`;

-- DropForeignKey
ALTER TABLE `result` DROP FOREIGN KEY `Result_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `result` DROP FOREIGN KEY `Result_target_id_fkey`;

-- DropForeignKey
ALTER TABLE `result` DROP FOREIGN KEY `Result_user_id_fkey`;

-- DropIndex
DROP INDEX `User_user_email_key` ON `user`;

-- AlterTable
ALTER TABLE `event` DROP PRIMARY KEY,
    MODIFY `event_id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `event_name` VARCHAR(45) NULL,
    ADD PRIMARY KEY (`event_id`);

-- AlterTable
ALTER TABLE `parcour` DROP PRIMARY KEY,
    ADD COLUMN `parcour_name` VARCHAR(45) NULL,
    MODIFY `parcour_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`parcour_id`);

-- AlterTable
ALTER TABLE `result` DROP PRIMARY KEY,
    MODIFY `result_id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `event_id` INTEGER NOT NULL,
    MODIFY `user_id` INTEGER NOT NULL,
    MODIFY `target_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`result_id`);

-- AlterTable
ALTER TABLE `target` DROP PRIMARY KEY,
    MODIFY `target_id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `target_name` VARCHAR(45) NULL,
    MODIFY `target_distance1` INTEGER NULL,
    MODIFY `target_distance2` INTEGER NULL,
    MODIFY `target_distance3` INTEGER NULL,
    ADD PRIMARY KEY (`target_id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    ADD COLUMN `user_createtime` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `user_email` VARCHAR(255) NULL,
    ADD PRIMARY KEY (`user_id`);

-- DropTable
DROP TABLE `parcourhastarget`;

-- CreateTable
CREATE TABLE `parcour_target` (
    `parcour_id` INTEGER NOT NULL,
    `target_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `fk_parcour_has_target_parcour1_idx`(`parcour_id`),
    INDEX `fk_parcour_has_target_target1_idx`(`target_id`),
    PRIMARY KEY (`parcour_id`, `target_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `parcour_target` ADD CONSTRAINT `fk_parcour_has_target_parcour1` FOREIGN KEY (`parcour_id`) REFERENCES `parcour`(`parcour_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `parcour_target` ADD CONSTRAINT `fk_parcour_has_target_target1` FOREIGN KEY (`target_id`) REFERENCES `target`(`target_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `result` ADD CONSTRAINT `fk_result_event` FOREIGN KEY (`event_id`) REFERENCES `event`(`event_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `result` ADD CONSTRAINT `fk_result_target1` FOREIGN KEY (`target_id`) REFERENCES `target`(`target_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `result` ADD CONSTRAINT `fk_result_user1` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- RenameIndex
ALTER TABLE `result` RENAME INDEX `Result_event_id_fkey` TO `fk_result_event_idx`;

-- RenameIndex
ALTER TABLE `result` RENAME INDEX `Result_target_id_fkey` TO `fk_result_target1_idx`;

-- RenameIndex
ALTER TABLE `result` RENAME INDEX `Result_user_id_fkey` TO `fk_result_user1_idx`;
