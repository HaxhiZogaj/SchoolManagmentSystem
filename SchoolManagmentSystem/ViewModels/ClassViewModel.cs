namespace SchoolManagmentSystem.ViewModels
{
    public class ClassViewModel
    {
        public int ClassId { get; set; }

        public string ClassName { get; set; }

        public string Section { get; set; }

        public string AcademicYear { get; set; }

        public int? HomeroomTeacherId { get; set; }

        public string? TeacherFirstName { get; set; }
    }
}
