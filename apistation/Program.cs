using Nancy.Hosting.Self;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace apistation
{
    public class Program
    {
        public static ApiOptions Options = new ApiOptions();

        static void Main(string[] args)
        {
            using (var host = new NancyHost(new Uri("http://localhost:1236")))
            {
                host.Start();
                Console.WriteLine("Hosting at {0}", Program.Options.HostUri);
                Console.ReadLine();
            }
        }
    }
}
