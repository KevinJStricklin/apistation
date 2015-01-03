using Nancy;
using Nancy.Conventions;
using Nancy.Hosting.Self;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace apistation
{
    public class CustomBoostrapper : DefaultNancyBootstrapper
    {
        protected override void ConfigureConventions(NancyConventions conventions)
        {
            base.ConfigureConventions(conventions);
        }
    }

    public class Program
    {
        #region [ Options ]
     
        #endregion

        static void Main(string[] args)
        {
            string host_listen_path = ConfigurationManager.AppSettings["host.listenpath"];

            using (var host = new NancyHost(new Uri(host_listen_path)))
            {
                host.Start();
                Console.WriteLine("Hosting at {0}", host_listen_path);
                Console.ReadLine();
            }
        }
    }
}
