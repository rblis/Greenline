using backend.database;
using backend.modules.Stock.Model.Repository;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDbContext>(options => {
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
    options.UseSnakeCaseNamingConvention();
});
builder.Services.AddCors(options =>
    {
        options.AddPolicy(
            name: "whitelist",
            policy =>
            {
                policy.WithOrigins("127.0.0.1:3000").AllowAnyHeader().AllowAnyOrigin();
            }
        );
    }
);
builder.Services.AddScoped<StockRepo>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("whitelist");
}


app.UseHttpsRedirection();
//maps to swagger 
app.MapControllers();

app.Run();