using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace apistation.Components
{
    using System.Runtime;
    using System.Diagnostics;
    using System.Reflection;

    public class LogComponent
    {

        internal static void Log(string path)
        {
            throw new NotImplementedException();
        }

        internal static void Log(string path, Newtonsoft.Json.Linq.JObject input_model)
        {
            throw new NotImplementedException();
        }

        internal static void Log(string path, Nancy.Request Request)
        {
            throw new NotImplementedException();
        }

        internal static void Log(string path, Newtonsoft.Json.JsonException jsonERror)
        {
            throw new NotImplementedException();
        }
    }
}
