using Microsoft.AspNetCore.Mvc;
using System.IO;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis;
using System.Collections.Immutable;
using System.Reflection;
using System.Runtime.Loader;
using Microsoft.Extensions.DependencyModel;

namespace AlgorithmAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        private readonly string _baseDirectory;
        private const string DefaultBaseDir = "algorithms";

        public FilesController(IWebHostEnvironment env)
        {
            // Combine with content root path for proper directory resolution
            _baseDirectory = Path.Combine(env.ContentRootPath, DefaultBaseDir);
        }

        // GET api/files/{category}/{algorithm}
        [HttpGet("{category}/{algorithm}")]
        public IActionResult GetAlgorithmFiles(string category, string algorithm)
        {
            var algorithmPath = Path.Combine(_baseDirectory, category, algorithm);

            if (!Directory.Exists(algorithmPath))
                return NotFound($"Algorithm '{algorithm}' not found in category '{category}'.");

            return Ok(GetFilesFromDirectory(algorithmPath));
        }

        private Dictionary<string, object> GetFilesFromDirectory(string directoryPath)
        {
            var files = new Dictionary<string, object>();

            // Get all files and order them with README.md first
            var filePaths = Directory.GetFiles(directoryPath)
                .OrderBy(f => Path.GetFileName(f) == "README.md" ? 0 : 1)  // README first
                .ThenBy(f => Path.GetFileName(f));                          // Then alphabetical

            foreach (var filePath in filePaths)
            {
                var fileName = Path.GetFileName(filePath);
                var fileContent = System.IO.File.ReadAllText(filePath);
                var fileExtension = Path.GetExtension(filePath).ToLower();

                files[fileName] = new
                {
                    name = fileName,
                    code = fileContent,
                    language = fileExtension switch
                    {
                        ".cs" => "csharp",
                        ".js" => "javascript",
                        ".py" => "python",
                        ".md" => "markdown",
                        _ => "plaintext"
                    }
                };
            }

            return files;
        }
        // Add to FilesController.cs
[HttpPost("compile")]
public IActionResult CompileCode([FromBody] CompileRequest request)
{
    var compileResult = CompileCSharpCode(request.Code);
    
    return Ok(new
    {
        success = compileResult.Success,
        errors = compileResult.Diagnostics
            .Where(d => d.Severity == DiagnosticSeverity.Error)
            .Select(d => d.GetMessage())
    });
}

[HttpPost("run")]
public IActionResult RunCode([FromBody] RunRequest request)
{
    var compileResult = CompileCSharpCode(request.Code);
    
    if (!compileResult.Success)
    {
        return BadRequest(new
        {
            success = false,
            errors = compileResult.Diagnostics
                .Where(d => d.Severity == DiagnosticSeverity.Error)
                .Select(d => d.GetMessage())
        });
    }

    try
    {
        var output = ExecuteCompiledCode(compileResult.Compilation);
        return Ok(new
        {
            success = true,
            output
        });
    }
    catch (Exception ex)
    {
        return StatusCode(500, new
        {
            success = false,
            errors = new[] { $"Runtime error: {ex.Message}" }
        });
    }
}

private static (bool Success, ImmutableArray<Diagnostic> Diagnostics, CSharpCompilation Compilation) 
    CompileCSharpCode(string code)
{
    var syntaxTree = CSharpSyntaxTree.ParseText(code);
    
    // Get all runtime assemblies
    var assemblies = DependencyContext.Default.RuntimeLibraries
        .SelectMany(lib => lib.GetDefaultAssemblyNames(DependencyContext.Default))
        .Select(Assembly.Load)
        .Select(asm => MetadataReference.CreateFromFile(asm.Location))
        .ToList();

    // Add essential framework assemblies explicitly
    var coreDir = Directory.GetParent(typeof(object).Assembly.Location)!.FullName;
    var frameworkAssemblies = new[]
    {
        "System.Runtime",
        "System.Console",
        "System.Private.CoreLib",
        "System.Collections",
        "System.Runtime.Extensions"
    };

    foreach (var asmName in frameworkAssemblies)
    {
        var path = Path.Combine(coreDir, $"{asmName}.dll");
        if (System.IO.File.Exists(path))
        {
            assemblies.Add(MetadataReference.CreateFromFile(path));
        }
    }

    var compilation = CSharpCompilation.Create(
        assemblyName: "TempAssembly",
        syntaxTrees: new[] { syntaxTree },
        references: assemblies,
        options: new CSharpCompilationOptions(OutputKind.ConsoleApplication)
            .WithPlatform(Platform.X64));

    using var ms = new MemoryStream();
    var emitResult = compilation.Emit(ms);
    
    return (emitResult.Success, emitResult.Diagnostics, compilation);
}
private static string ExecuteCompiledCode(CSharpCompilation compilation)
{
    using var ms = new MemoryStream();
    if (!compilation.Emit(ms).Success)
        throw new InvalidOperationException("Compilation failed");

    // Create a temporary assembly load context
    var alc = new AssemblyLoadContext("TempContext", isCollectible: true);
    
    TextWriter originalOut = Console.Out; // Move this outside the try block

    try
    {
        ms.Seek(0, SeekOrigin.Begin);
        var assembly = alc.LoadFromStream(ms);
        
        var entryPoint = assembly.EntryPoint 
            ?? throw new InvalidOperationException("No entry point found");

        // Capture console output
        using var sw = new StringWriter();
        Console.SetOut(sw);
        
        // Create execution parameters
        object[]? args = entryPoint.GetParameters().Length > 0 
            ? new object[] { Array.Empty<string>() } 
            : null;

        entryPoint.Invoke(null, args);
        return sw.ToString();
    }
    finally
    {
        Console.SetOut(originalOut); // Now originalOut is always accessible
        alc.Unload(); // Unload the temporary context
    }
}


public class CompileRequest
{
    public string Code { get; set; }
}

public class RunRequest
{
    public string Code { get; set; }
}
    }

    
}