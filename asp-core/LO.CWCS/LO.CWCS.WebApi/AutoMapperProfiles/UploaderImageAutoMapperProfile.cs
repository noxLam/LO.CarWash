using AutoMapper;
using LO.CWCS.Dtos.Uploaders;
using LO.CWCS.Entities.Cars;
using LO.CWCS.Entities.Customers;

namespace LO.CWCS.WebApi.AutoMapperProfiles
{
    public class UploaderImageAutoMapperProfile : Profile
    {
        public UploaderImageAutoMapperProfile()
        {
            CreateMap<UploaderImageDto, CarImage>().ReverseMap();
            CreateMap<UploaderImageDto, CustomerImage>().ReverseMap();

        }
    }
}
