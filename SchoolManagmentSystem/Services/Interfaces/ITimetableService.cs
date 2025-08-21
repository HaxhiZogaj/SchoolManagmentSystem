using SchoolManagmentSystem.DTOs;
using SchoolManagmentSystem.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SchoolManagmentSystem.Services.Interfaces
{
    public interface ITimetableService
    {
        Task<List<TimetableViewModel>> GetAllAsync();
        Task<TimetableViewModel> GetByIdAsync(int id);
        Task AddAsync(TimetableViewModel vm);
        Task UpdateAsync(TimetableViewModel vm);
        Task DeleteAsync(int id);

        Task<List<ClassSubjectDto>> GetClassSubjectDropdownAsync();
    }
}
