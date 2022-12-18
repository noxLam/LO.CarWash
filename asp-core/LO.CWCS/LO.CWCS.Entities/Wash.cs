using LO.CWCS.Utils.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LO.CWCS.Entities
{
    public class Wash
    {
        public int Id { get; set; }
        public WashType WashType { get; set; }
        public Size VehicleSize { get; set; }
        public double Price { get; set; }

        [NotMapped]
        public string WashService {
            get
            {
                return $"{WashType} {VehicleSize}";
            }
        }
    }
}
