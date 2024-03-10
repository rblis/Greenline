using System.Text.Json.Serialization;

namespace backend.modules.Dashboard.Model.DTO;

public class HistoricalPriceDTO
{
    [JsonPropertyName("date")]
    public string? Date { get; set; }
    [JsonPropertyName("date_utc")]
    public int? DateUTC { get; set; }
    [JsonPropertyName("open")]
    public Double? Open { get; set; }
    [JsonPropertyName("high")]
    public Double? High { get; set; }
    [JsonPropertyName("low")]
    public Double? Low { get; set; }
    [JsonPropertyName("close")]
    public Double? Close { get; set; }
    [JsonPropertyName("volume")]
    public Double? Volume { get; set; }
}