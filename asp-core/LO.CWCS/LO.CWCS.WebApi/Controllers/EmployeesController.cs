using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LO.CWCS.EFCore;
using LO.CWCS.Entities;
using AutoMapper;
using LO.CWCS.Dtos.Employees;
using LO.CWCS.Dtos.Lookups;

namespace LO.CWCS.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        #region Data And Const
        private readonly CarWashDbContext _context;
        private readonly IMapper _mapper;
        

        public EmployeesController(CarWashDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            
        }
        #endregion

        #region Services
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeListDto>>> GetEmployees()
        {
                var employees = await _context.Employees.ToListAsync();

                var employeeDtos = _mapper.Map<List<EmployeeListDto>>(employees);

            return employeeDtos;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeDto>> GetEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            var employeeDto = _mapper.Map<EmployeeDto>(employee);

            return employeeDto;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> EditEmployee(int id, EmployeeDto employeeDto)
        {
            if (id != employeeDto.Id)
            {
                return BadRequest();
            }

            var employee = _mapper.Map<Employee>(employeeDto);

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
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
        public async Task<ActionResult> CreateEmployee(EmployeeDto employeeDto)
        {
            
                var employee = _mapper.Map<Employee>(employeeDto);

                _context.Employees.Add(employee);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetEmployee", new { id = employeeDto.Id }, employeeDto);
            

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        #endregion

        #region Lookups
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LookupDto>>> GetLookup()
        {
            var employeeLookup = await _context
                                           .Employees
                                           .Select(e => new LookupDto()
                                           {
                                               Value= e.Id,
                                               Text= e.FullName
                                           })
                                           .ToListAsync();
            return employeeLookup;
        }
        #endregion

        #region Private Methods
        private bool EmployeeExists(int id)
        {
            return _context.Employees.Any(e => e.Id == id);
        } 
        #endregion
    }
}
