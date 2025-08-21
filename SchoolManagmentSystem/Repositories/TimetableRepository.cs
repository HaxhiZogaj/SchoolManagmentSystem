using SchoolManagmentSystem.Models;
using SchoolManagmentSystem.Repositories.Interfaces;

namespace SchoolManagmentSystem.Repositories
{
    public class TimetableRepository : Repository<Timetable>, ITimetableRepository
    {
        public TimetableRepository(SchoolMSContext context) : base(context) { }
    }
}
