using AutoMapper;
using LO.CWCS.Dtos.Cards;
using LO.CWCS.Entities;

namespace LO.CWCS.WebApi.AutoMapperProfiles
{
    public class CardAutoMapperProfile : Profile
    {
        public CardAutoMapperProfile()
        {
            CreateMap<Card, CardListDto>();
            CreateMap<Card, CardDto>().ReverseMap();
        }
    }
}
