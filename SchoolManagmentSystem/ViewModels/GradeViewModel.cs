namespace SchoolManagmentSystem.ViewModels
{
    public class GradeViewModel
    {
        public int GradeId { get; set; }

        public int EnrollmentId { get; set; }

        public int ClassSubjectId { get; set; }

        public DateOnly? ExamDate { get; set; }

        public decimal? Score { get; set; }

        public string Grade1 { get; set; }


        public string? EnrollmentStatus { get; set; }     
        public string? ClassSubjectName { get; set; }
    }
}
