namespace SchoolManagmentSystem.ViewModels
{
    public class TimetableViewModel
    {
        public int TimetableId { get; set; }

        public int ClassSubjectId { get; set; }

        public string DayOfWeek { get; set; }

        public TimeOnly StartTime { get; set; }

        public TimeOnly EndTime { get; set; }

        public string RoomNumber { get; set; }


        //public string? SubjectName { get; set; }

        public string? ClassSubjectName { get; set; }
    }
}
