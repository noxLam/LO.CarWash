using LO.CWCS.Dtos.Cars;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LO.CWCS.Dtos.Customers
{
    public class CustomerDto
    {
        public CustomerDto()
        {
            Cars = new List<CarDto>;
        }
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }

        public List<CarDto> Cars { get; set; }
    }
}
