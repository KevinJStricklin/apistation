using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace apistation
{
    using System.Configuration;

    public class ApiOptions
    {
        public String BaseRoute
        {
            get { return ConfigurationManager.AppSettings["api.base.route"]; }
        }

        public String HostUri
        {
            get { return ConfigurationManager.AppSettings["host.uri"]; }
        }
    }
}
