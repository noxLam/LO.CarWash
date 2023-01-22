﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LO.CWCS.EFCore;
using LO.CWCS.Entities;
using AutoMapper;
using LO.CWCS.Dtos.Cards;

namespace LO.CWCS.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CardsController : ControllerBase
    {
        #region Data and Const
        private readonly CarWashDbContext _context;
        private readonly IMapper _mapper;

        public CardsController(CarWashDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        #endregion

        #region Services
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CardListDto>>> GetCards()
        {
            var cards = await _context.Cards
                .Include(c => c.Car)
                .Include(c => c.Customer)
                .Include(c => c.Employee)
                .Include(c => c.Wash)
                .ToListAsync();
            var cardDtos = _mapper.Map<List<CardListDto>>(cards);
            return cardDtos;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Card>> GetCard(int id)
        {
            var card = await _context.Cards.FindAsync(id);

            if (card == null)
            {
                return NotFound();
            }

            return card;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> EditCard(int id, Card card)
        {
            if (id != card.Id)
            {
                return BadRequest();
            }

            _context.Entry(card).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CardExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        [HttpPost]
        public async Task<ActionResult<Card>> CreateCard(CardDto cardDto)
        {

            var card = _mapper.Map<Card>(cardDto);

            card.ActionDate= DateTime.Now;
            card.TotalPrice = await GetWashPrice(cardDto.WashId);

            _context.Cards.Add(card);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCard", new { id = cardDto.Id }, cardDto);
        }

        private async Task<double> GetWashPrice(int washId)
        {
            var wash = await _context.Washes.SingleAsync(w => w.Id == washId);

            var totalPrice = wash.Price;

            return totalPrice;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCard(int id)
        {
            var card = await _context.Cards.FindAsync(id);
            if (card == null)
            {
                return NotFound();
            }

            _context.Cards.Remove(card);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        #endregion

        #region Private Methods
        private bool CardExists(int id)
        {
            return _context.Cards.Any(e => e.Id == id);
        } 
        #endregion
    }
}
