using SchoolManagmentSystem.ViewModels;
using SchoolManagmentSystem.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SchoolManagmentSystem.Interfaces
{
    public interface IGradeService
    {
        Task<List<GradeViewModel>> GetAllAsync();
        Task<GradeViewModel> GetByIdAsync(int id);
        Task AddAsync(GradeViewModel viewModel);
        Task UpdateAsync(GradeViewModel viewModel);
        Task DeleteAsync(int id);

        // Dropdowns
        Task<List<EnrollmentDto>> GetEnrollmentDropdownAsync();
        Task<List<ClassSubjectDto>> GetClassSubjectDropdownAsync();
    }
}
