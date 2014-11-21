using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace apistation.Faults
{
    public class InputModelParsingFault : BaseFault
    {

        public InputModelParsingFault(String RequestPath, Exception jsonError) : base(RequestPath)
        {
            this.Message = jsonError.Message;
        }

        public string Message { get; set; }
    }
}
