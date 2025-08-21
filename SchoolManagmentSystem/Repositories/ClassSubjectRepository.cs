using SchoolManagmentSystem.Models;
using SchoolManagmentSystem.Repositories.Interfaces;

namespace SchoolManagmentSystem.Repositories
{
    public class ClassSubjectRepository : Repository<ClassSubject>, IClassSubjectRepository
    {
        public ClassSubjectRepository(SchoolMSContext context) : base(context) { }
    }
}
