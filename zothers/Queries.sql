
-- 1. Database Creation
CREATE DATABASE MedicareDB;
GO
-- GO - Used to signal the end of a statement batch to the SQL Server utilities.

-- 2. Verification
SELECT name, create_date
FROM sys.databases WHERE name = 'MedicareDB'
-- sys.databases - SQL server's internal registry (table) of databases

-- 3. Switch Db context
USE master;
GO

-- 4. Rename
ALTER DATABASE InsuranceDB
MODIFY NAME = Automation_DB1

