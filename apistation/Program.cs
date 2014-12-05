using Nancy;
using Nancy.Conventions;
using Nancy.Hosting.Self;
using System;
using System.Collections.Generic;
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

            conventions.StaticContentsConventions.Add(
                StaticContentConventionBuilder.AddDirectory("Content", @"Content")
            );
        }
    }

    public class Program
    {
        #region [ Options ]
        public static ApiOptions Options = new ApiOptions();
        #endregion

        static void Main(string[] args)
        {
            using (var host = new NancyHost(new Uri("http://localhost:1234")))
            {
                host.Start();
                Console.WriteLine("Hosting at {0}", Program.Options.HostUri);
                Console.ReadLine();
            }
        }
    }
}
