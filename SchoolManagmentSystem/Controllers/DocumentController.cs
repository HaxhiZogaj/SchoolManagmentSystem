using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SchoolManagmentSystem.Models;
using Syncfusion.DocIO;
using EJ2DocumentEditor = Syncfusion.EJ2.DocumentEditor;


namespace SchoolManagmentSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DocumentController : ControllerBase
    {
        private IHostEnvironment hostEnvironment;
        private readonly SchoolMSContext _context; // Add your EF Core DbContext here

        public DocumentController(IHostEnvironment environment, SchoolMSContext context)
        {
            this.hostEnvironment = environment;
            _context = context;

        }


   
        [HttpPost("Import")]
        public IActionResult Import([FromForm] IFormCollection data)
        {
            if (data.Files.Count == 0)
                return BadRequest("No files uploaded");

            try
            {
                Stream stream = new MemoryStream();
                IFormFile file = data.Files[0];
                string extension = Path.GetExtension(file.FileName);
                file.CopyTo(stream);
                stream.Position = 0;

                var document = EJ2DocumentEditor.WordDocument.Load(stream, GetFormatType(extension));
                string json = JsonConvert.SerializeObject(document);
                document.Dispose();

                return Ok(json);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }



        internal static EJ2DocumentEditor.FormatType GetFormatType(string fileName)
        {
            int index = fileName.LastIndexOf('.');
            string format = index > -1 && index < fileName.Length - 1 ? fileName.Substring(index + 1) : "";

            if (string.IsNullOrEmpty(format))
                throw new NotSupportedException("EJ2 Document editor does not support this file format.");
            switch (format.ToLower())
            {
                case "dotx":
                case "docx":
                case "docm":
                case "dotm":
                    return EJ2DocumentEditor.FormatType.Docx;
                case "dot":
                case "doc":
                    return EJ2DocumentEditor.FormatType.Doc;
                case "rtf":
                    return EJ2DocumentEditor.FormatType.Rtf;
                case "txt":
                    return EJ2DocumentEditor.FormatType.Txt;
                case "xml":
                    return EJ2DocumentEditor.FormatType.WordML;
                default:
                    throw new NotSupportedException($"EJ2 Document editor does not support this file format: {format}");
            }
        }

        internal static Syncfusion.DocIO.FormatType GetDocIOFomatType(EJ2DocumentEditor.FormatType type)
        {
            switch (type)
            {
                case EJ2DocumentEditor.FormatType.Docx:
                    return FormatType.Docx;
                case EJ2DocumentEditor.FormatType.Doc:
                    return FormatType.Doc;
                case EJ2DocumentEditor.FormatType.Rtf:
                    return FormatType.Rtf;
                case EJ2DocumentEditor.FormatType.Txt:
                    return FormatType.Txt;
                case EJ2DocumentEditor.FormatType.WordML:
                    return FormatType.WordML;
                default:
                    throw new NotSupportedException("DocIO does not support this file format.");
            }
        }

        public class DocumentInfo
        {
            public int FileIndex { get; set; }
            public string FileName { get; set; }
        }

        public class CustomParams
        {
            public string fileName
            {
                get;
                set;
            }
        }

    }
}
