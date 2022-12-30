using AutoMapper;
using LO.CWCS.Dtos.Customers;
using LO.CWCS.Entities;

namespace LO.CWCS.WebApi.AutoMapperProfiles
{
    public class CustomerAutoMapperProfile : Profile
    {
        public CustomerAutoMapperProfile()
        {
            CreateMap<Customer, CustomerListDto>();
            CreateMap<Customer, CustomerDto>().ReverseMap();
        }
    }
}
