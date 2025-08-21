using SchoolManagmentSystem.DTOs;
using SchoolManagmentSystem.ViewModels;

namespace SchoolManagmentSystem.Services.Interfaces
{
    public interface ITeacherService
    {
        Task<List<TeacherViewModel>> GetAllAsync();
        Task<TeacherViewModel> GetByIdAsync(int id);
        Task AddAsync(TeacherViewModel viewModel);
        Task UpdateAsync(TeacherViewModel viewModel);
        Task DeleteAsync(int id);

        // For dropdown binding

        Task<List<UserDto>> GetUserDropdownAsync();

        Task<List<DepartmentDto>> GetDepartmentDropdownAsync();


    }
}
