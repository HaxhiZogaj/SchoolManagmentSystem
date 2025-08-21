using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace SchoolManagmentSystem.ViewModels
{
    public class HomeworkSubmissionViewModel
    {

        public int SubmissionId { get; set; }

        public int HomeworkId { get; set; }

        public int StudentId { get; set; }

        public string FilePath { get; set; }

        public DateTime? SubmittedAt { get; set; }

        public string Status { get; set; }

        public decimal? Grade { get; set; }


        public string? StudentFirstName { get; set; }

        public string? TitleName { get; set; }

        public IFormFile? File { get; set; }

    }
}