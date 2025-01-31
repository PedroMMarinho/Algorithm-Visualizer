using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Scripting;
using Microsoft.CodeAnalysis.Scripting;

[ApiController]
[Route("api/algorithms")]
public class AlgorithmController : ControllerBase
{
    [HttpPost("execute")]
    public async Task<IActionResult> ExecuteAlgorithm([FromBody] AlgorithmRequest request)
    {
        try
        {
            // Configuração segura para execução de scripts
            var options = ScriptOptions.Default
                .AddReferences(typeof(Convert).Assembly)
                .AddImports("System");

            // Redirecionar saída do Console
            var output = new StringWriter();
            Console.SetOut(output);

            // Executar código
            var script = CSharpScript.Create(request.Code, options);
            var result = await script.RunAsync();

            return Ok(new
            {
                Result = result?.ReturnValue,
                Logs = output.ToString().Split('\n').Where(l => !string.IsNullOrEmpty(l))
            });
        }
        catch (CompilationErrorException ex)
        {
            return BadRequest(new { Errors = ex.Diagnostics });
        }
    }
}

public class AlgorithmRequest
{
    public string Code { get; set; } = string.Empty;
}
