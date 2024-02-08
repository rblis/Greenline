using backend.database;
using backend.modules.Stock.Model.Hydrator;
using Microsoft.AspNetCore.Mvc;

namespace backend.modules.Stock.Controller;

[Route("stock")]
[ApiController]
public class StockController : ControllerBase
{
    private readonly ApplicationDbContext db;
    
    
    public StockController(ApplicationDbContext db)
    {
        this.db = db;
    }
    
    [HttpGet]
    public IActionResult getAllStocks()
    {
        var stocks = db.Stocks.ToList().Select(s => s.hydrateStock());
        return Ok(stocks);
    }

    [HttpGet("{id}")]
    public IActionResult getById([FromRoute] int id)
    {
        var stocks = db.Stocks.Find(id);
        
        return stocks == null ? NotFound() : Ok(stocks.hydrateStock());
    }
}