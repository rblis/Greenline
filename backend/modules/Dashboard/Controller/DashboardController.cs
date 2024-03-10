using backend.database;
using backend.modules.Stock.Model.Hydrator;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using backend.modules.Dashboard.Model.DTO;

namespace backend.modules.Dashboard.Controller;

[Route("Dashboard")]
[ApiController]
public class DashboardController : ControllerBase
{
    private readonly ApplicationDbContext db;

    public DashboardController(ApplicationDbContext db)
    {
        this.db = db;
    }
    
    [HttpGet("Portfolio")]
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

    [HttpGet("Search/{query}")]
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
    
    [HttpGet("Overview/{query}")]
    public IActionResult fetchStockOverview([FromRoute] string query)
    {
        System.Diagnostics.Debug.WriteLine($"Received overview request for {query}");
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
            var result = client.SendAsync(request).Result;
            result.EnsureSuccessStatusCode();
            var stockOverviewDetails = JsonSerializer.Deserialize<JsonElement>(
                result.Content.ReadAsStringAsync().Result);
            var responseString = stockOverviewDetails.GetProperty("body");
            var response = JsonSerializer.Deserialize<List<StockOverviewDTO>>(responseString);
            return Ok(response);
        }
    }

    [HttpGet("HistoricalPrices/{query}")]
    public IActionResult fetchHistoricalPrices([FromRoute] string query)
    {
        using (var client = new HttpClient())
        {
            var request = new HttpRequestMessage()
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri($"https://mboum-finance.p.rapidapi.com/v1/markets/stock/history?symbol={query}&interval=15m&diffandsplits=false"),
                Headers =
                {
                    { "X-RapidAPI-Key", "19eaceee83msh17a42ce61ffed43p135b50jsnb69e2cdbe427" },
                    { "X-RapidAPI-Host", "mboum-finance.p.rapidapi.com" },
                },
            };
            var result = client.SendAsync(request).Result;
            result.EnsureSuccessStatusCode();
            var stockHistoricalPrices = JsonSerializer.Deserialize<JsonElement>(
                result.Content.ReadAsStringAsync().Result);
            var responseString = stockHistoricalPrices.GetProperty("body");
            //var convertedString = '[' + responseString.Substring(1, responseString.Length - 2) + ']';
            //var response = JsonSerializer.Deserialize<Dictionary<string, HistoricalPriceDTO>>(responseString);
            
            List<HistoricalPriceDTO> response = new List<HistoricalPriceDTO>();
            foreach (JsonProperty property in responseString.EnumerateObject())
            {
                response.Add(JsonSerializer.Deserialize<HistoricalPriceDTO>(property.Value));
            }
            
            return Ok(response);
        }
    }
}