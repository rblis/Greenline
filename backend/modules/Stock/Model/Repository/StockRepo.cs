using backend.database;
using Microsoft.EntityFrameworkCore;

namespace backend.modules.Stock.Model.Repository;

public class StockRepo
{
    private readonly ApplicationDbContext db;

    public StockRepo(ApplicationDbContext db)
    {
        this.db = db;
    }

    public async Task<List<Schema.Stock>> getAllStocks()
    {
        return await db.Stocks.ToListAsync();
    }

    public async Task<Schema.Stock?> getStockById(int id)
    {
        return await db.Stocks.FindAsync(id);
    }
}