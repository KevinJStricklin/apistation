using System;
namespace apistation
{
    public interface IDataComponent
    {
        Newtonsoft.Json.Linq.JObject Delete(string path, Newtonsoft.Json.Linq.JObject input_model);
        Newtonsoft.Json.Linq.JObject Get(string path);
        Newtonsoft.Json.Linq.JObject Post(string path, Newtonsoft.Json.Linq.JObject input_model);
        Newtonsoft.Json.Linq.JObject Put(string path, Newtonsoft.Json.Linq.JObject input_model);
    }
}
