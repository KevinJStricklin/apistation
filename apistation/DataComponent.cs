using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace apistation
{
    public class DataComponent
    {
        private static Dictionary<String, JObject> db = new Dictionary<string, JObject>();


        public JObject Get(String path)
        {
            JObject results = new JObject();

            if (db.ContainsKey(path))
            {
                results = db[path];
            }
            else
            {
                db.Where(o => o.Key.StartsWith(path))
                    .ToList()
                    .ForEach(o =>
                    {
                        results.Add(o.Key, o.Value);
                    });
            }

            return results;
        }

        public JObject Put(String path, JObject input_model)
        {
            JObject results = new JObject();

            if (db.ContainsKey(path))
            {
                db[path] = input_model;
            }

            return results;
        }

        public JObject Post(String path, JObject input_model)
        {
            JObject results = new JObject();

            if (db.ContainsKey(path))
            {
                db[path] = input_model;
            }
            else
            {
                db.Add(path, input_model);
            }


            return results;
        }

        public JObject Delete(String path, JObject input_model)
        {
            JObject results = new JObject();

            if (db.ContainsKey(path))
            {
                db.Remove(path);
            }

            return results;
        }
    }


}
