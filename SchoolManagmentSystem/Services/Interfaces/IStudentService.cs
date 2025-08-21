using SchoolManagmentSystem.DTOs;
using SchoolManagmentSystem.Models;
using SchoolManagmentSystem.ViewModels;

namespace SchoolManagmentSystem.Services.Interfaces
{
    public interface IStudentService
    {
        Task<List<StudentViewModel>> GetAllAsync();
        Task<StudentViewModel> GetByIdAsync(int id);
        Task AddAsync(StudentViewModel vm);
        Task UpdateAsync(StudentViewModel vm);
        Task DeleteAsync(int id);
        //Task<List<ClassDto>> GetClassDropdownAsync();
        Task<List<ParentDto>> GetParentDropdownAsync();

        Task<List<UserDto>> GetUserDropdownAsync();

    }

}
