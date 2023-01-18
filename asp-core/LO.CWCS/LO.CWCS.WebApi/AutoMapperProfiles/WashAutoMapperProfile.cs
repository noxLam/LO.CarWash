using AutoMapper;
using LO.CWCS.Dtos.Washes;
using LO.CWCS.Entities;

namespace LO.CWCS.WebApi.AutoMapperProfiles
{
    public class WashAutoMapperProfile : Profile
    {
        public WashAutoMapperProfile()
        {
            CreateMap<Wash, WashListDto>();
            CreateMap<Wash, WashDto>().ReverseMap();
        }
    }
}
