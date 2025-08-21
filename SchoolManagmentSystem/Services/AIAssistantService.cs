using Microsoft.EntityFrameworkCore;
using SchoolManagmentSystem.Models;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

public class AIAssistantService
{
    private  SchoolMSContext _context;
    private readonly HttpClient _httpClient;
    private readonly string _openAiApiKey;

    public AIAssistantService(IConfiguration config,SchoolMSContext context)
    {
        _httpClient = new HttpClient();
        _openAiApiKey = config["OpenAI:ApiKey"];
        _context = context;
    }



    public async Task<List<Dictionary<string, object>>> ExecuteSQL(string sql)

    {
        var result = new List<Dictionary<string, object>>();

        using (var command = _context.Database.GetDbConnection().CreateCommand())
        {
            command.CommandText = sql;
            await _context.Database.OpenConnectionAsync();

            using (var reader = await command.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    var row = new Dictionary<string, object>();
                    for (int i = 0; i < reader.FieldCount; i++)
                    {
                        row[reader.GetName(i)] = reader.GetValue(i);
                    }
                    result.Add(row);
                }
            }

            await _context.Database.CloseConnectionAsync();
        }

        return result;
    }



    public string FormatResult(List<Dictionary<string, object>> result)
    {
        if (result == null || result.Count == 0)
            return "No data found.";

        var formatted = new StringBuilder();

        foreach (var row in result)
        {
            foreach (var kv in row)
            {
                formatted.AppendLine($"{kv.Key}: {kv.Value}");
            }
            formatted.AppendLine("-----");
        }

        return formatted.ToString();
    }

    public async Task<string> GenerateSQLFromQuestion(string question)
    {
        var schema = @"
Tables:
- Students(StudentID, Name, Email)
- Grades(GradeID, StudentID, SubjectID, Score, Semester)
- Subjects(SubjectID, Name)
- Enrollments(EnrollmentID, StudentID, ClassID)
- Classes(ClassID, ClassName, AcademicYear)
";

        var prompt = $"User asked: \"{question}\". Based on this schema:\n{schema}\nGenerate a SQL query to answer this.";

        var requestBody = new
        {
            model = "gpt-3.5-turbo",
            messages = new[]
            {
                new { role = "system", content = "You are a helpful assistant that writes SQL queries based on school database questions." },
                new { role = "user", content = prompt }
            }
        };

        var content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");
        _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", _openAiApiKey);

        var response = await _httpClient.PostAsync("https://api.openai.com/v1/chat/completions", content);
        var responseJson = await response.Content.ReadAsStringAsync();

        using var doc = JsonDocument.Parse(responseJson);
        var sql = doc.RootElement
            .GetProperty("choices")[0]
            .GetProperty("message")
            .GetProperty("content")
            .GetString();

        return sql;
    }
}