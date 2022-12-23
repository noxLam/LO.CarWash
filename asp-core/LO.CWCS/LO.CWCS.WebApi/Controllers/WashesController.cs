using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LO.CWCS.EFCore;
using LO.CWCS.Entities;

namespace LO.CWCS.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class WashesController : ControllerBase
    {
        #region Data And Const
        private readonly CarWashDbContext _context;

        public WashesController(CarWashDbContext context)
        {
            _context = context;
        }
        #endregion

        #region Services
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Wash>>> GetWashes()
        {
            return await _context.Washes.ToListAsync();
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
        public async Task<ActionResult<Wash>> CreateWash(Wash wash)
        {
            _context.Washes.Add(wash);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWash", new { id = wash.Id }, wash);
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

        #region Private Methods
        private bool WashExists(int id)
        {
            return _context.Washes.Any(e => e.Id == id);
        } 
        #endregion
    }
}
