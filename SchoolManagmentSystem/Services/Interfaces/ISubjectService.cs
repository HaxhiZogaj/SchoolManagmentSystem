using SchoolManagmentSystem.ViewModels;
using SchoolManagmentSystem.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SchoolManagmentSystem.Interfaces
{
    public interface ISubjectService
    {
        Task<List<SubjectViewModel>> GetAllAsync();
        Task<SubjectViewModel> GetByIdAsync(int id);
        Task AddAsync(SubjectViewModel viewModel);
        Task UpdateAsync(SubjectViewModel viewModel);
        Task DeleteAsync(int id);

        // Dropdown for Department FK
        Task<List<DepartmentDto>> GetDepartmentDropdownAsync();
    }
}
