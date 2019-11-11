using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using Web_Api.Models;

namespace Web_Api.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class LostyController : ApiController
    {
        public Connection connection = new Connection();

        //[Route("http://localhost:59282/api/Home/GetCity")]
        [HttpPost]
        public List<City> GetCity()
        {
            SqlCommand cmd = ConnectSql("Select * from City");
            SqlDataReader reader = cmd.ExecuteReader();
            List<City> resultCity = new List<City>();
            while (reader.Read())
            {
                City city = new City()
                {
                    CityCode = (int)reader["CityCode"],
                    CityName = reader["CityName"].ToString(),
                    CityTavCode = reader["CityTavCode"].ToString(),
                };
                var cityName = reader["CityName"];
                resultCity.Add(city);
            }
            connection.DisConnectSql();
            int x = resultCity.Count();
            return resultCity;
        }

        [Route("api/Losty/GetCategory")]
        [HttpPost]
        public List<Category> GetCategory()
        {
            SqlCommand cmd = ConnectSql("Select * from Category");
            SqlDataReader reader = cmd.ExecuteReader();
            List<Category> resultCategory = new List<Category>();
            while (reader.Read())
            {
                Category category = new Category()
                {
                    CategoryCode = (int)reader["CategoryCode"],
                    CategoryDesc = reader["CategoryDesc"].ToString(),

                };
                resultCategory.Add(category);
            }
            connection.DisConnectSql();
            var cnt = resultCategory.Count();
            return resultCategory;
        }

        [Route("api/Losty/GetFounds")]
        [HttpPost]
        public List<Found> GetFounds(int @CategoryCode, string @LossColor, DateTime @LossDate)
        {
            SqlCommand cmd = ConnectSql("Select * From Found Where ((@Category=CategoryCode AND @LossColor = FoundColor AND @LossDate < FoundDate) OR (@CategoryCode = CategoryCode AND @FoundColor = FoundColor) OR (@CategoryCode = CategoryCode @FoundDate < FoundDate) OR ( @LossColor = FoundColor AND @LossDate < FoundDate))");
            SqlDataReader reader = cmd.ExecuteReader();
            List<Found> resultFounds = new List<Found>();
            while (reader.Read())
            {
                Found found = new Found()
                {
                    FoundCode = (int)reader["FoundCode"],
                    FindID = reader["FindID"].ToString(),
                    CategoryCode = (int)reader["CategoryCode"],
                    FoundColor = reader["FoundColor"].ToString(),
                    FoundDate = (DateTime)reader["FoundDate"],

                };
                resultFounds.Add(found);
            }
            connection.DisConnectSql();
            if (resultFounds.Count() == 0)
                return null;
            return resultFounds;
        }

        [Route("api/Losty/InsertUser")]
        [HttpPost]
        public string InsertUser(Person person)
        {
            SqlCommand cmd = ConnectSql("Insert into Person values (@PersonId,@PersonName,@PersonCityCode,@PersonAddress,@PersonPhone,@personEmail)"
             );
            //SqlCommand cmd = ConnectSql("Insert into Person (PersonID , PersonName , PersonCityCode , PersonAddress , PersonPhone , PersonEmail) values (" + person.PersonID + " , " + person.PersonName + " , " + person.PersonCityCode.ToString() + " , " + person.PersonAddress + " , " + person.PersonPhone + " , " + person.PersonEmail + ");");

            try
            {
                cmd.Parameters.AddWithValue("@PersonId", person.PersonID.ToString());
                cmd.Parameters.AddWithValue("@PersonName", person.PersonName.ToString());
                cmd.Parameters.AddWithValue("@PersonCityCode", person.PersonCityCode);
                cmd.Parameters.AddWithValue("@PersonAddress", person.PersonAddress.ToString());
                cmd.Parameters.AddWithValue("@PersonPhone", person.PersonPhone.ToString());
                cmd.Parameters.AddWithValue("@personEmail", person.PersonEmail.ToString());
                cmd.ExecuteNonQuery();
                return "Inserting Data Successfully";
            }
            catch (Exception e)
            {
                return "Exception Occre while inserting person:" + e.Message + "\t" + e.GetType();
            }
            finally
            {
                connection.DisConnectSql();
            }

        }

        public bool DeleteUser(Person person)
        {
            SqlCommand cmd = ConnectSql("Delete * From Person Where PersonID = @personId");
            try
            {
                cmd.Parameters.AddWithValue("@personId", person.PersonID);
                cmd.ExecuteNonQuery();
                return true;
           }
            catch
            {
                return false;
            }
            finally
            {
                connection.DisConnectSql();
            }
        }

        public bool InsertFind(Person person)
        {
            SqlCommand cmd = ConnectSql("Insert into Find values (@FindId,@FindName,@FindCityCode,@FindAddress,@FindPhone,@FindEmail)"
            );
            try
            {
                cmd.Parameters.AddWithValue("@FindId", person.PersonID.ToString());
                cmd.Parameters.AddWithValue("@FindName", person.PersonName.ToString());
                cmd.Parameters.AddWithValue("@FindCityCode", person.PersonCityCode);
                cmd.Parameters.AddWithValue("@FindAddress", person.PersonAddress.ToString());
                cmd.Parameters.AddWithValue("@FindPhone", person.PersonPhone.ToString());
                cmd.Parameters.AddWithValue("@FindEmail", person.PersonEmail.ToString());
                cmd.ExecuteNonQuery();
                DeleteUser(person);
                return true;
            }
            catch
            {
                return false;
            }
            finally
            {
                connection.DisConnectSql();
            }
        }

        public bool InsertLose(Person person)
        {
            SqlCommand cmd = ConnectSql("Insert into Lose values (@LoseId,@LoseName,@LoseCityCode,@LoseAddress,@LosePhone,@LoseEmail)"
            );
            try
            {
                cmd.Parameters.AddWithValue("@LoseId", person.PersonID.ToString());
                cmd.Parameters.AddWithValue("@LoseName", person.PersonName.ToString());
                cmd.Parameters.AddWithValue("@LoseCityCode", person.PersonCityCode);
                cmd.Parameters.AddWithValue("@LoseAddress", person.PersonAddress.ToString());
                cmd.Parameters.AddWithValue("@LosePhone", person.PersonPhone.ToString());
                cmd.Parameters.AddWithValue("@LoseEmail", person.PersonEmail.ToString());
                cmd.ExecuteNonQuery();
                DeleteUser(person);
                return true;
            }
            catch
            {
                return false;
            }
            finally
            {
                connection.DisConnectSql();
            }
        }

        [Route("api/Losty/VerifyUserName")]
        [HttpPost]
        public bool VerifyUserName(string user , string id , string userName)
        {
            SqlCommand cmd = ConnectSql("Select * from Person Where PersonID = @id");
            cmd.Parameters.AddWithValue("@id", id);
            SqlDataReader reader = cmd.ExecuteReader();
            if(reader != null)
            {
                Person person = new Person()
                {
                    PersonID = reader["PersonID"].ToString(),
                    PersonName = reader["PersonName"].ToString(),
                    PersonCityCode = (int)reader["PersonCityCode"],
                    PersonAddress = reader["PersonAddress"].ToString(),
                    PersonPhone = reader["PersonPhone"].ToString(),
                    PersonEmail = reader["personEmail"].ToString()
                };
                connection.DisConnectSql();
                if (user == "מוצא")
                    return InsertFind(person);
                else
                   return InsertLose(person);
            }
            connection.DisConnectSql();
            return false;
          
        }
        //todo
        [Route("api/Losty/InsertFound")]
        [HttpPost]
        public string InsertFound(Found found)
        {
           SqlCommand cmd = ConnectSql("Insert into Found (FoundCode , FindID , CategoryCode , FoundColor , FoundDate , StatusCode , Date) Values(@FoundCode , @FindID , @CategoryCode , @FoundColor , @FoundDate , @StatusCode , @Date)");
            try
            {
                cmd.Parameters.AddWithValue("@FoundCode", found.FoundCode);
                cmd.Parameters.AddWithValue("@FindID", found.FindID);
                cmd.Parameters.AddWithValue("@CategoryCode", found.CategoryCode);
                cmd.Parameters.AddWithValue("@FoundColor", found.FoundColor);
                cmd.Parameters.AddWithValue("@FoundDate", found.FoundDate);
                cmd.Parameters.AddWithValue("@StatusCode", found.StatusCode);
                cmd.Parameters.AddWithValue("@Date", found.Date);
                cmd.ExecuteNonQuery();
                return "Inserting Found Seccessfuly";
            }
            catch (Exception e)
            {
                return "Exception Occre while inserting found:" + e.Message + "\t" + e.GetType();
            }
            finally
            {
                connection.DisConnectSql();
            }
        }

        public SqlCommand ConnectSql(string query)
        {
            return connection.connectToSql(query);
        }
    }
}
