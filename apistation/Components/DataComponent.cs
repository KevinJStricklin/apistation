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
using apistation.Components;


namespace apistation
{

    public class DataComponent : apistation.IDataComponent
    {
        #region [ Fields ]
        /// <summary>
        /// In memory simple database
        /// </summary>
        private static Dictionary<String, JObject> db = new Dictionary<string, JObject>();
        #endregion

        #region [ Public Methods ] 
        public JObject Get(String path)
        {
            JObject results = new JObject();
            // Log 
            LogComponent.Log(path);

            if (db.ContainsKey(path))
            {
                results = db[path];
            }
            else
            {
                db.Where(o => o.Key.StartsWith(path))
                    .OrderBy(t => t.Key)
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
            // Log 
            LogComponent.Log(path, input_model);

            if (db.ContainsKey(path))
            {
                db[path] = input_model;
            }

            return results;
        }

        public JObject Post(String path, JObject input_model)
        {
            JObject results = new JObject();
            // Log 
            LogComponent.Log(path, input_model);

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
            // Log 
            LogComponent.Log(path, input_model);

            if (db.ContainsKey(path))
            {
                db.Remove(path);
            }

            return results;
        }
        #endregion
    }
}
