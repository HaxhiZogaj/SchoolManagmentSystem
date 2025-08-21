using System.Collections.Generic;
using System.Threading.Tasks;
using SchoolManagmentSystem.ViewModels;
using SchoolManagmentSystem.DTOs;

public interface IClassService
{
    Task<List<ClassViewModel>> GetAllAsync();
    Task<ClassViewModel> GetByIdAsync(int id);
    Task AddAsync(ClassViewModel model);
    Task UpdateAsync(ClassViewModel model);
    Task DeleteAsync(int id);

    // Dropdown for HomeroomTeacherId
    Task<List<TeacherDto>> GetTeacherDropdownAsync();
}
