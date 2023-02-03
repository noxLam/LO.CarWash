using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LO.CWCS.Entities.Cars;

namespace LO.CWCS.Entities.Customers
{
    public class Customer
    {
        public Customer()
        {
            Cars = new List<Car>();
            Images = new List<CustomerImage>();
        }
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }

        public List<Car> Cars { get; set; }
        public List<CustomerImage> Images { get; set; }

        [NotMapped]
        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";
            }
        }

    }
}
