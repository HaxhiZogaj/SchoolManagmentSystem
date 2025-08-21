using Microsoft.EntityFrameworkCore;
using Scheduler.Models;
using SchoolManagmentSystem.Models;
using SchoolManagmentSystem.Repositories;

namespace Scheduler.Repositories
{
    public class AppointmentRepository : Repository<AppointmentDatum>, IAppointmentRepository
    {
        public AppointmentRepository(SchoolMSContext context) : base(context) { }
    }



}

