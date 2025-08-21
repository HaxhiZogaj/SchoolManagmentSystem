using SchoolManagmentSystem.Models;
using SchoolManagmentSystem.Repositories.Interfaces;

namespace SchoolManagmentSystem.Repositories
{
    public class HomeworkRepository : Repository<Homework>, IHomeworkRepository
    {
        public HomeworkRepository(SchoolMSContext context) : base(context) { }
    }
}
