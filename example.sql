# CREATE DATABASE NEW_BASE

CREATE TABLE SystemUser (
  Id        serial,
  Login     varchar(64) NOT NULL,
  Password  varchar(64) NOT NULL,
  FullName  varchar(255)
);

ALTER TABLE SystemUser ADD CONSTRAINT pkSystemUser PRIMARY KEY (Id);
-- import {MigrationInterface, QueryRunner} from "typeorm";

-- export class Users1673267245912 implements MigrationInterface {
--     name = 'Users1673267245912'

--     public async up(queryRunner: QueryRunner): Promise<void> {
--         await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "full_name" character varying NOT NULL, 
--         "account" character varying NOT NULL, "password" character varying NOT NULL, "phone" integer NOT NULL, 
--         "email" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
--     }          //ALTER TABLE SystemUser ADD CONSTRAINT pkSystemUser PRIMARY KEY (Id);

--     public async down(queryRunner: QueryRunner): Promise<void> {
--         await queryRunner.query(`DROP TABLE "users"`);
--     }

-- }


CREATE UNIQUE INDEX akSystemUserLogin ON SystemUser (Login);

CREATE TABLE SystemGroup (
  Id    serial,
  Name  varchar(64) NOT NULL
);

ALTER TABLE SystemGroup ADD CONSTRAINT pkSystemGroup PRIMARY KEY (Id);

CREATE UNIQUE INDEX akSystemGroupName ON SystemGroup (Name);

CREATE TABLE GroupUser (
  GroupId  integer NOT NULL,
  UserId   integer NOT NULL
);

ALTER TABLE GroupUser ADD CONSTRAINT pkGroupUser PRIMARY KEY (GroupId, UserId);
ALTER TABLE GroupUser ADD CONSTRAINT fkGroupUserGroupId FOREIGN KEY (GroupId) REFERENCES SystemGroup (Id) ON DELETE CASCADE;
ALTER TABLE GroupUser ADD CONSTRAINT fkGroupUserUserId FOREIGN KEY (UserId) REFERENCES SystemUser (Id) ON DELETE CASCADE;

CREATE TABLE Session (
  Id      serial,
  UserId  integer NOT NULL,
  Token   varchar(64) NOT NULL,
  IP      varchar(45) NOT NULL,
  Data    text
);

ALTER TABLE Session ADD CONSTRAINT pkSession PRIMARY KEY (Id);

CREATE UNIQUE INDEX akSession ON Session (Token);

ALTER TABLE Session ADD CONSTRAINT fkSessionUserId FOREIGN KEY (UserId) REFERENCES Session (Id) ON DELETE CASCADE;

