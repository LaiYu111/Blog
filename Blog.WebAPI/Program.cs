using Blog.Extensions.AutoMapper;
using Blog.IService;
using Blog.Model;
using Blog.Repository.Base;
using Blog.Service;
using Microsoft.EntityFrameworkCore;
using Blog.Extensions.ServiceExtensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ÃÌº”swaggerŒƒµµ≈‰÷√
builder.Services.AddCustomSwagger();

// database
builder.Services.AddDbContext<BlogDBContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        x => x.MigrationsAssembly("Blog.WebAPI")));

// AutoMapper
builder.Services.AddAutoMapper(typeof(AutoMapperConfig));
AutoMapperConfig.RegisterMappings();

// Services
builder.Services.AddScoped(typeof(IBaseService<,>), typeof(BaseService<,>));
// Repository
builder.Services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));




var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
