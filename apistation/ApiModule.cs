using Nancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace apistation
{
    using Nancy;
    using Nancy.ModelBinding;
    using Nancy.Responses;
    using System.Dynamic;
    using System.Collections;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Converters;
    using Newtonsoft.Json.Linq;
    using System.IO;
    using System.Collections.Concurrent;
    using System.Configuration;

    public class ApiModule : NancyModule
    {
        #region [ Static Cache ]
        #endregion

        #region [ Functions ]
        /// <summary>
        /// Authentication Verification Function
        /// </summary>
        /// <param name="Request"></param>
        /// <returns></returns>
        private bool Authenticated(Request Request)
        {
            bool result = false;

            result = true;

            return result;
        }
        #endregion

        #region [ Constructor ]
        public ApiModule ()
            : base(ConfigurationManager.AppSettings["api.base.route"])
        {
            string api_route = "/{path*}";

            Get[api_route] = _ =>
            {
                // Logging 
                Console.WriteLine(String.Format("{1} {0}", Request.Path, Request.Method));
                try { 
                #region [ HTTP GET ] 
                Hashtable response_obj = new Hashtable();
                string path = Request.Path;
                string resource_path = String.Format("{0}/{1}", ConfigurationManager.AppSettings["api.resource.path"], Request.Path.Replace("/", "_"));

                if (this.Authenticated(Request))
                {
                    var resources = (new DirectoryInfo(ConfigurationManager.AppSettings["api.resource.path"]))
                                                                  .GetFiles("*.*", SearchOption.AllDirectories)
                                                                  .Where(file => file.Name.Replace("_", "/").StartsWith(Request.Path))
                                                                  .Select(json_file => File.ReadAllText(json_file.FullName))
                                                                  .Select(json => JObject.Parse(json));
                    if (resources.Any())
                    {
                        response_obj.Add("results", resources);
                    }
                }

                return Response.AsJson(response_obj, HttpStatusCode.OK);
                #endregion
                }
                catch (Exception x)
                {
                    Console.WriteLine(String.Format("ERROR : {0}", x.Message));
                    Hashtable error_model = new Hashtable();
                    error_model.Add("error", x.Message);
                    return Response.AsJson(error_model, HttpStatusCode.InternalServerError);
                }
            };

            Post[api_route] = _ =>
            {
                // Logging 
                Console.WriteLine(String.Format("{1} {0}", Request.Path, Request.Method));

                try
                {
                    #region [ HTTP POST ]
                    Hashtable response_obj = new Hashtable();
                    string resource_path = String.Format("{0}/{1}", ConfigurationManager.AppSettings["api.resource.path"], Request.Path.Replace("/", "_"));

                    if (this.Authenticated(Request))
                    {
                        if (File.Exists(resource_path))
                        {
                            // Update
                            File.WriteAllText(resource_path, Request.Body.ReadAsString());
                            response_obj.Add("resource.action", "update");
                        }
                        else
                        {
                            // Create
                            File.WriteAllText(resource_path, Request.Body.ReadAsString());
                            response_obj.Add("resource.action", "create");
                        }
                    }

                    return Response.AsJson(response_obj, HttpStatusCode.OK);
                    #endregion
                }
                catch (Exception x)
                {
                    Console.WriteLine(String.Format("ERROR : {0}", x.Message));
                    Hashtable error_model = new Hashtable();
                    error_model.Add("error", x.Message);
                    return Response.AsJson(error_model, HttpStatusCode.InternalServerError);
                }
            };

            Put[api_route] = _ =>
            {
                // Logging 
                Console.WriteLine(String.Format("{1} {0}", Request.Path, Request.Method));

                try { 
                #region [ HTTP PUT ]
                Hashtable response_obj = new Hashtable();
                string resource_path = String.Format("{0}/{1}", ConfigurationManager.AppSettings["api.resource.path"], Request.Path.Replace("/", "_"));

                if (this.Authenticated(Request))
                {
                    if (File.Exists(resource_path))
                    {
                        // Update
                        File.WriteAllText(resource_path, Request.Body.ReadAsString());
                        response_obj.Add("resource.action", "update");
                    }
                    else
                    {
                        // Create
                        File.WriteAllText(resource_path, Request.Body.ReadAsString());
                        response_obj.Add("resource.action", "create");
                    }
                }

                return Response.AsJson(response_obj, HttpStatusCode.OK);
                #endregion
                }
                catch (Exception x)
                {
                    Console.WriteLine(String.Format("ERROR : {0}", x.Message));
                    Hashtable error_model = new Hashtable();
                    error_model.Add("error", x.Message);
                    return Response.AsJson(error_model, HttpStatusCode.InternalServerError);
                }
            };

            Delete[api_route] = _ =>
            {
                // Logging 
                Console.WriteLine(String.Format("{1} {0}", Request.Path, Request.Method));

                try { 
                #region [ HTTP DELETE ]
                Hashtable response_obj = new Hashtable();

                if (this.Authenticated(Request))
                {

                }

                return Response.AsJson(response_obj, HttpStatusCode.OK);
                #endregion
                }
                catch (Exception x)
                {
                    Console.WriteLine(String.Format("ERROR : {0}", x.Message));
                    Hashtable error_model = new Hashtable();
                    error_model.Add("error", x.Message);
                    return Response.AsJson(error_model, HttpStatusCode.InternalServerError);
                }
            };
        }
        #endregion
    }
}
