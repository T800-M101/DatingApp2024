using System.Text;
using API.Data;
using API.Extentions;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

/* ================ SERVICES AREA ==================== */
builder.Services.AddApplicationServices(builder.Configuration);

builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();

/* ============== MIDDLE WARE AREA ==================*/
// Configure the HTTP request pipeline. 
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200", "https://localhost:4200"));

// Verify if a user is who they say they are
app.UseAuthentication();

// Verify if user is allowed to do what they say they are allowed to do
app.UseAuthorization();

app.MapControllers();

app.Run();
