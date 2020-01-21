using System;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web_Api.Models
{
    public abstract class Model<T>
    {
        public abstract T Initialization(SqlDataReader reader);
    }

    public class City : Model<City>
    {
        public int CityCode { get; set; }
        public string CityTavCode { get; set; }
        public string CityName { get; set; }

        public override City Initialization(SqlDataReader reader)
        {
            City city = new City()
            {
                CityCode = (int)reader["CityCode"],
                CityName = reader["CityName"].ToString(),
                CityTavCode = reader["CityTavCode"].ToString(),
            };
            return city;
        }
    }

    public class Status
    {
        public int StatusCode { get; set; }
        public string StatusName { get; set; }
    }

    public class Color : Model<Color>
    {
        public int ColorCode { get; set; }
        public string color { get; set; }
        public string RelevantColors { get; set; }

        public override Color Initialization(SqlDataReader reader)
        {
            Color _color = new Color()
            {
                ColorCode = (int)reader["ColorCode"],
                color = reader["color"].ToString(),
                RelevantColors = reader["RelevantColors"].ToString()
            };
            return _color;
        }
    }

    public class Picture
    {
        public int PictureCode { get; set; }
        public string PictureRouter { get; set; }

    }

    public class Category : Model<Category>
    {
        public int CategoryCode { get; set; }
        public string CategoryDesc { get; set; }

        public override Category Initialization(SqlDataReader reader)
        {
            Category category = new Category()
            {
                CategoryCode = (int)reader["CategoryCode"],
                CategoryDesc = reader["CategoryDesc"].ToString(),

            };
            return category;
        }
    }

    public class User
    {
        public string UserID { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
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

        public Person Initialization(SqlDataReader reader, string user)
        {
            Person person = new Person()
            {
                PersonID = reader[user + "ID"].ToString(),
                PersonName = reader[user + "Name"].ToString(),
                PersonCityCode = (int)reader[user + "CityCode"],
                PersonAddress = reader[user + "Address"].ToString(),
                PersonPhone = reader[user + "Phone"].ToString(),
                PersonEmail = reader[user + "Email"].ToString()
            };
            return person;
        }
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

    public class Loss : Model<Loss>
    {
        public int LossCode { get; set; }
        public string LoseID { get; set; }
        public Nullable<int> CategoryCode { get; set; }
        public string LossDesc { get; set; }
        public Nullable<int> LossColor { get; set; }
        public Nullable<System.DateTime> LossDate { get; set; }
        public Nullable<int> Loss_X { get; set; }
        public Nullable<int> Loss_Y { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> StatusCode { get; set; }
        //public Nullable<int> PictureCode { get; set; }
        public Nullable<System.DateTime> Date { get; set; }

        public virtual Category Category { get; set; }
        public virtual Lose Lose { get; set; }
        public virtual Color Color { get; set; }
        //public virtual Picture Picture { get; set; }
        public virtual Status Status { get; set; }


        public override Loss Initialization(SqlDataReader reader)
        {
            Loss loss = new Loss()
            {
                LossCode = (int)reader["LossCode"],
                LoseID = reader["LoseID"].ToString(),
                LossDesc = reader["LossDesc"].ToString(),
                CategoryCode = (int)reader["CategoryCode"],
                LossColor = (int)reader["LossColor"],
                LossDate = (DateTime)reader["LossDate"],
                Loss_X = (int)reader["Loss_X"],
                Loss_Y = (int)reader["Loss_Y"],
                Remarks = reader["Remarks"].ToString(),
                StatusCode = (int)reader["StatusCode"],
                Date = (DateTime)reader["Date"]
            };
            return loss;
        }
    }

    public class Found : Model<Found>
    {
        public int FoundCode { get; set; }
        public string FindID { get; set; }
        public Nullable<int> CategoryCode { get; set; }
        public string FoundDesc { get; set; }
        public Nullable<int> FoundColor { get; set; }
        public Nullable<System.DateTime> FoundDate { get; set; }
        public Nullable<int> Found_X { get; set; }
        public Nullable<int> Found_Y { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> StatusCode { get; set; }
        //public Nullable<int> PictureCode { get; set; }
        public Nullable<System.DateTime> Date { get; set; }

        public virtual Category Category { get; set; }
        public virtual Find Find { get; set; }
        public virtual Color Color { get; set; }
        //public virtual Picture Picture { get; set; }
        public virtual Status Status { get; set; }

        public override Found Initialization(SqlDataReader reader)
        {
            Found found = new Found()
            {
                FoundCode = (int)reader["FoundCode"],
                FindID = reader["FindID"].ToString(),
                CategoryCode = (int)reader["CategoryCode"],
                FoundDesc = reader["FoundDesc"].ToString(),
                FoundColor = (int)reader["FoundColor"],
                FoundDate = (DateTime)reader["FoundDate"],
                Found_X = (int)reader["Found_X"],
                Found_Y = (int)reader["Found_Y"],
                Remarks = reader["Remarks"].ToString(),
                StatusCode = (int)reader["StatusCode"],
                Date = (DateTime)reader["Date"]
            };
            return found;
        }
    }

    public class ArchivesLoss
    {
        public int ArchivesLossCode { get; set; }
        public string LoseID { get; set; }
        public Nullable<int> CategoryCode { get; set; }
        public string ArchivesLossDesc { get; set; }
        public Nullable<int> ArchivesLossColor { get; set; }
        public Nullable<System.DateTime> ArchivesLossDate { get; set; }
        public Nullable<int> ArchivesLoss_X { get; set; }
        public Nullable<int> ArchivesLoss_Y { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> StatusCode { get; set; }
        public Nullable<int> PictureCode { get; set; }
        public Nullable<System.DateTime> Date { get; set; }

        public virtual Category Category { get; set; }
        public virtual Lose Lose { get; set; }
        public virtual Color Color { get; set; }
        //public virtual Picture Picture { get; set; }
        public virtual Status Status { get; set; }
    }

    public class ArchivesFound
    {
        public int ArchivesFoundCode { get; set; }
        public string FindID { get; set; }
        public Nullable<int> CategoryCode { get; set; }
        public string ArchivesFoundDesc { get; set; }
        public Nullable<int> ArchivesFoundColor { get; set; }
        public Nullable<System.DateTime> ArchivesFoundDate { get; set; }
        public Nullable<int> ArchivesFound_X { get; set; }
        public Nullable<int> ArchivesFound_Y { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> StatusCode { get; set; }
        public Nullable<int> PictureCode { get; set; }
        public Nullable<System.DateTime> Date { get; set; }

        public virtual Category Category { get; set; }
        public virtual Find Find { get; set; }
        public virtual Color Color { get; set; }
        //public virtual Picture Picture { get; set; }
        public virtual Status Status { get; set; }
    }

    public class FindLoss
    {
        public int FindLossCode { get; set; }
        public string LoseID { get; set; }
        public Nullable<int> CategoryCode { get; set; }
        public string FindLossDesc { get; set; }
        public Nullable<int> FindLossColor { get; set; }
        public Nullable<System.DateTime> FindLossDate { get; set; }
        public Nullable<int> FindLoss_X { get; set; }
        public Nullable<int> FindLoss_Y { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> StatusCode { get; set; }
        public Nullable<int> PictureCode { get; set; }
        public Nullable<System.DateTime> Date { get; set; }

        public virtual Category Category { get; set; }
        public virtual Find Find { get; set; }
        public virtual Color Color { get; set; }
        //public virtual Picture Picture { get; set; }
        public virtual Status Status { get; set; }
    }

    public class AskFound
    {
        public int AskFoundCode { get; set; }
        public string FindID { get; set; }
        public Nullable<int> CategoryCode { get; set; }
        public string AskFoundDesc { get; set; }
        public Nullable<int> AskFoundColor { get; set; }
        public Nullable<System.DateTime> AskFoundDate { get; set; }
        public Nullable<int> AskFound_X { get; set; }
        public Nullable<int> AskFound_Y { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> StatusCode { get; set; }
        public Nullable<int> PictureCode { get; set; }
        public Nullable<System.DateTime> Date { get; set; }

        public virtual Category Category { get; set; }
        public virtual Find Find { get; set; }
        public virtual Color Color { get; set; }
        //public virtual Picture Picture { get; set; }
        public virtual Status Status { get; set; }
    }

    public class Signs
    {
        public int Category { get; set; }
        public string Description { get; set; }
        public int Color { get; set; }
        public DateTime Date { get; set; }
        public string Remarks { get; set; }
    }
}