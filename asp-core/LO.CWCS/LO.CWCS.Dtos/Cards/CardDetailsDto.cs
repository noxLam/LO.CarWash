using LO.CWCS.Utils.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LO.CWCS.Dtos.Cards
{
    public class CardDetailsDto
    {
        public int Id { get; set; }
        public DateTime ActionDate { get; set; }
        public double TotalPrice { get; set; }
        public PaymentMethod PaymentMethod { get; set; }

        public string CustomerFullName { get; set; }

        public string CarPlateNumber { get; set; }

        public string WashService { get; set; }

        public string EmployeeFullName { get; set; }
    }
}
