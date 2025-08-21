using SchoolManagmentSystem.Models;
using SchoolManagmentSystem.Repositories.Interfaces;

namespace SchoolManagmentSystem.Repositories
{
    public class DepartmentRepository : Repository<Department>, IDepartmentRepository
    {
        public DepartmentRepository(SchoolMSContext context) : base(context) { }
    }
}
