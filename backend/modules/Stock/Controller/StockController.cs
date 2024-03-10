using backend.database;
using backend.modules.Stock.Model.Hydrator;
using backend.modules.Stock.Model.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.modules.Stock.Controller;

[Route("stock")]
[ApiController]
public class StockController : ControllerBase
{
    private readonly StockRepo repo;
    
    
    public StockController(StockRepo repo)
    {
        this.repo = repo;
    }
    
    [HttpGet]
    public async Task<IActionResult> getAllStocks()
    {
        var stocks = await repo.getAllStocks();
        var stockDTO = stocks.Select(s => s.hydrateStock());
        return Ok(stockDTO);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> getStockById([FromRoute] int id)
    {
        var stocks = await repo.getStockById(id);
        
        return stocks == null ? NotFound() : Ok(stocks.hydrateStock());
    }
} 