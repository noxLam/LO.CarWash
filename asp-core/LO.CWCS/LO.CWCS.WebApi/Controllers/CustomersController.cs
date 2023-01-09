using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LO.CWCS.EFCore;
using LO.CWCS.Entities;
using AutoMapper;
using LO.CWCS.Dtos.Customers;
using LO.CWCS.Dtos.Lookups;

namespace LO.CWCS.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        #region Data And Const
        private readonly CarWashDbContext _context;
        private readonly IMapper _mapper;

        public CustomersController(CarWashDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        #endregion

        #region Services
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomerListDto>>> GetCustomers()
        {
            var customers = await _context.Customers.ToListAsync();
            var customerDtos = _mapper.Map<List<CustomerListDto>>(customers);
            return customerDtos;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerDetailsDto>> GetCustomer(int id)
        {
            var customer = await _context.Customers
                                             .Include(c => c.Cars)
                                             .SingleOrDefaultAsync(c => c.Id == id);

            if (customer == null)
            {
                return NotFound();
            }

            var cutomerDto = _mapper.Map<CustomerDetailsDto>(customer);

            return cutomerDto;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerDto>> GetEditCustomer(int id)
        {
            var customer = await _context
                                     .Customers
                                     .Include(c => c.Cars)
                                     .SingleOrDefaultAsync(c => c.Id == id);
            if(customer == null)
            {
                return NotFound();
            }

            var customerDto = _mapper.Map<CustomerDto>(customer);
            return customerDto;

        }


        [HttpPut("{id}")]
        public async Task<IActionResult> EditCustomer(int id, CustomerDto customerDto)
        {
            if (id != customerDto.Id)
            {
                return BadRequest();
            }

            var customer = _mapper.Map<Customer>(customerDto);
            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

                await UpdateCustomerCars(customerDto.CarIds, customerDto.Id);

                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
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
        public async Task<ActionResult<Customer>> CreateCustomer(CustomerDto customerDto)
        {
            var customer = _mapper.Map<Customer>(customerDto);
            await AddCarsToCustomer(customerDto.CarIds, customer);

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            customerDto.Id = customer.Id;

            return CreatedAtAction("GetCustomer", new { id = customer.Id }, customerDto);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        #endregion

        #region Lookups
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LookupDto>>> GetLookup()
        {
            var customerLookup = await _context
                                         .Customers
                                         .Select(customer => new LookupDto()
                                         {
                                             Value = customer.Id,
                                             Text = customer.FullName
                                         })
                                         .ToListAsync();
            return customerLookup;
        } 
        #endregion

        #region Private Methods
        private bool CustomerExists(int id)
        {
            return _context.Customers.Any(e => e.Id == id);
        }


        private async Task AddCarsToCustomer(List<int> carIds, Customer customer)
        {
            var cars = await _context.Cars.Where(c => carIds.Contains(c.Id)).ToListAsync();
            if (cars.Any())
            {
                customer.Cars.AddRange(cars);
            }
        }

        private async Task UpdateCustomerCars(List<int> carIds, int customerId)
        {
            var customer = await _context.Customers.Include(c => c.Cars).SingleAsync(c => c.Id == customerId);
            customer.Cars.Clear();

            var cars = await _context.Cars.Where(c => carIds.Contains(c.Id)).ToListAsync();
            if(cars.Any())
            {
                customer.Cars.AddRange(cars);
            }
        }

        #endregion
    }
}
