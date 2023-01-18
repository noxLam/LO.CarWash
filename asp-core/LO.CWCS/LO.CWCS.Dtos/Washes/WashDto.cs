using LO.CWCS.Utils.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LO.CWCS.Dtos.Washes
{
    public class WashDto
    {
        public int Id { get; set; }
        public WashType WashType { get; set; }
        public Size VehicleSize { get; set; }
        public double Price { get; set; }
    }
}
