namespace SchoolManagmentSystem.ViewModels
{
    public class HomeworkViewModel
    {
        public int HomeworkId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime DueDate { get; set; }

        public int ClassSubjectId { get; set; }

        public DateTime? CreatedAt { get; set; }


        public string? ClassSubjectName { get; set; }

    }
}
