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

        [Route("api/Losty/InsetUser")]
        [HttpPost]
        public bool InsetUser(Person person)
        {
            SqlCommand cmd = ConnectSql("Insert into Person values (@PersonId,@PersonName,@PersonCityCode,@PersonAddress,@PersonPhone,@personEmail)"
             );
            try
            {
                cmd.Parameters.AddWithValue("@PersonId", person.PersonID.ToString());
                cmd.Parameters.AddWithValue("@PersonName", person.PersonName.ToString());
                cmd.Parameters.AddWithValue("@PersonCityCode", person.PersonCityCode);
                cmd.Parameters.AddWithValue("@PersonAddress", person.PersonAddress.ToString());
                cmd.Parameters.AddWithValue("@PersonPhone", person.PersonPhone.ToString());
                cmd.Parameters.AddWithValue("@personEmail", person.PersonEmail.ToString());
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

        public SqlCommand ConnectSql(string query)
        {
            return connection.connectToSql(query);
        }
    }
}
