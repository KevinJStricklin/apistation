using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace apistation.Faults
{
    public class BaseFault 
    {
        #region [ Properties ]
        public String RequestPath { get; set; } 
        #endregion


        #region [ Constructors ]
        public BaseFault(String RequestPath)
        {
            this.RequestPath = RequestPath;
        }
        #endregion
    }
}
