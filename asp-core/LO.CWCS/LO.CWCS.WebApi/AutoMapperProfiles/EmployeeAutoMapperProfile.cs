using AutoMapper;
using LO.CWCS.Dtos.Employees;
using LO.CWCS.Entities;

namespace LO.CWCS.WebApi.AutoMapperProfiles
{
    public class EmployeeAutoMapperProfile : Profile
    {
        public EmployeeAutoMapperProfile()
        {
            CreateMap<Employee, EmployeeListDto>();
            CreateMap<Employee, EmployeeDto>().ReverseMap();
        }
    }
}
