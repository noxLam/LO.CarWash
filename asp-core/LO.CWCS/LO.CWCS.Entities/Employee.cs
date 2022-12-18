using LO.CWCS.Utils.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace LO.CWCS.Entities
{
    public class Employee
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        [NotMapped]
        public string FullName { 
            get
            {
                return $"{FirstName} {LastName}";
            }
        }
    }
}
