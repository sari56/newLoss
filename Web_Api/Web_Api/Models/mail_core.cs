using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;

namespace Web_Api.Models
{

        class mail_core
        {
            //Mail components
            static MailAddress sFrom;
            static MailAddress sTo;
            static MailMessage newEmail;

            //smtpServer
            SmtpClient SMTPServer;
            static string smtpServerAddress;
            static int smtpServerPort;
            static NetworkCredential cred;
            static bool ssl;

            /*
             *  
             *  Proposed usage:
             *  
             *  mail_core NewEmailToSend = new mail_core();
                temp.NewMail("xyz@gmail.com", "xyz", "abc@rocketmail.com", "abc", "subject string", "body of email, this is my first test email regards", "");
                temp.smtpServerSettings("smtp.gmail.com", 587, "xyz@gmail.com", "your password", true);
             */

            public mail_core() { }


            public void NewMail(string recieverEmail, string recieverName, string senderEmail, string senderName, string subject, string message, string attachementFile)
            {
                /*
                * NewMail creates new mail message, 
                * Necassary parameters are: recieverEmail, senderEmail, subject, message
                 * 
                 * Optional (can be empty) parameters: recieverName, senderName, attachmentFile
                */
                sTo = new MailAddress(recieverEmail, recieverName);
                sFrom = new MailAddress(senderEmail, senderName);
                newEmail = new MailMessage(sFrom, sTo)
                {
                    Subject = subject,
                    Body = message
                };
                if (!attachementFile.Equals("")) newEmail.Attachments.Add(new Attachment(attachementFile));
            }


            public void smtpServerSettings(string server, int port, string EmailUsername, string EmailPassword, bool sslEnable)
            {
                /*
                 * Enters SMTP (senders) server settings, if wrong, email wont send
                * * Necassary are: ALL
                */
                smtpServerAddress = server;
                smtpServerPort = port;
                cred = new NetworkCredential(EmailUsername, EmailPassword);
                ssl = sslEnable;
            }

            public void addAttachment(string filename)
            {
                /*
                * Add 1 or many attachments
                */
                newEmail.Attachments.Add(new Attachment(filename));
            }
   

            public string sendMail()
            {
                /*
                 * sends the email
                * return true if sent, returns false if not sent
                */
                try
                {
                    SMTPServer = new SmtpClient(smtpServerAddress);
                    SMTPServer.Port = smtpServerPort;
                    SMTPServer.UseDefaultCredentials = false;
                    SMTPServer.Credentials = cred;
                    SMTPServer.EnableSsl = ssl;
                    SMTPServer.DeliveryMethod = SmtpDeliveryMethod.Network;
                    SMTPServer.Send(newEmail);
                    return "true";
                }
                catch (Exception ex)
                {
                    return ex.Message;
                }
            }

        }

    }
