using SchoolManagmentSystem.Models;
using SchoolManagmentSystem.Repositories.Interfaces;

namespace SchoolManagmentSystem.Repositories
{
    public class ParentRepository : Repository<Parent>, IParentRepository
    {
        public ParentRepository(SchoolMSContext context) : base(context) { }
    }
}
