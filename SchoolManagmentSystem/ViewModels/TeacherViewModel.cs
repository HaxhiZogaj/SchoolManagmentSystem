namespace SchoolManagmentSystem.ViewModels
{
    public class TeacherViewModel
    {
        public int TeacherId { get; set; }

        public int UserId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateOnly? DateOfBirth { get; set; }

        public string Gender { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public DateOnly? HireDate { get; set; }

        public int? DepartmentId { get; set; }


     
        public string? DepartmentName { get; set; }
        public string? Username { get; set; }
    }
}
