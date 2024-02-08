using System.ComponentModel.DataAnnotations.Schema;

namespace backend.modules.Stock.Model.Schema;

public class Stock
{
    public int Id { get; set; }
    
    [Column(TypeName = "decimal(18,2)")]
    public int Price { get; set; }
    
    public string Name { get; set; } = string.Empty;
    
    public string Symbol { get; set; } = string.Empty;
}