using SchoolManagmentSystem.DTOs;
using SchoolManagmentSystem.Models;
using SchoolManagmentSystem.ViewModels;

namespace SchoolManagmentSystem.Services.Interfaces
{
    public interface IHomeworkService
    {
        Task<List<HomeworkViewModel>> GetAllAsync();
        Task<HomeworkViewModel> GetByIdAsync(int id);
        Task AddAsync(HomeworkViewModel hw);
        Task UpdateAsync(HomeworkViewModel hw);
        Task DeleteAsync(int id);


        Task<List<ClassSubjectDto>> GetClassSubjectDropdownAsync();

    }

}
