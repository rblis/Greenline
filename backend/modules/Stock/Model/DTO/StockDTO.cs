namespace backend.modules.Stock.Model.DTO;

public class StockDTO
{
    public int Id { get; set; }
    public int Price { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Symbol { get; set; } = string.Empty;
}