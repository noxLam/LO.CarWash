using LO.CWCS.Utils.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LO.CWCS.Dtos.Cards
{
    public class CardDto
    {
        public int Id { get; set; }
        public DateTime ActionDate { get; set; }
        public PaymentMethod PaymentMethod { get; set; }

        public int CustomerId { get; set; }

        public int CarId { get; set; }

        public int WashId { get; set; }

        public int EmployeeId { get; set; }
    }
}
