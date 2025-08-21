using SchoolManagmentSystem.Models;
using SchoolManagmentSystem.Repositories.Interfaces;

namespace SchoolManagmentSystem.Repositories
{
    public class HomeworkSumbissionRepository : Repository<HomeworkSubmission>, IHomeworkSubmissionRepository
    {
        public HomeworkSumbissionRepository(SchoolMSContext context) : base(context) { }
    }

}
