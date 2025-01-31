using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Configurações do Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers();
builder.Services.AddSwaggerGen(c => 
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Algorithm API", Version = "v1" });
});

// CORS
builder.Services.AddCors(options => 
{
    options.AddPolicy("ReactPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// Middlewares
app.UseSwagger();
app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Algorithm API v1"));
app.UseCors("ReactPolicy");
app.MapControllers();
app.MapControllers();

app.Use(async (context, next) =>
{
    // Validate code
    if (context.Request.Path.StartsWithSegments("/api/algorithms"))
    {
        var request = context.Request;
        request.EnableBuffering();
        var body = await new StreamReader(request.Body).ReadToEndAsync();
        request.Body.Position = 0;

        if (body.Contains("File.") || body.Contains("Process."))
        {
            context.Response.StatusCode = 400;
            await context.Response.WriteAsync("Código não permitido");
            return;
        }
    }
    await next();
});

app.Run();


