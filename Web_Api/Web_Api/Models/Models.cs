using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web_Api.Models
{
    public class Models
    {
    }

    public class City
    {
        public int CityCode { get; set; }
        public string CityTavCode { get; set; }
        public string CityName { get; set; }
    }
    public class Status
    {
        public int StatusCode { get; set; }
        public string StatusName { get; set; }
    }
    public class Picture
    {
        public int PictureCode { get; set; }
        public string PictureRouter { get; set; }

    }
    public class Category
    {
        public int CategoryCode { get; set; }
        public string CategoryDesc { get; set; }
    }

    public class User
    {
        public string UserID { get; set; }
        public string UserName { get; set; }
    }

    public class Person
    {
        public string PersonID { get; set; }
        public string PersonName { get; set; }
        public Nullable<int> PersonCityCode { get; set; }
        public string PersonAddress { get; set; }
        public string PersonPhone { get; set; }
        public string PersonEmail { get; set; }

        public virtual City City { get; set; }
    }

    public class Lose
    {
        public string LoseID { get; set; }
        public string LoseName { get; set; }
        public Nullable<int> LoseCityCode { get; set; }
        public string LoseAddress { get; set; }
        public string LosePhone { get; set; }
        public string LoseEmail { get; set; }
    }

    public class Find
    {
        public string FindID { get; set; }
        public string FindName { get; set; }
        public Nullable<int> FindCityCode { get; set; }
        public string FindAddress { get; set; }
        public string FindPhone { get; set; }
        public string FindEmail { get; set; }
    }

    public class Loss
    {
        public int LossCode { get; set; }
        public string LoseID { get; set; }
        public Nullable<int> CategoryCode { get; set; }
        public string LossDesc { get; set; }
        public string LossColor { get; set; }
        public Nullable<System.DateTime> LossDate { get; set; }
        public Nullable<int> Loss_X { get; set; }
        public Nullable<int> Loss_Y { get; set; }
        public Nullable<int> StatusCode { get; set; }
        public Nullable<int> PictureCode { get; set; }
        public Nullable<System.DateTime> Date { get; set; }

        public virtual Category Category { get; set; }
        public virtual Lose Lose { get; set; }
        //public virtual Picture Picture { get; set; }
        public virtual Status Status { get; set; }
    }

    public class Found
    {
        public int FoundCode { get; set; }
        public string FindID { get; set; }
        public Nullable<int> CategoryCode { get; set; }
        public string FoundDesc { get; set; }
        public string FoundColor { get; set; }
        public Nullable<System.DateTime> FoundDate { get; set; }
        public Nullable<int> Found_X { get; set; }
        public Nullable<int> Found_Y { get; set; }
        public Nullable<int> StatusCode { get; set; }
        public Nullable<int> PictureCode { get; set; }
        public Nullable<System.DateTime> Date { get; set; }

        public virtual Category Category { get; set; }
        public virtual Find Find { get; set; }
        //public virtual Picture Picture { get; set; }
        public virtual Status Status { get; set; }
    }

    public class ArchivesLoss
    {
        public int ArchivesLossCode { get; set; }
        public string LoseID { get; set; }
        public Nullable<int> CategoryCode { get; set; }
        public string ArchivesLossDesc { get; set; }
        public string ArchivesLossColor { get; set; }
        public Nullable<System.DateTime> ArchivesLossDate { get; set; }
        public Nullable<int> ArchivesLoss_X { get; set; }
        public Nullable<int> ArchivesLoss_Y { get; set; }
        public Nullable<int> StatusCode { get; set; }
        public Nullable<int> PictureCode { get; set; }
        public Nullable<System.DateTime> Date { get; set; }

        public virtual Category Category { get; set; }
        public virtual Lose Lose { get; set; }
        public virtual Picture Picture { get; set; }
        public virtual Status Status { get; set; }
    }

    public class ArchivesFound
    {
        public int ArchivesFoundCode { get; set; }
        public string FindID { get; set; }
        public Nullable<int> CategoryCode { get; set; }
        public string ArchivesFoundDesc { get; set; }
        public string ArchivesFoundColor { get; set; }
        public Nullable<System.DateTime> ArchivesFoundDate { get; set; }
        public Nullable<int> ArchivesFound_X { get; set; }
        public Nullable<int> ArchivesFound_Y { get; set; }
        public Nullable<int> StatusCode { get; set; }
        public Nullable<int> PictureCode { get; set; }
        public Nullable<System.DateTime> Date { get; set; }

        public virtual Category Category { get; set; }
        public virtual Find Find { get; set; }
        public virtual Picture Picture { get; set; }
        public virtual Status Status { get; set; }
    }

    public class FindLoss
    {
        public int FindLossCode { get; set; }
        public string LoseID { get; set; }
        public Nullable<int> CategoryCode { get; set; }
        public string FindLossDesc { get; set; }
        public string FindLossColor { get; set; }
        public Nullable<System.DateTime> FindLossDate { get; set; }
        public Nullable<int> FindLoss_X { get; set; }
        public Nullable<int> FindLoss_Y { get; set; }
        public Nullable<int> StatusCode { get; set; }
        public Nullable<int> PictureCode { get; set; }
        public Nullable<System.DateTime> Date { get; set; }

        public virtual Category Category { get; set; }
        public virtual Find Find { get; set; }
        public virtual Picture Picture { get; set; }
        public virtual Status Status { get; set; }
    }

    public class AskFound
    {
        public int AskFoundCode { get; set; }
        public string FindID { get; set; }
        public Nullable<int> CategoryCode { get; set; }
        public string AskFoundDesc { get; set; }
        public string AskFoundColor { get; set; }
        public Nullable<System.DateTime> AskFoundDate { get; set; }
        public Nullable<int> AskFound_X { get; set; }
        public Nullable<int> AskFound_Y { get; set; }
        public Nullable<int> StatusCode { get; set; }
        public Nullable<int> PictureCode { get; set; }
        public Nullable<System.DateTime> Date { get; set; }

        public virtual Category Category { get; set; }
        public virtual Find Find { get; set; }
        public virtual Picture Picture { get; set; }
        public virtual Status Status { get; set; }
    }

    public class Signs
    {
        public int Category { get; set; }
        public string Color { get; set; }
        public DateTime Date { get; set; }
    }
}