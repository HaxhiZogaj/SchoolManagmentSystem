using System.Collections.Generic;
using System.Threading.Tasks;
using SchoolManagmentSystem.ViewModels;
using SchoolManagmentSystem.DTOs;

public interface IClassSubjectService
{
    Task<List<ClassSubjectViewModel>> GetAllAsync();
    Task<ClassSubjectViewModel> GetByIdAsync(int id);
    Task AddAsync(ClassSubjectViewModel model);
    Task UpdateAsync(ClassSubjectViewModel model);
    Task DeleteAsync(int id);

    // Dropdown lists for FK
    Task<List<ClassDto>> GetClassesDropdownAsync();
    Task<List<SubjectDto>> GetSubjectsDropdownAsync();
    Task<List<TeacherDto>> GetTeachersDropdownAsync();
}
