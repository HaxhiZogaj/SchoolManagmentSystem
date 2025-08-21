using SchoolManagmentSystem.Models;
using SchoolManagmentSystem.Repositories.Interfaces;

namespace SchoolManagmentSystem.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(SchoolMSContext context) : base(context) { }
    }
}
