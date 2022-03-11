-- CreateTable
CREATE TABLE `Parcour` (
    `parcour_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`parcour_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ParcourHasTarget` (
    `parcour_id` VARCHAR(191) NOT NULL,
    `target_id` VARCHAR(191) NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`parcour_id`, `target_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ParcourHasTarget` ADD CONSTRAINT `ParcourHasTarget_target_id_fkey` FOREIGN KEY (`target_id`) REFERENCES `Target`(`target_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ParcourHasTarget` ADD CONSTRAINT `ParcourHasTarget_parcour_id_fkey` FOREIGN KEY (`parcour_id`) REFERENCES `Parcour`(`parcour_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
