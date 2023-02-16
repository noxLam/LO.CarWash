using LO.CWCS.Entities.Cars;
using LO.CWCS.Entities.Customers;
using LO.CWCS.Utils.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LO.CWCS.Entities
{
    public class Card
    {
        public int Id { get; set; }
        public DateTime? ActionDate { get; set; }
        public double TotalPrice { get; set; }
        public PaymentMethod PaymentMethod { get; set; }

        public int CustomerId { get; set; }
        public Customer Customer { get; set; }

        public int CarId { get; set; }
        public Car Car { get; set; }

        public int WashId { get; set; }
        public Wash Wash { get; set; }

        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
    }
}
