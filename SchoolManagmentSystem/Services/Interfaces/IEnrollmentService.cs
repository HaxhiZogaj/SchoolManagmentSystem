using System.Collections.Generic;
using System.Threading.Tasks;
using SchoolManagmentSystem.DTOs;
using SchoolManagmentSystem.ViewModels;

public interface IEnrollmentService
{
    Task<List<EnrollmentViewModel>> GetAllAsync();
    Task<EnrollmentViewModel> GetByIdAsync(int id);
    Task AddAsync(EnrollmentViewModel model);
    Task UpdateAsync(EnrollmentViewModel model);
    Task DeleteAsync(int id);

    // Dropdown list data for foreign keys
    Task<List<StudentDto>> GetStudentsDropdownAsync();
    Task<List<ClassDto>> GetClassesDropdownAsync();
}
