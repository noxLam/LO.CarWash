using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LO.CWCS.Entities.Customers;

namespace LO.CWCS.Entities.Cars
{
    public class Car
    {
        public Car()
        {
            Customers = new List<Customer>();
            Images = new List<CarImage>();
        }
        public int Id { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public string PlateNumber { get; set; }
        public List<Customer> Customers { get; set; }
        public List<CarImage> Images { get; set; }

    }
}
