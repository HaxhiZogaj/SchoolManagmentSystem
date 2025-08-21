using SchoolManagmentSystem.ViewModels;
using SchoolManagmentSystem.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SchoolManagmentSystem.Interfaces
{
    public interface IParentService
    {
        Task<List<ParentViewModel>> GetAllAsync();
        Task<ParentViewModel> GetByIdAsync(int id);
        Task AddAsync(ParentViewModel viewModel);
        Task UpdateAsync(ParentViewModel viewModel);
        Task DeleteAsync(int id);

        // Optional dropdown if you need to choose User for Parent
        Task<List<UserDto>> GetUserDropdownAsync();
    }
}
