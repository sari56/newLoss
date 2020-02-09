using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Web_Api.Models
{
    public class Connection
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["SQLConn"].ConnectionString);

        /// <summary>
        /// Connect to SQL
        /// </summary>
        /// <param name="query">Query</param>
        /// <returns>command result</returns>
        public SqlCommand connectToSql(string query)
        {
            conn.Open();
            SqlCommand command = new SqlCommand(query, conn);
            return command;
        }

        /// <summary>
        /// Disonnect from SQL
        /// </summary>
        public void DisConnectSql()
        {
            conn.Close();
        }
    }
}


//[Route("http://localhost:59282/api/Home/GetCity")]
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