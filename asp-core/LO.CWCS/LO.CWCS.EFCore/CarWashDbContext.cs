using LO.CWCS.Entities;
using LO.CWCS.Entities.Cars;
using LO.CWCS.Entities.Customers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LO.CWCS.EFCore
{
    public class CarWashDbContext : DbContext
    {
        public DbSet<Car> Cars { get; set; }
        public DbSet<Card> Cards { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Wash> Washes { get; set; }

        public DbSet<UploaderImage> UploaderImages { get; set; }
        public DbSet<CustomerImage> CustomerImages { get; set; }
        public DbSet<CarImage> CarImages { get; set; }
        public CarWashDbContext(DbContextOptions<CarWashDbContext> options)
        : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Car>()
                         .HasIndex(c => c.PlateNumber)
                         .IsUnique();

            modelBuilder.Entity<UploaderImage>().UseTpcMappingStrategy()
                .ToTable("UploaderImages");

            modelBuilder.Entity<CustomerImage>()
                .ToTable("CustomerImages");

            modelBuilder.Entity<CarImage>()
                .ToTable("CarImages");
        }
    }
}
