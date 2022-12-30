using LO.CWCS.Dtos.Customers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LO.CWCS.Dtos.Cars
{
    public class CarListDto
    {
        public CarListDto()
        {
            Customers = new List<CustomerListDto>();
        }
        public int Id { get; set; }
        public string Model { get; set; }
        public string PlateNumber { get; set; }
        public List<CustomerListDto> Customers { get; set; }
    }
}
