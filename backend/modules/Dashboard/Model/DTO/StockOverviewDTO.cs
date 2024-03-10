using System.Text.Json.Serialization;

namespace backend.modules.Dashboard.Model.DTO;

public class StockOverviewDTO
{
    [JsonPropertyName("ask")]
    public double? Ask { get; set; }
    [JsonPropertyName("bid")]
    public double? Bid { get; set; }
    [JsonPropertyName("displayName")]
    public string? DisplayName { get; set; }
    [JsonPropertyName("epsCurrentYear")]
    public double? EPSCurrentYear { get; set; }
    [JsonPropertyName("epsTrailingTwelveMonths")]
    public double? EPSTrailingTwelveMonths { get; set; }
    [JsonPropertyName("fiftyDayAverage")]
    public double? FiftyDayAverage { get; set; }
    [JsonPropertyName("fiftyDayAverageChangePercent")]
    public double? FiftyDayAverageChangePercent { get; set; }
    [JsonPropertyName("fiftyTwoWeekRange")]
    public string? FiftyTwoWeekRange { get; set; }
    [JsonPropertyName("marketCap")]
    public double? MarketCap { get; set; }
}

