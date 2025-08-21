namespace SchoolManagmentSystem.ViewModels
{
    public class StudentViewModel
    {
        public int StudentId { get; set; }

        public int UserId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateOnly? DateOfBirth { get; set; }

        public string Gender { get; set; } 

        public string Address { get; set; }

        public string PhoneNumber { get; set; }

        public DateOnly? EnrollmentDate { get; set; }

        public int? ParentId { get; set; }


        public string? Username { get; set; }
        public string? ParentFirstName { get; set; }
    }
}
