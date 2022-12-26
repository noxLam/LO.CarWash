using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LO.CWCS.Dtos.Cars
{
    public class CarDto
    {
        public CarDto()
        {
            CustomerIds = new List<int>();
        }
        public int Id { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public string PlateNumber { get; set; }
        public List<int> CustomerIds { get; set; }
    }
}
