using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
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
        [Route("api/Losty/GetCity")]
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
        public List<Found> GetFounds(int CategoryCode, string LossColor, DateTime LossDate)
        {
            SqlCommand cmd = ConnectSql(string.Format("Select * From Found Where((CategoryCode = '{0}' AND FoundColor = '{1}' AND FoundDate > '{2}') " +
                                       "OR (CategoryCode = '{0}' AND FoundColor = '{1}') OR(CategoryCode = '{0}' AND FoundDate > '{2}') OR (FoundColor =" +
                                       " '{1}' AND FoundDate > '{2}'))", CategoryCode, LossColor, LossDate));
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

        [Route("api/Losty/DeleteUser")]
        [HttpPost]
        public bool DeleteUser(Person person)
        {
            //string strSQL = string.Format("Delete From Person Where PersonID = '{0}'", person.PersonID);
            SqlCommand cmd = ConnectSql(string.Format("Delete From Person Where PersonID = '{0}'", person.PersonID));
            //SqlCommand cmd = ConnectSql("Delete From Person Where PersonID = '@PersonId'");
            try
            {
                //cmd.Parameters.AddWithValue("@PersonId", person.PersonID.ToString());
                cmd.ExecuteNonQuery();
                return true;
            }
            catch (Exception e)
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
                //DeleteUser(person);
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
                //DeleteUser(person);
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
        public bool VerifyUserName(string[] user)
        {
            string searchInPersonTable = string.Format("Select * From Person Where PersonID = '{0}' AND PersonEmail = '{1}'", user[1], user[3]);
            bool checkInsert = false;
            SqlCommand cmd = ConnectSql(searchInPersonTable);
            //cmd.Parameters.AddWithValue("@id", user[1]);
            //cmd.Parameters.AddWithValue("@email", user[3]);
            SqlDataReader reader = cmd.ExecuteReader();
            if (reader.Read())
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
                if (DeleteUser(person) == true)
                {
                    if (user[0].Equals("מוצא"))
                        checkInsert = InsertFind(person);
                    else
                        checkInsert = InsertLose(person);
                }            
            }    
            else
            {
                connection.DisConnectSql();
                string searchInFindTable = string.Format("Select * From Find Where FindID = '{0}' AND FindEmail = '{1}'", user[1], user[3]);
                cmd = ConnectSql(searchInFindTable);
                reader = cmd.ExecuteReader();
                if (reader.Read())
                    checkInsert = true;          
            }
            connection.DisConnectSql();
            if (checkInsert == true)
            {
                return true;
            }
            else
            {
                return false;
            }

        }
        //todo
        [Route("api/Losty/InsertFound")]
        [HttpPost]
        public string InsertFound(Found found)
        {
            //(FindID, CategoryCode, FoundColor, FoundDate, StatusCode, Date)
            SqlCommand cmd = ConnectSql("Insert into Found  Values(@FindID , @CategoryCode , @FoundDesc , @FoundColor , @FoundDate , @Found_X , @Found_Y , @StatusCode , @Date)");
            try
            {
                //cmd.Parameters.AddWithValue("@FoundCode", found.FoundCode);
                cmd.Parameters.AddWithValue("@FindID", found.FindID);
                cmd.Parameters.AddWithValue("@CategoryCode", found.CategoryCode);
                cmd.Parameters.AddWithValue("@FoundDesc", found.FoundDesc);
                cmd.Parameters.AddWithValue("@FoundColor", found.FoundColor);
                cmd.Parameters.AddWithValue("@FoundDate", found.FoundDate);
                cmd.Parameters.AddWithValue("@Found_X", found.Found_X);
                cmd.Parameters.AddWithValue("@Found_Y", found.Found_Y);
                cmd.Parameters.AddWithValue("@StatusCode", found.StatusCode);
                // cmd.Parameters.AddWithValue("@PictureCode", found.PictureCode);
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

        //[HttpPost]
        //[Route("api/Losty/SendEmail")]
        //public string SendEmail()
        //{
        //    MailMessage mail = new MailMessage();
        //    mail.Subject = strSubject;
        //    mail.From = new MailAddress("xyz@gmail.com");
        //    mail.To.Add(ToEmail);
        //    mail.Bcc.Add("abc@gmail.com");
        //    mail.Subject = strSubject;
        //    mail.Body = strBody;
        //    mail.IsBodyHtml = true;

        //    SmtpClient smtp = new SmtpClient("smtp.gmail.com", 25);
        //    smtp.EnableSsl = true;
        //    NetworkCredential netCre = new NetworkCredential("xyz@gmail.com", "myPassword");
        //    smtp.Credentials = netCre;
        //    try
        //    {
        //        smtp.Send(mail);
        //    }
        //    catch (Exception ex)
        //    {
        //        if (ex.InnerException != null)
        //        {
        //            string exInner = ex.InnerException.ToString();
        //        }
        //        msg = false;
        //    }
        //}

        [HttpGet]
        [Route("api/Losty/GetUserName")]
        public string GetUserName(string reciveName)
        {
            string[] characters = { "a", "b", "g", "d", "h", "v", "z", "ch", "t", "i", "c", "c", "l", "m", "m", "n", "n", "s", "a", "p", "p", "th", "th", "k", "r", "s", "t" };
            string[] fullName = reciveName.Split(' ');
            string userName = "";
            int i = 0, ascci;
            foreach (string word in fullName)
            {
                ascci = (int)Convert.ToChar(word[0]);
                userName += characters[ascci - 1488];
                i++;
            }
            Random random = new Random();
            userName += random.Next().ToString();
            return userName;
        }

        [HttpPost]
        [Route("api/Losty/InsertUserName")]
        public bool InsertUserName(string PersonID, string PersonEmail, string userName)
        {
            SqlCommand cmd = ConnectSql("Insert into [User] values (@UserID , @UserName , @UserEmail)");
            try
            {
                cmd.Parameters.AddWithValue("@UserID", PersonID);
                cmd.Parameters.AddWithValue("@UserName", userName);
                cmd.Parameters.AddWithValue("@UserEmail", PersonEmail);
                cmd.ExecuteNonQuery();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
            finally
            {
                connection.DisConnectSql();
            }
        }

        [HttpPost]
        [Route("api/Losty/SendEmail")]
        public string SendEmail(Person person)
        {
            //string[] recive = user.Split(' ');
            mail_core mail = new mail_core();
            string userName = GetUserName(person.PersonName);
            //mail.NewMail("sv4114994@gmail.com", "sari", "b0527109047@gmail.com", "batya", "hello", "good day", "");
            //mail.smtpServerSettings("smtp.gmail.com", 587, "b0527109047@gmail.com", "b1234123", true);
            mail.NewMail(person.PersonEmail, person.PersonName, "RS.Losty@gmail.com", "Losty", "LOSTY שם משתמש כניסה למערכת ", "שלום ל" + person.PersonName + " שם המשתמש שלך: " + userName, "");
            mail.smtpServerSettings("smtp.gmail.com", 587, "RS.Losty@gmail.com", "losty.1234", true);
            bool IsInsertUserName = InsertUserName(person.PersonID, person.PersonEmail, userName);
            //if (IsInsertUserName == true)
            return mail.sendMail();
            //return "Incorrect email Address";
        }

        [HttpPost]
        [Route("api/Losty/ChangeStatus/{status}")]
        public string ChangeStatus(string FoundID)
        {
            //SqlCommand cmd = ConnectSql(string.Format("UPDATE Found SET StatusCode = '{0}' Where FoundID = '{1}'", 3, FoundID));
            SqlCommand cmd = new SqlCommand("UPDATE Found ('StatusCode') VALUES ('@StatusCode') WHERE FoundID ='@FoundID'");
            try
            {
                cmd.Parameters.AddWithValue("@StatusCode", 3);
                cmd.Parameters.AddWithValue("@FoundID", FoundID);
                cmd.ExecuteNonQuery();
                return "Data updated!";
            }
            catch (Exception ex)
            {
               return ex.Message;
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