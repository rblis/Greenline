using backend.modules.Stock.Model.DTO;
using backend.modules.Stock.Model.Schema;

namespace backend.modules.Stock.Model.Hydrator;

public static class StockHydrator
{
    public static StockDTO hydrateStock(this Schema.Stock stockModel)
    {
        return new StockDTO
        {
            Id = stockModel.Id,
            Name = stockModel.Name,
            Symbol = stockModel.Symbol,
            Price = stockModel.Price
        };
    }
}