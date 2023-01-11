﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LO.CWCS.EFCore;
using LO.CWCS.Entities;
using AutoMapper;
using LO.CWCS.Dtos.Cars;
using LO.CWCS.Dtos.Lookups;

namespace LO.CWCS.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        #region Data And Const
        private readonly CarWashDbContext _context;
        private readonly IMapper _mapper;

        public CarsController(CarWashDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        #endregion

        #region Services
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CarListDto>>> GetCars()
        {
            var cars = await _context.Cars.ToListAsync();
            var carDtos = _mapper.Map<List<CarListDto>>(cars);
            return carDtos;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Car>> GetCar(int id)
        {
            var car = await _context.Cars.FindAsync(id);

            if (car == null)
            {
                return NotFound();
            }

            return car;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> EditCar(int id, Car car)
        {
            if (id != car.Id)
            {
                return BadRequest();
            }

            _context.Entry(car).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CarExists(id))
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
        public async Task<ActionResult<Car>> CreateCar(Car car)
        {
            _context.Cars.Add(car);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCar", new { id = car.Id }, car);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCar(int id)
        {
            var car = await _context.Cars.FindAsync(id);
            if (car == null)
            {
                return NotFound();
            }

            _context.Cars.Remove(car);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        #endregion

        #region Lookups
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LookupDto>>> GetLookup()
        {
            var carLookup = await _context
                                    .Cars
                                    .Select(car => new LookupDto()
                                    {
                                           Value = car.Id,
                                           Text = car.PlateNumber
                                    })
                                    .ToListAsync();
            return carLookup;
            
        }
        #endregion

        #region Private Methods
        private bool CarExists(int id)
        {
            return _context.Cars.Any(e => e.Id == id);
        } 

        private bool CarPlateNumExists(string plateNum)
        {
            return _context.Cars.Any(c => c.PlateNumber == plateNum);
        }
        #endregion
    }
}
