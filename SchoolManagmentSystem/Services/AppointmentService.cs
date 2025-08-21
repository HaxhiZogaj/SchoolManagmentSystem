using Microsoft.EntityFrameworkCore;
using Scheduler.Models;
using Scheduler.Repositories;
using Scheduler.Services.Interfaces;
using Scheduler.ViewModels;

namespace Scheduler.Services
{
    public class AppointmentService(IAppointmentRepository appointmentRepository) : IAppointmentService
    {
        public async Task AddAsync(AppointmentViewModel viewModel)
        {
            var appointment = MapToModel(viewModel);
            appointmentRepository.AddAsync(appointment);
            await appointmentRepository.SaveChangesAsync();
        }



        public async Task UpdateAsync(AppointmentViewModel viewModel)
        {
            var appointment = await appointmentRepository.GetByIdAsync(viewModel.Id);
            if (appointment == null) return;

            appointment = MapToModel(viewModel, appointment);
            appointmentRepository.Update(appointment);
            await appointmentRepository.SaveChangesAsync();
        }




        public async Task RemoveAsync(int appointmentId)
        {
            var appointment = await appointmentRepository.GetByIdAsync(appointmentId);
            if (appointment == null) return;

            appointmentRepository.Delete(appointment);
            await appointmentRepository.SaveChangesAsync();
        }




        public async Task<IEnumerable<AppointmentViewModel>> GetAllAsync()
        {
            var appointments = await appointmentRepository.GetAllAsync();
            return appointments.Select(MapToViewModel);
        }




        public async Task<AppointmentViewModel?> GetByIdAsync(int appointmentId)
        {
            var appointment = await appointmentRepository.GetByIdAsync(appointmentId);
            return appointment == null ? null : MapToViewModel(appointment);
        }




        public async Task<bool> IsOverlappingAsync(AppointmentViewModel viewModel)
        {
            var existingAppointments = await appointmentRepository.GetAllAsync();

            return existingAppointments.Any(appointment =>
                appointment.StartTime.Date == viewModel.StartTime.Date &&
                viewModel.StartTime < appointment.EndTime &&
                viewModel.EndTime > appointment.StartTime);
        }




        private static AppointmentDatum MapToModel(AppointmentViewModel viewModel, AppointmentDatum? existingModel = null)
        {
            var model = existingModel ?? new AppointmentDatum();

            model.Subject = viewModel.Subject;
            model.StartTime = viewModel.StartTime.ToUniversalTime();
            model.EndTime = viewModel.EndTime.ToUniversalTime();
            model.Location = viewModel.Location;
            model.Description = viewModel.Description;
            model.IsAllDay = viewModel.IsAllDay;
            model.IsReadonly = viewModel.IsReadonly;
            model.RecurrenceId = viewModel.RecurrenceId;
            model.RecurrenceRule = viewModel.RecurrenceRule;
            model.RecurrenceException = viewModel.RecurrenceException;

            return model;
        }

        private static AppointmentViewModel MapToViewModel(AppointmentDatum model)
        {
            return new AppointmentViewModel
            {
                Id = model.Id,
                Subject = model.Subject,
                StartTime = model.StartTime.ToLocalTime(),
                EndTime = model.EndTime.ToLocalTime(),
                Location = model.Location,
                Description = model.Description,
                IsAllDay = model.IsAllDay,
                IsReadonly = model.IsReadonly,
                RecurrenceId = model.RecurrenceId,
                RecurrenceRule = model.RecurrenceRule,
                RecurrenceException = model.RecurrenceException
            };
        }
    }
}

