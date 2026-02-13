using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace fnPaymant
{
    internal class PaymantModel
    {
        public string id { get; set; } = Guid.NewGuid().ToString();
        public string IdPaymant { get; set; } = Guid.NewGuid().ToString();
        public string nome { get; set; }
        public string email { get; set; }
        public string modelo { get; set; }
        public string ano { get; set; }
        public string tempoAluguel { get; set; }
        public DateTime data { get; set; }
        public string status { get; set; }
        public DateTime? dataAprovacao { get; set; }
    }

}