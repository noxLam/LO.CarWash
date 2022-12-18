using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LO.CWCS.Entities
{
    public class Car
    {
        public Car()
        {
            Customers = new List<Customer>();
        }
        public int Id { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public string PlateNumber { get; set; }
        public List<Customer> Customers { get; set; }

    }
}
