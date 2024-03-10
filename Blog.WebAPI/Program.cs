using Blog.IService;
using Blog.Repository.Base;
using Blog.Service;
using Blog.Extension;
using Autofac.Extensions.DependencyInjection;
using Autofac;
using Blog.Common;
using Blog.Extension.ServiceExtensions;
using Blog.Extension.AutoMapper;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory())
    .ConfigureContainer<ContainerBuilder>(builder =>
    {
        builder.RegisterModule<AutofacModuleRegister>();
        //builder.RegisterModule<AutofacPropertityModuleReg>();
    });

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ÃÌº”swaggerŒƒµµ≈‰÷√
builder.Services.AddCustomSwagger();

// AutoMapper
builder.Services.AddAutoMapper(typeof(AutoMapperConfig));
AutoMapperConfig.RegisterMappings();

// AppSettings
builder.Services.AddSingleton(new AppSettings(builder.Configuration));

//builder.Services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
//builder.Services.AddScoped(typeof(IBaseService<,>), typeof(BaseService<,>));

// ª∫¥Ê
builder.Services.AddCacheSetup();

// ORM
builder.Services.AddSqlSugarSetup();

// CORS
builder.Services.AddCustomCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowSpecificOrigin");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
