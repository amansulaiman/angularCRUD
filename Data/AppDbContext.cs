using angular.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.InMemory.Storage.Internal;

namespace angular.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public virtual DbSet<PaymentDetail> PaymentDetails { get; set; }
        public virtual DbSet<User> Users { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PaymentDetail>().HasData(
                new PaymentDetail(){
                    CVV = "343",
                CardNumber = "123456789012345",
                CardOwner = "Abdulrahman Sulaiman",
                ExpDate = "22/09",
                Id = "9addcc5c-7327-4aaa-a5a2-3ebcb840ae21" 
                }
            );
        }
    }
}