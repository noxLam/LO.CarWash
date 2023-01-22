using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LO.CWCS.EFCore;
using LO.CWCS.Entities;
using AutoMapper;
using LO.CWCS.Dtos.Washes;
using LO.CWCS.Dtos.Lookups;

namespace LO.CWCS.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class WashesController : ControllerBase
    {
        #region Data And Const
        private readonly CarWashDbContext _context;
        private readonly IMapper _mapper;

        public WashesController(CarWashDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        #endregion

        #region Services
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WashListDto>>> GetWashes()
        {
            var washes = await _context.Washes.ToListAsync();

            var washDtos = _mapper.Map<List<WashListDto>>(washes);

            return washDtos;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Wash>> GetWash(int id)
        {
            var wash = await _context.Washes.FindAsync(id);

            if (wash == null)
            {
                return NotFound();
            }

            return wash;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> EditWash(int id, Wash wash)
        {
            if (id != wash.Id)
            {
                return BadRequest();
            }

            _context.Entry(wash).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WashExists(id))
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
        public async Task<ActionResult<Wash>> CreateWash(WashDto washDto)
        {
            var wash = _mapper.Map<Wash>(washDto);

            _context.Washes.Add(wash);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWash", new { id = washDto.Id }, washDto);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWash(int id)
        {
            var wash = await _context.Washes.FindAsync(id);
            if (wash == null)
            {
                return NotFound();
            }

            _context.Washes.Remove(wash);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        #endregion

        #region Lookups
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LookupDto>>> GetLookup()
        {
            var washLookup = await _context
                                     .Washes
                                     .Select(w => new LookupDto()
                                     {
                                         Value= w.Id,
                                         Text= w.WashService
                                     })
                                     .ToListAsync();
            return washLookup;
        }
        #endregion

        #region Private Methods
        private bool WashExists(int id)
        {
            return _context.Washes.Any(e => e.Id == id);
        } 
        #endregion
    }
}
