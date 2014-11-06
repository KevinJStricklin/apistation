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
    public static class DataComponentExtenisions
    {
        public static String sha256_hash(this String value)
        {
            StringBuilder Sb = new StringBuilder();

            using (SHA256 hash = SHA256Managed.Create())
            {
                Encoding enc = Encoding.UTF8;
                Byte[] result = hash.ComputeHash(enc.GetBytes(value));

                foreach (Byte b in result)
                    Sb.Append(b.ToString("x2"));
            }

            return Sb.ToString();
        }
    }

    public class DataComponent
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
        #endregion
    }

}
