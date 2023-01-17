using FluentValidation;
using LO.CWCS.Dtos.Employees;

namespace LO.CWCS.WebApi.FluentValidations
{
    public class EmployeeValidator : AbstractValidator<EmployeeDto>
    {
        public EmployeeValidator()
        {
            RuleFor(x => x.Id).NotNull();
            RuleFor(x => x.FirstName).NotNull().Length(3, 10);
            RuleFor(x => x.LastName).NotNull().Length(3, 10);
        }
    }
}
