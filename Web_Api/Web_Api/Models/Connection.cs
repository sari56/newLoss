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