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

    public class ApiModule : NancyModule
    {
        private  DataComponent Data
        {
            get { return new DataComponent(); }
        }

        public ApiModule()
            : base("/api")
        {
            string api_route = "/{path*}";

            Get[api_route] = _ =>
            {
                Hashtable model = new Hashtable();
                JObject data = this.Data.Get(_.path);

                model.Add("data", data);
                return Response.AsJson(model, HttpStatusCode.OK);
            };

            Post[api_route] = _ =>
            {
                Hashtable model = new Hashtable();
                var results = new JObject();
                var input_model = JObject.Parse(Request.Body.ReadAsString());

                results = this.Data.Post(_.path, input_model);

                model.Add("results", results);
                return Response.AsJson(model, HttpStatusCode.OK);
            };

            Put[api_route] = _ =>
            {
                Hashtable model = new Hashtable();
                var results = new JObject();
                var input_model = JObject.Parse(Request.Body.ReadAsString());

                results = this.Data.Put(_.path, input_model);

                model.Add("results", results);
                return Response.AsJson(model, HttpStatusCode.OK);
            };

            Delete[api_route] = _ =>
            {
                Hashtable model = new Hashtable();
                var results = new JObject();
                var input_model = JObject.Parse(Request.Body.ReadAsString());

                results = this.Data.Delete(_.path, input_model);

                model.Add("results", results);
                return Response.AsJson(model, HttpStatusCode.OK);
            };
        }
    }
}
