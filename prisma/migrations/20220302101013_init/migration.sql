/*
  Warnings:

  - Added the required column `target_id` to the `Result` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `result` ADD COLUMN `target_id` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Target` (
    `target_id` VARCHAR(191) NOT NULL,
    `target_name` VARCHAR(45) NOT NULL,
    `target_distance1` VARCHAR(45) NOT NULL,
    `target_distance2` VARCHAR(45) NOT NULL,
    `target_distance3` VARCHAR(45) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`target_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Result` ADD CONSTRAINT `Result_target_id_fkey` FOREIGN KEY (`target_id`) REFERENCES `Target`(`target_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
