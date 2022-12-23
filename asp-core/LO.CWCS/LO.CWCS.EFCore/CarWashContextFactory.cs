using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using LO.CWCS.EFCore;

public class CarWashContextFactory : IDesignTimeDbContextFactory<CarWashDbContext>
{
    public CarWashDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<CarWashDbContext>();
        optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=CWCS;Trusted_Connection=True;MultipleActiveResultSets=true");

        return new CarWashDbContext(optionsBuilder.Options);
    }
}