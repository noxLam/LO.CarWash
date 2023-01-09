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
            CreateMap<CustomerDto, Customer>();


            CreateMap<Customer, CustomerDto>()
                .ForMember(dest => dest.CarIds, opts => opts.MapFrom(src => src.Cars.Select(c => c.Id)));

        }
    }
}
