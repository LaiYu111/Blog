#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Blog.WebAPI/Blog.WebAPI.csproj", "Blog.WebAPI/"]
COPY ["Blog.Common/Blog.Common.csproj", "Blog.Common/"]
COPY ["Blog.Extensions/Blog.Extensions.csproj", "Blog.Extensions/"]
COPY ["Blog.Model/Blog.Model.csproj", "Blog.Model/"]
COPY ["Blog.IService/Blog.IService.csproj", "Blog.IService/"]
COPY ["Blog.Repository/Blog.Repository.csproj", "Blog.Repository/"]
COPY ["Blog.Service/Blog.Service.csproj", "Blog.Service/"]
RUN dotnet restore "./Blog.WebAPI/./Blog.WebAPI.csproj"
COPY . .
WORKDIR "/src/Blog.WebAPI"
RUN dotnet build "./Blog.WebAPI.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Blog.WebAPI.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Blog.WebAPI.dll"]