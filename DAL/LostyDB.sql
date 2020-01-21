create database LostyDB
--drop table Person
--drop table LoseCode
--drop table FindCode
--����
Create Table City
(
CityCode int primary key identity(1,1),
CityTavCode varchar(1),
CityName varchar(20)
)
--�����
Create Table [Status]
(
StatusCode int primary key identity(1,1),
StatusName varchar(20)
)
Create Table Color 
(
 ColorCode int identity(1,1) primary key,
 Color varchar(20),
 RelevantColors varchar(50)
)
ALTER TABLE Color
ADD RelevantColors varchar(50)
--������
Create Table Picture
(
 PictureCode int identity(1,1) primary key,
 PictureRouter varchar(100)
)
--�������
Create Table Category
(
 CategoryCode int identity(1,1) primary key,
 CategoryDesc varchar(20)
)
--�����
Create Table Person
(
 PersonID varchar(9) primary key,
 PersonName varchar(50),
 PersonCityCode int foreign key references City,
 PersonAddress varchar(30),
 PersonPhone varchar(11),
 PersonEmail varchar(100),
)
Create Table [User]
(
 UserID varchar(9) primary key,
 UserName varchar(50),
 UserEmail varchar (100)
)
--������
Create Table Lose
(
 LoseID varchar(9) primary key,
 LoseName varchar(50),
 LoseCityCode int foreign key references City,
 LoseAddress varchar(30),
 LosePhone varchar(11),
 LoseEmail varchar(100),
)
--������
Create Table Find
(
 FindID varchar(9) primary key,
 FindName varchar(50),
 FindCityCode int foreign key references City,
 FindAddress varchar(30),
 FindPhone varchar(11),
 FindEmail varchar(100),
)
--�� ���� ����
--Create Table LoseCode
--(
-- LoseID varchar(10),
-- LoseCode varchar(5), 
-- primary key(LoseID,LoseCode)
--)
--�� ���� �����
--Create Table FindCode
--(
-- FindID varchar(10),
-- FindCode varchar(5)
--  primary key(FindID,FindCode)
--)
--�����
Create Table Loss
(
 LossCode int identity(100,1) primary key ,
 LoseID varchar(9) foreign key references Lose,
 CategoryCode int foreign key references Category,
 LossDesc varchar(20),
 LossColor int foreign key references Color,
 LossDate Date,
 Loss_X int,
 Loss_Y int,
 Remarks varchar(100),
 StatusCode int foreign key references [Status],
-- PictureCode int foreign key references Picture,
 [Date] date
)
--drop table found 
--������
Create Table Found
(
 FoundCode int identity(100,1) primary key,
 FindID varchar(9) foreign key references Find,
 CategoryCode int foreign key references Category,
 FoundDesc varchar(20),
 FoundColor int foreign key references Color,
 FoundDate Date,
 Found_X int,
 Found_Y int,
 Remarks varchar(100),
 StatusCode int foreign key references [Status],
-- PictureCode int foreign key references Picture,
 [Date] date
)
--������ �����
Create Table ArchivesLoss
(
 ArchivesLossCode int primary key,
 LoseID varchar(9) foreign key references Lose,
 CategoryCode int foreign key references Category,
 ArchivesLossDesc varchar(20),
 ArchivesLossColor int foreign key references Color,
 ArchivesLossDate Date,
 ArchivesLoss_X int,
 ArchivesLoss_Y int,
 Remarks varchar(100),
 StatusCode int foreign key references [Status],
 --PictureCode int foreign key references Picture,
 [Date] date
)
--������ ������
Create Table ArchivesFound
(
 ArchivesFoundCode int primary key,
 FindID varchar(9) foreign key references Find,
 CategoryCode int foreign key references Category,
 ArchivesFoundDesc varchar(20),
 ArchivesFoundColor int foreign key references Color,
 ArchivesFoundDate Date,
 ArchivesFound_X int,
 ArchivesFound_Y int,
 Remarks varchar(100),
 StatusCode int foreign key references [Status],
 --PictureCode int foreign key references Picture,
 [Date] date
)
--����� ������
Create Table FindLoss
(
 FindLossCode int primary key,
 LoseID varchar(9) foreign key references Find,
 CategoryCode int foreign key references Category,
 FindLossDesc varchar(20),
 FindLossColor int foreign key references Color,
 FindLossDate Date,
 FindLoss_X int,
 FindLoss_Y int,
 Remarks varchar(100),
 StatusCode int foreign key references [Status],
 --PictureCode int foreign key references Picture,
 [Date] date
)
--������ �������
Create Table AskFound
(
 AskFoundCode int primary key,
 FindID varchar(9) foreign key references Find,
 CategoryCode int foreign key references Category,
 AskFoundDesc varchar(20),
 AskFoundColor int foreign key references Color,
 AskFoundDate Date,
 AskFound_X int,
 AskFound_Y int,
 Remarks varchar(100),
 StatusCode int foreign key references [Status],
 --PictureCode int foreign key references Picture,
 [Date] date
)

Insert into Category 
values ('�������'),('����'),('�����'),('��� ����'),('���� �����'),('����� ����'),('��� ���'),('��� ���'),('��� �����'),('��� ���'),('���'),('����� �����'),('����� ������'),('����'),('�����'),('������'),('����'),('����'),('�������'),('��� ������'),('����� �������� �����'),('���'),('����� �����'),('����'),('�� ��'),('����'),('���'),('�����'),('�����'),('������ �����'),('���') 
Select * from Category
Insert into City
values ('�','��� �����'),('�','��� �����'),('�','��� �����'),('�','�����'),('�','����'),('�','����'),('�','�����'),('�','�����'),('�','�����'),('�','�����')
Insert into City
values ('�','��� ���'),('�','��� ����'),('�','����� ����'),('�','������� - ���� ���'),('�','��� ���'),('�','��� �����'),('�','��� ���'),('�','�� ����'),('�','��� ���'),('�','��� ���')
Insert into City
values ('�','���� ������'),('�','���� �����'),('�','�������'),('�','����'),('�','�� ����'),('�','�� ����'),('�','�����'),('�','��� �����'),('�','���'),('�','����')
Insert into City
values ('�','����� �'),('�','������'),('�','�������'),('�','����'),('�','���'),('�','����� �� ����'),('�','�����'),('�','�����'),('�','��'),('�','����')
Insert into City
values ('�','��� �����'),('�','�������'),('�','������'),('�','��� ��'),('�','�������'),('�','�������'),('�','������'),('�','�����'),('�','����'),('�','�� ���')
Insert into City
values ('�','�����'),('�','��� �����')
Insert into City
values ('�','����� ����'),('�','������ - ���'),('�','����'),('�','�����'),('�','������'),('�','�����'),('�','���'),('�','�����'),('�','�����'),('�','����')
Insert into City
values ('�','����'),('�','�����'),('�','����'),('�','��������'),('�','���'),('�','����'),('�','��-��'),('�','��� ����'),('�','����'),('�','�����')
Insert into City
values ('�','�����'),('�','���� ����'),('�','�� ���'),('�','��-��'),('�','�����'),('�','����'),('�','���� - ������'),('�','�����'),('�','����� ����'),('�','�����')
Insert into City
values ('�','����'),('�','����'),('�','����'),('�','������'),('�','����� �����'),('�','����� �����'),('�','����'),('�','�������'),('�','�����'),('�','����')
Insert into City
values ('�','��� ��'),('�','��� �����'),('�','��� ��"�'),('�','��� ���'),('�','��� ���'),('�','��� ������'),('�','������'),('�','��� ��� �����'),('�','��� ����'),('�','�����-����-������')
Insert into City
values ('�','���'),('�','���'),('�','����� ����'),('�','����� �����'),('�','����'),('�','����'),('�','������'),('�','����'),('�','����'),('�','����')
Insert into City
values ('�','����� ����'),('�','���� ����'),('�','�������'),('�','�������-�����-����'),('�','����� ����'),('�','����'),('�','������'),('�','���� ������'),('�','�����-������'),('�','�����')
Insert into City
values ('�','����'),('�','������'),('�','���� ����'),('�','�������'),('�','��� ���'),('�','�������'),('�','��� ���'),('�','�� �����'),('�','���� �����'),('�','���')
Insert into City
values ('�','�����'),('�','���'),('�','���'),('�','�����'),('�','�����'),('�','�����'),('�','����'),('�','���'),('�','����'),('�','����')
Insert into City
values ('�','����� ���'),('�','����'),('�','��� ���'),('�','���'),('�','������'),('�','�����'),('�','�����'),('�','��� ���� �����'),('�','����'),('�','�����')
Insert into City
values ('�','�������'),('�','��� �����'),('�','���� ���-�����'),('�','�����'),('�','��������'),('�','���� ��"�'),('�','������'),('�','����'),('�','����'),('�','����')
Insert into City
values ('�','��� ���'),('�','���'),('�','�����'),('�','�������'),('�','������'),('�','�����'),('�','�����'),('�','�����'),('�','������'),('�','�����')
Insert into City
values ('�','����'),('�','����� - ����'),('�','������'),('�','����� ����'),('�','����� ���'),('�','����� ������'),('�','����� ��'),('�','����� ������'),('�','����� �����'),('�','����� �����')
Insert into City
values ('�','��� ����'),('�','��� ����'),('�','����� �����'),('�','������'),('�','������'),('�','����'),('�','���� �����'),('�','����'),('�','��� ��'),('�','��� �����')
Insert into City
values ('�','���� ��'),('�','�����'),('�','����'),('�','�����'),('�','����'),('�','��� �����'),('�','��� �����'),('�','��� ����'),('�','��� ���'),('�','��� ������')
Insert into City
values ('�','�������'),('�','�� ���� -���'),('�','�� ����'),('�','������'),('�','����'),('�','���� ���"�'),('�','���� �����'),('�','���� �����'),('�','���� ���'),('�','���� �����')
select *  from City
Insert into [Status] values('����'),('����'),('�����')
Insert Into Color 
values ('���','1,2'),('��','1,2,3,4'),('����','2,3,4,5'),('����','2,3,4,14'),('����','3,4,5,14'),('����','5,6,7,10'),('�����','6,7,14'),('����','7,8,9,10'),('�����','8,9,10'),('����','6,7,8,9,10'),('����','1,11,12'),('���','11,12'),('���','2,3,4,13'),('���','3,4,5,14'),('����','3,15,16,17'),('���� ����','3,15,16,17'),('������','3,15,16,17,18,19'),('����','16,17,18,19'),('����','17,18,19'),('����','20')

select * from [Status]
select * from color                             
select * from person
select * from [User]
select * from Find
select * from Loss
select * from Category
select * from Found
delete from [User] where UserID = 208094391
delete from Find where FindID = 208094391
delete from Lose where LoseID = 208094391
delete from Find where FindID = 315244178
delete from person where PersonID = 027859511
delete from person where PersonID = 027859511

UPDATE Color SET RelevantColors = '20' Where ColorCode = 20
