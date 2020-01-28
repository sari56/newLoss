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
        public const string PERSON = "Person";
        public const string FIND = "Find";
        public const string LOSE = "Lose";
        public const string _FIND = "מוצא";
        public const string _LOSE = "מאבד";

        //[Route("http://localhost:59282/api/Home/GetCity")]
        [Route("api/Losty/GetCity")]
        [HttpPost]
        public List<City> GetCity()
        {
            SqlCommand cmd = ConnectSql("Select * from City");
            SqlDataReader reader = cmd.ExecuteReader();
            List<City> resultCity = new List<City>();
            City city = new City();
            while (reader.Read())
            {
                resultCity.Add(city.Initialization(reader));
            }
            connection.DisConnectSql();
            return resultCity;
        }

        [Route("api/Losty/GetCategory")]
        [HttpPost]
        public List<Category> GetCategory()
        {
            SqlCommand cmd = ConnectSql("Select * from Category");
            SqlDataReader reader = cmd.ExecuteReader();
            List<Category> resultCategory = new List<Category>();
            Category category = new Category();
            while (reader.Read())
            {
                resultCategory.Add(category.Initialization(reader));
            }
            connection.DisConnectSql();
            var cnt = resultCategory.Count();
            return resultCategory;
        }

        [Route("api/Losty/GetColors")]
        [HttpPost]
        public List<Color> GetColors()
        {
            SqlCommand cmd = ConnectSql("Select * from Color");
            SqlDataReader reader = cmd.ExecuteReader();
            List<Color> resultColor = new List<Color>();
            Color _color = new Color();
            while (reader.Read())
            {
                resultColor.Add(_color.Initialization(reader));
            }
            connection.DisConnectSql();
            var cnt = resultColor.Count();
            return resultColor;
        }

        public string GetRelevantColors(int color)
        {
            List<int> resultColors = new List<int>();
            SqlCommand cmd = ConnectSql(string.Format("Select * From Color Where ColorCode = '{0}' ", color));
            SqlDataReader reader = cmd.ExecuteReader();
            Color _color = new Color();
            _color.Initialization(reader);
            connection.DisConnectSql();

            return _color.RelevantColors;
            //string[] colors = _color.RelevantColors.Split(',');
            
            //foreach (string c in colors)
            //{
            //    resultColors.Add(int.Parse(c));
            //}
            //return resultColors;
        }

        /// <summary>
        /// Get Founds by signs
        /// </summary>
        /// <param name="signs">lose's signs for search</param>
        /// <returns>list of relevant founds</returns>
        [Route("api/Losty/GetFounds")]
        [HttpPost]
        public List<Found> GetFounds(Signs signs)
        {
            //SqlCommand cmd = ConnectSql(string.Format("Select * From Found Where((CategoryCode = '{0}' AND FoundColor = '{1}' AND FoundDate > '{2}') " +
            //                           "OR (CategoryCode = '{0}' AND FoundColor = '{1}') OR (CategoryCode = '{0}' AND FoundDate > '{2}') OR (FoundColor =" +
            //                           " '{1}' AND FoundDate > '{2}'))", signs.Category.ToString(), signs.Color, signs.Date.ToString()));
            SqlCommand cmd = ConnectSql("Select * From Found");
            //SqlCommand cmd = new SqlCommand("Select * From Found");
            SqlDataReader reader = cmd.ExecuteReader();
            List<Found> resultFounds = new List<Found>();
            Found found = new Found();
            while (reader.Read())
            {
                resultFounds.Add(found.Initialization(reader));
            }
            connection.DisConnectSql();
            //if (resultFounds.Count() == 0)
            //    return null;

            int flag, i, j;
            for (i = resultFounds.Count() - 1; i >= 0; i--)
            {
                flag = 0;
                if (resultFounds[i].CategoryCode == signs.Category)
                    flag += 20;
                if (signs.Description != " ")
                {
                    string[] description = signs.Description.Split(' ');
                    j = 0;
                    foreach (string word in description)
                    {
                        string[] FoundDesc = resultFounds[i].FoundDesc.Split(' ');
                        foreach (string desc in FoundDesc)
                        {
                            j += word.Contains(desc) == true ? 1 : 0;
                        }
                    }
                    if (j != 0)
                        flag += 20;
                }
                else
                {
                    flag += 10;
                }
                //if (GetRelevantColors(signs.Color).Contains(resultFounds[i].FoundColor.ToString()))
                if(signs.Color == resultFounds[i].FoundColor)
                    flag += 20;
                if (resultFounds[i].FoundDate >= signs.Date.AddDays(-7))
                    flag += 20;
                if (signs.Remarks != " ")
                {
                    string[] remarks = signs.Remarks.Split(' ');
                    j = 0;
                    foreach (string word in remarks)
                    {
                        string[] FoundRemark = resultFounds[i].Remarks.Split(' ');
                        foreach (string remark in FoundRemark)
                        {
                            j += word.Contains(remark) == true ? 1 : 0;
                        }
                    }
                    if (j != 0)
                        flag += 20;
                    if (signs.Remarks.Contains(resultFounds[i].Remarks))
                        flag += 20;
                }
                else
                {
                    flag += 10;
                }
                if (flag < 50)
                    resultFounds.Remove(resultFounds[i]);
            }

            //resultFounds.ForEach(f => f.CategoryCode == signs.Category && f.FoundColor == signs.Color && f.Date == signs.Date).ToList();
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
            SqlCommand cmd = ConnectSql(string.Format("Delete From Person Where PersonID = '{0}'", person.PersonID));
            try
            {
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

        public bool InsertFind(Person person1)
        {
            SqlCommand cmd = ConnectSql("Insert into Find values (@FindId,@FindName,@FindCityCode,@FindAddress,@FindPhone,@FindEmail)"
            );
            try
            {
                cmd.Parameters.AddWithValue("@FindId", person1.PersonID.ToString());
                cmd.Parameters.AddWithValue("@FindName", person1.PersonName.ToString());
                cmd.Parameters.AddWithValue("@FindCityCode", person1.PersonCityCode);
                cmd.Parameters.AddWithValue("@FindAddress", person1.PersonAddress.ToString());
                cmd.Parameters.AddWithValue("@FindPhone", person1.PersonPhone.ToString());
                cmd.Parameters.AddWithValue("@FindEmail", person1.PersonEmail.ToString());
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

        public bool InsertLose(Person person2)
        {
            SqlCommand cmd = ConnectSql("Insert into Lose values (@LoseId,@LoseName,@LoseCityCode,@LoseAddress,@LosePhone,@LoseEmail)"
            );
            try
            {
                cmd.Parameters.AddWithValue("@LoseId", person2.PersonID.ToString());
                cmd.Parameters.AddWithValue("@LoseName", person2.PersonName.ToString());
                cmd.Parameters.AddWithValue("@LoseCityCode", person2.PersonCityCode);
                cmd.Parameters.AddWithValue("@LoseAddress", person2.PersonAddress.ToString());
                cmd.Parameters.AddWithValue("@LosePhone", person2.PersonPhone.ToString());
                cmd.Parameters.AddWithValue("@LoseEmail", person2.PersonEmail.ToString());
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
            string userID = "";
            Person person = new Person();
            //Get User ID
            string searchUser = string.Format("Select UserID From [User] Where UserName = '{0}' AND UserEmail = '{1}' ", user[1], user[2]);
            SqlCommand cmd = ConnectSql(searchUser);
            SqlDataReader reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                userID = reader["UserID"].ToString();
            }
            connection.DisConnectSql();
            //Search if User appear in Person Table? Delete & Add To Find/Lose Table : Search in Find/Lose Tables
            string searchInPersonTable = string.Format("Select * From Person Where PersonID = '{0}' ", userID);
            bool checkInsert = false;
            cmd = ConnectSql(searchInPersonTable);
            reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                person = person.Initialization(reader, PERSON);
                connection.DisConnectSql();
                if (DeleteUser(person) == true)
                {
                    if (user[0].Equals(_FIND))
                        checkInsert = InsertFind(person);
                    else
                        checkInsert = InsertLose(person);
                }
            }
            //Search in Find / Lose Tables if User Find/Lose appear in the different table copy to the relevant table
            else
            {
                connection.DisConnectSql();
                string searchInFindTable = string.Format("Select * From Find Where FindID = '{0}' ", userID);
                cmd = ConnectSql(searchInFindTable);
                reader = cmd.ExecuteReader();
                if (reader.Read())
                {
                    if (user[0].Equals(_FIND))
                    {
                        checkInsert = true;
                    }
                    else
                    {
                        person = person.Initialization(reader, FIND);
                    }
                }
                connection.DisConnectSql();
                if (checkInsert == false)
                {
                    string searchInLoseTable = string.Format("Select * From Lose Where LoseID = '{0}' ", userID);
                    cmd = ConnectSql(searchInLoseTable);
                    reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        if (user[0].Equals(_LOSE))
                        {
                            checkInsert = true;
                        }
                        else
                        {
                            person = person.Initialization(reader, LOSE);
                            connection.DisConnectSql();
                            checkInsert = InsertFind(person);
                        }
                    }
                    else
                    {
                        if (person != null)
                        {
                            connection.DisConnectSql();
                            checkInsert = InsertLose(person);
                        }
                    }
                }
            }
            return checkInsert;
        }


        public string GetUserID(string userName)
        {
            string userID = "";
            Person person = new Person();
            string searchUser = string.Format("Select UserID From [User] Where UserName = '{0}' ", userName);
            SqlCommand cmd = ConnectSql(searchUser);
            SqlDataReader reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                userID = reader["UserID"].ToString();
            }
            connection.DisConnectSql();
            return userID;
        }

        [Route("api/Losty/InsertFound")]
        [HttpPost]
        public string InsertFound(Found found)
        {
            found.FindID = GetUserID(found.FindID);
            SqlCommand cmd = ConnectSql("Insert into Found  Values(@FindID , @CategoryCode , @FoundDesc , @FoundColor , @FoundDate , @Found_X , @Found_Y, @Remarks, @StatusCode , @Date)");
            try
            {
                cmd.Parameters.AddWithValue("@FindID", found.FindID);
                cmd.Parameters.AddWithValue("@CategoryCode", found.CategoryCode);
                cmd.Parameters.AddWithValue("@FoundDesc", found.FoundDesc);
                cmd.Parameters.AddWithValue("@FoundColor", found.FoundColor);
                cmd.Parameters.AddWithValue("@FoundDate", found.FoundDate);
                cmd.Parameters.AddWithValue("@Found_X", found.Found_X);
                cmd.Parameters.AddWithValue("@Found_Y", found.Found_Y);
                cmd.Parameters.AddWithValue("@Remarks", found.Remarks);
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

        [Route("api/Losty/InsertLoss")]
        [HttpPost]
        public string InsertLoss(Loss loss)
        {
            loss.LoseID = GetUserID(loss.LoseID);
            SqlCommand cmd = ConnectSql("Insert into Loss Values(@LoseID , @CategoryCode , @LossDesc , @LossColor , @LossDate , @Loss_X , @Loss_Y , @Remarks, @StatusCode , @Date)");
            try
            {
                cmd.Parameters.AddWithValue("@LoseID", loss.LoseID);
                cmd.Parameters.AddWithValue("@CategoryCode", loss.CategoryCode);
                cmd.Parameters.AddWithValue("@LossDesc", loss.LossDesc);
                cmd.Parameters.AddWithValue("@LossColor", loss.LossColor);
                cmd.Parameters.AddWithValue("@LossDate", loss.LossDate);
                cmd.Parameters.AddWithValue("@Loss_X", loss.Loss_X);
                cmd.Parameters.AddWithValue("@Loss_Y", loss.Loss_Y);
                cmd.Parameters.AddWithValue("@Remarks", loss.Remarks);
                cmd.Parameters.AddWithValue("@StatusCode", loss.StatusCode);
                cmd.Parameters.AddWithValue("@Date", loss.Date);
                cmd.ExecuteNonQuery();
                return "Inserting Loss Seccessfuly";
            }
            catch (Exception e)
            {
                return "Exception Occre while inserting loss:" + e.Message + "\t" + e.GetType();
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
            catch
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
            InsertUserName(person.PersonID, person.PersonEmail, userName);
            //if (IsInsertUserName == true)
            return mail.sendMail();
            //return "Incorrect email Address";
        }

        public bool VerifyUserId(Person p)
        {
            string searchUser = string.Format("Select * From [User] Where UserId = '{0}' ", p.PersonID);
            SqlCommand cmd = ConnectSql(searchUser);
            SqlDataReader reader = cmd.ExecuteReader();
            connection.DisConnectSql();
            if (reader.Read())
                return true;
            return false;
        }

        [HttpPost]
        [Route("api/Losty/GetFoundsPersonalArea")]
        public List<Found> GetFoundsPersonalArea(Person person)
        {
            SqlCommand cmd = ConnectSql(string.Format("Select * From Found Where FindID = '{0}'", person.PersonID));
            SqlDataReader reader = cmd.ExecuteReader();
            List<Found> resultFound = new List<Found>();
            Found found = new Found();
            while (reader.Read())
            {
                resultFound.Add(found.Initialization(reader));
            }
            connection.DisConnectSql();
            int x = resultFound.Count();
            return resultFound;
        }

        [HttpPost]
        [Route("api/Losty/GetLosesToPersonalArea")]
        public List<Loss> GetLosesToPersonalArea(Person person)
        {
            SqlCommand cmd = ConnectSql(string.Format("Select * From Loss Where LoseID = '{0}'", person.PersonID));
            SqlDataReader reader = cmd.ExecuteReader();
            List<Loss> resultLoss = new List<Loss>();
            Loss loss = new Loss();
            while (reader.Read())
            {
                resultLoss.Add(loss.Initialization(reader));
            }
            connection.DisConnectSql();
            int x = resultLoss.Count();
            return resultLoss;
        }

        [HttpPost]
        [Route("api/Losty/ChangeStatus")]
        public string ChangeStatus(Found _found)
        {
            int status = 3;
           SqlCommand cmd = ConnectSql(string.Format("UPDATE Found SET StatusCode = '{0}' Where FoundCode = '{1}'", status, _found.FoundCode));
           // SqlCommand cmd = ConnectSql("UPDATE Found SET StatusCode = ('@StatusCode') WHERE FoundCode ='@FoundCode'");
            try
            {
                cmd.Parameters.AddWithValue("@StatusCode", 3);
                cmd.Parameters.AddWithValue("@FoundCode", _found.FoundCode);
                cmd.ExecuteNonQuery();
                return _found.FoundCode + "Data updated!";
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
