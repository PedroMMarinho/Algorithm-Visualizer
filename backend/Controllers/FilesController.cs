using Microsoft.AspNetCore.Mvc;
using System.IO;

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
    }
}