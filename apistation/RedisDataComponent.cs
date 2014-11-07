using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace apistation
{
    using Newtonsoft.Json.Linq;
    using StackExchange.Redis;
    public class RedisDataComponent : IDataComponent
    {
        #region [ Fields ] 
        private ConnectionMultiplexer redis = ConnectionMultiplexer.Connect(Program.Options.RedisHost);

        private IDatabase db
        {
            get {  return this.redis.GetDatabase(); }
        }
        #endregion

        public Newtonsoft.Json.Linq.JObject Delete(string path, Newtonsoft.Json.Linq.JObject input_model)
        {
            JObject results = new JObject();

            this.db.KeyDelete(path);

            return results;
        }

        public Newtonsoft.Json.Linq.JObject Get(string path)
        {
            JObject results = new JObject();

            results = JObject.Parse(this.db.StringGet(path));

            return results;
        }

        public Newtonsoft.Json.Linq.JObject Post(string path, Newtonsoft.Json.Linq.JObject input_model)
        {
            JObject results = new JObject();

            this.db.StringSet(path, results.ToString());

            return results;
        }

        public Newtonsoft.Json.Linq.JObject Put(string path, Newtonsoft.Json.Linq.JObject input_model)
        {
            JObject results = new JObject();

            this.db.StringSet(path, results.ToString());

            return results;
        }
    }
}
