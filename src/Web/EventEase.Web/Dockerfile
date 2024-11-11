#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/Web/EventEase.Web/EventEase.Web.csproj", "src/Web/EventEase.Web/"]
RUN dotnet restore "./src/Web/EventEase.Web/EventEase.Web.csproj"
COPY . .
WORKDIR "/src/src/Web/EventEase.Web"
RUN dotnet build "./EventEase.Web.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM node:12.18-alpine AS client 
ARG skip_client_build=false 
WORKDIR /app 
COPY ["src/Web/EventEase.Web/ClientApp/", "."]
RUN  if [ "$skip_client_build" = "true" ] ; then echo "Skipping npm install" ; else npm install ; fi
RUN  if [ "$skip_client_build" = "true" ] ; then mkdir -p dist ; else npm run-script build -- --prod ; fi

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./EventEase.Web.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
ENV ASPNETCORE_URLS http://*:8080

COPY --from=publish /app/publish .
COPY --from=client /app/dist /app/ClientApp/dist
ENTRYPOINT ["dotnet", "EventEase.Web.dll"]