using Blog.Extensions.AutoMapper;
using Blog.IService;
using Blog.Model;
using Blog.Repository.Base;
using Blog.Service;
using Microsoft.EntityFrameworkCore;
using Blog.Extensions.ServiceExtensions;
using Blog.Common;
using Blog.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Swagger Configurations 
builder.Services.AddCustomSwagger();

//CORS
builder.Services.AddCustomCors();

builder.Services.AddAuth();

builder.Services.AddAuthor();

// Database
builder.Services.AddDbContext<BlogDBContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        x => x.MigrationsAssembly("Blog.WebAPI")));

// AutoMapper
builder.Services.AddAutoMapper(typeof(AutoMapperConfig));
AutoMapperConfig.RegisterMappings();

// Services
builder.Services.AddScoped(typeof(IBaseService<,>), typeof(BaseService<,>));
builder.Services.AddScoped(typeof(IArticleService), typeof(ArticleService));
builder.Services.AddScoped(typeof(IUserService), typeof(UserService));
// Repositories
builder.Services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
builder.Services.AddScoped(typeof(IArticleRepository), typeof(ArticleRepository));
builder.Services.AddScoped(typeof(IUserRepository), typeof(UserRepository));

// AppSettings
builder.Services.AddSingleton(new AppSettings(builder.Configuration));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors("AllowSpecificOrigin");

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
