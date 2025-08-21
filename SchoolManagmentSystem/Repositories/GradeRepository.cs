using SchoolManagmentSystem.Models;
using SchoolManagmentSystem.Repositories.Interfaces;

namespace SchoolManagmentSystem.Repositories
{
    public class GradeRepository : Repository<Grade>, IGradeRepository
    {
        public GradeRepository(SchoolMSContext context) : base(context) { }
    }
}
