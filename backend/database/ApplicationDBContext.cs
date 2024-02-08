using backend.modules.Stock.Model.Schema;
using Microsoft.EntityFrameworkCore;


namespace backend.database;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
    {
        
    }
    
    public DbSet<Stock> Stocks { get; set; }
}