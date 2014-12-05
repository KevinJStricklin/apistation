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
    using apistation.Components;
    using apistation.Faults;

    public class ApiModule : NancyModule
    {

        protected  IDataComponent Data
        {
            get { return new DataComponent(); }
        }

        #region [ Functions ]
        #endregion

        #region [ Constructor ]
        /// <summary>
        /// Optional parameter for using this module as a Base Class
        /// </summary>
        /// <param name="PathOverride"></param>
        public ApiModule(String PathOverride = "" )
            : base(Program.Options.BaseRoute + PathOverride)
        {
            string api_route = "/{path*}";

            Get[api_route] = _ =>
            {
                Hashtable model = new Hashtable();
                JObject data = this.Data.Get(_.path);

                // Log 
                string path = _.path;
                LogComponent.Log(path, Request);

                model.Add("data", data);
                return Response.AsJson(model, HttpStatusCode.OK);
            };

            Post[api_route] = _ =>
            {
                Hashtable model = new Hashtable();
                var results = new JObject();
                JObject input_model = new JObject();
                
                // Log 
                string path = _.path;
                LogComponent.Log(path, Request);

                // Parse input model
                try
                {
                    input_model = JObject.Parse(Request.Body.ReadAsString());
                }
                catch (Newtonsoft.Json.JsonException jsonError)
                {
                    var fault = new InputModelParsingFault(path, jsonError);
                    LogComponent.Log(path, jsonError);
                    model.Add("fault", JObject.FromObject(fault));
                }
                

                results = this.Data.Post(_.path, input_model);

                model.Add("results", results);
                return Response.AsJson(model, HttpStatusCode.OK);
            };

            Put[api_route] = _ =>
            {
                Hashtable model = new Hashtable();
                var results = new JObject();
                JObject input_model = new JObject();

                // Log 
                string path = _.path;
                LogComponent.Log(path, Request);

                // Parse input model
                try
                {
                    input_model = JObject.Parse(Request.Body.ReadAsString());
                }
                catch (Newtonsoft.Json.JsonException jsonError)
                {
                    var fault = new InputModelParsingFault(path, jsonError);
                    LogComponent.Log(path, jsonError);
                    model.Add("fault", JObject.FromObject(fault));
                }

                results = this.Data.Put(_.path, input_model);

                model.Add("results", results);
                return Response.AsJson(model, HttpStatusCode.OK);
            };

            Delete[api_route] = _ =>
            {
                Hashtable model = new Hashtable();
                var results = new JObject();
                JObject input_model = new JObject();

                // Log 
                string path = _.path;
                LogComponent.Log(path, Request);

                // Parse input model
                try
                {
                    input_model = JObject.Parse(Request.Body.ReadAsString());
                }
                catch (Newtonsoft.Json.JsonException jsonError)
                {
                    var fault = new InputModelParsingFault(path, jsonError);
                    LogComponent.Log(path, jsonError);
                    model.Add("fault", JObject.FromObject(fault));
                }

                results = this.Data.Delete(_.path, input_model);

                model.Add("results", results);
                return Response.AsJson(model, HttpStatusCode.OK);
            };
        }
        #endregion
    }
}
