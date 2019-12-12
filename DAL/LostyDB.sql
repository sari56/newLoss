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
 LossColor varchar(20),
 LossDate Date,
 Loss_X int,
 Loss_Y int,
 StatusCode int foreign key references [Status],
 PictureCode int foreign key references Picture,
 [Date] date
)
--drop table found 
--������
Create Table Found
(
 FoundCode int identity(100,1) primary key,
 FindID varchar(9) foreign key references Person,
 CategoryCode int foreign key references Category,
 FoundDesc varchar(20),
 FoundColor varchar(20),
 FoundDate Date,
 Found_X int,
 Found_Y int,
 StatusCode int foreign key references [Status],
-- PictureCode int foreign key references Picture,
 [Date] date
)
select * from found
--������ �����
Create Table ArchivesLoss
(
 ArchivesLossCode int primary key,
 LoseID varchar(9) foreign key references Lose,
 CategoryCode int foreign key references Category,
 ArchivesLossDesc varchar(20),
 ArchivesLossColor varchar(20),
 ArchivesLossDate Date,
 ArchivesLoss_X int,
 ArchivesLoss_Y int,
 StatusCode int foreign key references [Status],
 PictureCode int foreign key references Picture,
 [Date] date
)
--������ ������
Create Table ArchivesFound
(
 ArchivesFoundCode int primary key,
 FindID varchar(9) foreign key references Find,
 CategoryCode int foreign key references Category,
 ArchivesFoundDesc varchar(20),
 ArchivesFoundColor varchar(20),
 ArchivesFoundDate Date,
 ArchivesFound_X int,
 ArchivesFound_Y int,
 StatusCode int foreign key references [Status],
 PictureCode int foreign key references Picture,
 [Date] date
)
--����� ������
Create Table FindLoss
(
 FindLossCode int primary key,
 LoseID varchar(9) foreign key references Find,
 CategoryCode int foreign key references Category,
 FindLossDesc varchar(20),
 FindLossColor varchar(20),
 FindLossDate Date,
 FindLoss_X int,
 FindLoss_Y int,
 StatusCode int foreign key references [Status],
 PictureCode int foreign key references Picture,
 [Date] date
)
--������ �������
Create Table AskFound
(
 AskFoundCode int primary key,
 FindID varchar(9) foreign key references Find,
 CategoryCode int foreign key references Category,
 AskFoundDesc varchar(20),
 AskFoundColor varchar(20),
 AskFoundDate Date,
 AskFound_X int,
 AskFound_Y int,
 StatusCode int foreign key references [Status],
 PictureCode int foreign key references Picture,
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

Insert into [Status] values('����'),('����')
select * from [Status]
                             
select * from person
select * from [User]
    
delete from [User]
delete from person where PersonID = 027859511
delete from person where PersonID = 208094391

