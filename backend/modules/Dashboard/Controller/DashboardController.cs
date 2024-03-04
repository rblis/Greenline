using backend.database;
using backend.modules.Stock.Model.Hydrator;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;

namespace backend.modules.Dashboard.Controller;

[Route("dashboard")]
[ApiController]
public class DashboardController : ControllerBase
{
    private readonly ApplicationDbContext db;

    public DashboardController(ApplicationDbContext db)
    {
        this.db = db;
    }
    
    [HttpGet("portfolio")]
    public IActionResult fetchPortfolio()
    {
        var stocks = db.Stocks.ToList().Select(s => s.hydrateStock());
        var columns = typeof(Stock.Model.Schema.Stock).GetProperties().Select(pp =>
        {
            return new Dictionary<string, string>
            {
                { "header", pp.Name },
                { "accessorKey", pp.Name.ToLower() }
            };
        }).ToArray();
        var response = new Dictionary<string, object>
        {
            {"rawData" , stocks},
            {"columns", columns}
        };
        
        return Ok(response);
    }

    [HttpGet("search/{query}")]
    public IActionResult fetchSearchResults([FromRoute] string query)
    {
        System.Diagnostics.Debug.WriteLine($"Received search request for {query}");
        using (var client = new HttpClient())
        {
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri($"https://mboum-finance.p.rapidapi.com/v1/markets/search?search={query}"),
                Headers =
                {
                    { "X-RapidAPI-Key", "19eaceee83msh17a42ce61ffed43p135b50jsnb69e2cdbe427" },
                    { "X-RapidAPI-Host", "mboum-finance.p.rapidapi.com" },
                },
            };
            var response = client.SendAsync(request).Result;
            response.EnsureSuccessStatusCode();
            var json = response.Content.ReadAsStringAsync().Result;
            return Ok(json);
        }
    }
    
    [HttpGet("overview/{query}")]
    public IActionResult fetchStockOverview([FromRoute] string query)
    {
        System.Diagnostics.Debug.WriteLine($"Received search request for {query}");
        using (var client = new HttpClient())
        {
            var request = new HttpRequestMessage()
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri($"https://mboum-finance.p.rapidapi.com/v1/markets/stock/quotes?symbol={query}"),
                Headers =
                {
                    { "X-RapidAPI-Key", "19eaceee83msh17a42ce61ffed43p135b50jsnb69e2cdbe427" },
                    { "X-RapidAPI-Host", "mboum-finance.p.rapidapi.com" },
                },
            };
            var response = client.SendAsync(request).Result;
            response.EnsureSuccessStatusCode();
            var json = response.Content.ReadAsStringAsync().Result;
            return Ok(json);
        }
    }
}