create database LostyDB
--drop table Person
--drop table LoseCode
--drop table FindCode
--ערים
Create Table City
(
CityCode int primary key identity(1,1),
CityTavCode varchar(1),
CityName varchar(20)
)
--סטטוס
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
--תמונות
Create Table Picture
(
 PictureCode int identity(1,1) primary key,
 PictureRouter varchar(100)
)
--קטגוריה
Create Table Category
(
 CategoryCode int identity(1,1) primary key,
 CategoryDesc varchar(20)
)
--אנשים
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
--מאבדים
Create Table Lose
(
 LoseID varchar(9) primary key,
 LoseName varchar(50),
 LoseCityCode int foreign key references City,
 LoseAddress varchar(30),
 LosePhone varchar(11),
 LoseEmail varchar(100),
)
--מוצאים
Create Table Find
(
 FindID varchar(9) primary key,
 FindName varchar(50),
 FindCityCode int foreign key references City,
 FindAddress varchar(30),
 FindPhone varchar(11),
 FindEmail varchar(100),
)
--תז וקוד אבדה
--Create Table LoseCode
--(
-- LoseID varchar(10),
-- LoseCode varchar(5), 
-- primary key(LoseID,LoseCode)
--)
--תז וקוד מציאה
--Create Table FindCode
--(
-- FindID varchar(10),
-- FindCode varchar(5)
--  primary key(FindID,FindCode)
--)
--אבדות
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
--מציאות
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
--ארכיון אבדות
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
--ארכיון מציאות
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
--אבדות שנמצאו
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
--מציאות שהתבקשו
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
values ('אוזניות'),('ארנק'),('בגדים'),('בעל חיים'),('דיסק אונקי'),('טלפון נייד'),('כלי בית'),('כלי כסף'),('כלי עבודה'),('כלי רכב'),('כסף'),('כרטיס אשראי'),('כרטיס מועדון'),('מטען'),('מטריה'),('מפתחות'),('מחשב'),('משחק'),('משקפיים'),('נגן מוזיקה'),('סוללה לקורקינט חשמלי'),('ספר'),('מכשיר רפואי'),('קסדה'),('רב קו'),('שעון'),('תיק'),('תכשיט'),('תמונה'),('תשמישי קדושה'),('אחר') 
Select * from Category
Insert into City
values ('א','אבן יהודה'),('א','אור יהודה'),('א','אור עקיבא'),('א','אורים'),('א','אזור'),('א','אייל'),('א','איילת'),('א','אלקנה'),('א','אריאל'),('א','אשדוד')
Insert into City
values ('ב','באר שבע'),('ב','באר יעקב'),('ב','בארות יצחק'),('ב','בנימינה - גבעת עדה'),('ב','בית דגן'),('ב','בית חנניה'),('ב','בית שמש'),('ב','בן זכאי'),('ב','בני ברק'),('ב','בני דור')
Insert into City
values ('ג','גבעת השלושה'),('ג','גבעת שמואל'),('ג','גבעתיים'),('ג','גדרה'),('ג','גן חיים'),('ג','גן יבנה'),('ג','גלאון'),('ג','גני תקווה'),('ג','געש'),('ג','גדיש')
Insert into City
values ('ד','דגניה א'),('ד','דימונה'),('ד','דבורייה'),('ד','דפנה'),('ד','דחי'),('ד','דאלית הר כרמל'),('ד','דלייה'),('ד','דלתון'),('ד','דן'),('ד','דברת')
Insert into City
values ('ה','הוד השרון'),('ה','הרצלייה'),('ה','הבונים'),('ה','הדר עם'),('ה','הגושרים'),('ה','החותרים'),('ה','המעפיל'),('ה','העוגן'),('ה','האון'),('ה','הר אדר')
Insert into City
values ('ו','ורדון'),('ו','ורד יריחו')
Insert into City
values ('ז','זכרון יעקב'),('ז','זבארגה - שבט'),('ז','זנוח'),('ז','זרזיר'),('ז','זבדיאל'),('ז','זכריה'),('ז','זמר'),('ז','זרחיה'),('ז','זרועה'),('ז','זיתן')
Insert into City
values ('ח','חדרה'),('ח','חולון'),('ח','חיפה'),('ח','חשמונאים'),('ח','חגי'),('ח','חדיד'),('ח','חד-נס'),('ח','חפץ חיים'),('ח','חגור'),('ח','חלמיש')
Insert into City
values ('ט','טבריה'),('ט','טירת כרמל'),('ט','טל שחר'),('ט','טל-אל'),('ט','טלמון'),('ט','טמרה'),('ט','טמרה - יזרעאל'),('ט','טייבה'),('ט','טייבה בעמק'),('ט','טפחות')
Insert into City
values ('י','יבנה'),('י','יגור'),('י','יהוד'),('י','יובלים'),('י','יקנעם מושבה'),('י','יקנעם עילית'),('י','יקום'),('י','ירושלים'),('י','ירחיב'),('י','יבול')
Insert into City
values ('כ','כפר הס'),('כ','כפר יהושע'),('כ','כפר מל"ל'),('כ','כפר נטר'),('כ','כפר סבא'),('כ','כפר שמריהו'),('כ','כרמיאל'),('כ','כפר ראש הנקרה'),('כ','כפר יונה'),('כ','כעביה-טבאש-חגאגרה')
Insert into City
values ('ל','לוד'),('ל','להב'),('ל','להבות הבשן'),('ל','להבות חביבה'),('ל','לכיש'),('ל','לפיד'),('ל','לפידות'),('ל','לקיה'),('ל','לביא'),('ל','לבון')
Insert into City
values ('מ','מבשרת ציון'),('מ','מגדל העמק'),('מ','מגשימים'),('מ','מודיעין-מכבים-רעות'),('מ','מזכרת בתיה'),('מ','מזרע'),('מ','מעברות'),('מ','מעלה אדומים'),('מ','מעלות-תרשיחא'),('מ','מענית')
Insert into City
values ('נ','נגבה'),('נ','נהרייה'),('נ','נווה ימין'),('נ','נורדייה'),('נ','נחל עוז'),('נ','נחשונים'),('נ','ניר צבי'),('נ','נס ציונה'),('נ','נצרת עילית'),('נ','נשר')
Insert into City
values ('ס','סביון'),('ס','סער'),('ס','סעד'),('ס','סאגור'),('ס','סחנין'),('ס','סלעית'),('ס','סלמה'),('ס','סמר'),('ס','ספיר'),('ס','סאסא')
Insert into City
values ('ע','עצמון שגב'),('ע','עומר'),('ע','עין שמר'),('ע','עכו'),('ע','עמינדב'),('ע','עמיעד'),('ע','עפולה'),('ע','עין חרוד איחוד'),('ע','עינת'),('ע','עברון')
Insert into City
values ('פ','פרדסייה'),('פ','פתח תקווה'),('פ','פרדס חנה-כרכור'),('פ','פסוטה'),('פ','פוריידיס'),('פ','פעמי תש"ז'),('פ','פלמחים'),('פ','פארן'),('פ','פרוד'),('פ','פטיש')
Insert into City
values ('צ','צור משה'),('צ','צפת'),('צ','צנדלה'),('צ','צפרירים'),('צ','צפרייה'),('צ','צאלים'),('צ','צלפון'),('צ','צרופה'),('צ','ציפורי'),('צ','צבעון')
Insert into City
values ('ק','קציר'),('ק','קדימה - צורן'),('ק','קיסריה'),('ק','קריית אונו'),('ק','קריית אתא'),('ק','קריית ביאליק'),('ק','קריית גת'),('ק','קריית מוצקין'),('ק','קריית מלאכי'),('ק','קריית עקרון')
Insert into City
values ('ר','ראש העין'),('ר','ראש פינה'),('ר','ראשון לציון'),('ר','רביבים'),('ר','רחובות'),('ר','רמות'),('ר','רמות השבים'),('ר','רמלה'),('ר','רמת גן'),('ר','רמת השרון')
Insert into City
values ('ש','שדות ים'),('ש','שדרות'),('ש','שוהם'),('ש','שפיים'),('ש','שריד'),('ש','שער הגולן'),('ש','שדי אברהם'),('ש','שדה בוקר'),('ש','שדה דוד'),('ש','שדה אליעזר')
Insert into City
values ('ת','תימורים'),('ת','תל אביב -יפו'),('ת','תל מונד'),('ת','תנובות'),('ת','תמרת'),('ת','תלמי ביל"ו'),('ת','תלמי אלעזר'),('ת','תלמי אליהו'),('ת','תלמי יפה'),('ת','תלמי יחיאל')
select *  from City
Insert into [Status] values('נאבד'),('נמצא'),('מבוקש')
Insert Into Color 
values ('לבן','1,2'),('בז','1,2,3,4'),('צהוב','2,3,4,5'),('חרדל','2,3,4,14'),('כתום','3,4,5,14'),('אדום','5,6,7,10'),('בורדו','6,7,14'),('סגול','7,8,9,10'),('סגלגל','8,9,10'),('ורוד','6,7,8,9,10'),('אפור','1,11,12'),('כסף','11,12'),('זהב','2,3,4,13'),('חום','3,4,5,14'),('ירוק','3,15,16,17'),('ירוק מנטה','3,15,16,17'),('טורקיז','3,15,16,17,18,19'),('תכלת','16,17,18,19'),('כחול','17,18,19'),('שחור','20')

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
