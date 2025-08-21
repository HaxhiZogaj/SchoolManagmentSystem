using Scheduler.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Scheduler.Services.Interfaces
{
    public interface IAppointmentService
    {
        Task AddAsync(AppointmentViewModel viewModel);
        Task UpdateAsync(AppointmentViewModel viewModel);
        Task RemoveAsync(int appointmentId);
        Task<IEnumerable<AppointmentViewModel>> GetAllAsync();
        Task<AppointmentViewModel?> GetByIdAsync(int appointmentId);
        Task<bool> IsOverlappingAsync(AppointmentViewModel viewModel);

        // Dto method if we need it //
    }
}
