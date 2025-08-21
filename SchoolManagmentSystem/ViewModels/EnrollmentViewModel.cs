namespace SchoolManagmentSystem.ViewModels
{
    public class EnrollmentViewModel
    {

        public int EnrollmentId { get; set; }

        public int StudentId { get; set; }
        public string? StudentFirstName { get; set; }  

        public int ClassId { get; set; }
        public string? ClassName { get; set; }  

        public DateTime? EnrollmentDate { get; set; }

        public string Status { get; set; }
    }
}
