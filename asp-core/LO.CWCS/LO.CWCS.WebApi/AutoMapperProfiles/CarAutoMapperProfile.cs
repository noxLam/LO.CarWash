using AutoMapper;
using LO.CWCS.Dtos.Cars;
using LO.CWCS.Entities;

namespace LO.CWCS.WebApi.AutoMapperProfiles
{
    public class CarAutoMapperProfile : Profile
    {
        public CarAutoMapperProfile()
        {
            CreateMap<Car, CarListDto>();
            CreateMap<Car, CarDto>().ReverseMap();
        }
    }
}
