using LO.CWCS.Dtos.Cars;
using LO.CWCS.Dtos.Uploaders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LO.CWCS.Dtos.Customers
{
    public class CustomerDetailsDto
    {
        public CustomerDetailsDto()
        {
            Cars = new List<CarDto>();
            Images = new List<UploaderImageDto>();
        }
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }

        public List<CarDto> Cars { get; set; }
        public List<UploaderImageDto> Images { get; set; }
    }
}
