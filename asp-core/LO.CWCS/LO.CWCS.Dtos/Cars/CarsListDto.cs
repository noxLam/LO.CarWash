using LO.CWCS.Dtos.Customers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LO.CWCS.Dtos.Cars
{
    public class CarsListDto
    {
        public CarsListDto()
        {
            Customers = new List<CustomersListDto>();
        }
        public int Id { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public string PlateNumber { get; set; }
        public List<CustomersListDto> Customers { get; set; }
    }
}
