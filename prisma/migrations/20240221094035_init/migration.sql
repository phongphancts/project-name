/*
  Warnings:

  - Added the required column `action_id` to the `RolePermission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rolepermission` ADD COLUMN `action_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Action` (
    `action_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name_action` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`action_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RolePermission` ADD CONSTRAINT `RolePermission_action_id_fkey` FOREIGN KEY (`action_id`) REFERENCES `Action`(`action_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
