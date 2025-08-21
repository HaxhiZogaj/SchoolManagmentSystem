using System.Collections.Generic;
using System.Threading.Tasks;
using SchoolManagmentSystem.ViewModels;

public interface IDepartmentService
{
    Task<List<DepartmentViewModel>> GetAllAsync();
    Task<DepartmentViewModel> GetByIdAsync(int id);
    Task AddAsync(DepartmentViewModel model);
    Task UpdateAsync(DepartmentViewModel model);
    Task DeleteAsync(int id);
}
