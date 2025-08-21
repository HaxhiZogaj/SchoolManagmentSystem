using SchoolManagmentSystem.DTOs;
using SchoolManagmentSystem.ViewModels;

namespace SchoolManagmentSystem.Services.Interfaces
{
    public interface IHomeworkSubmissionService
    {
        Task<List<HomeworkSubmissionViewModel>> GetAllAsync();
        Task<HomeworkSubmissionViewModel> GetByIdAsync(int id);
        Task AddAsync(HomeworkSubmissionViewModel model);
        Task UpdateAsync(HomeworkSubmissionViewModel model);
        Task DeleteAsync(int id);
        Task<List<HomeworkDto>> GetHomeworkDropdownAsync();
        Task<List<StudentDto>> GetStudentDropdownAsync();

        Task<HomeworkViewModel> GetHomeworkByIdAsync(int homeworkId);


    }
}
