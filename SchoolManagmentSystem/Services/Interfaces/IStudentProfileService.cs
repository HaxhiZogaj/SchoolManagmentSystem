namespace SchoolManagmentSystem.Services.Interfaces
{
    public interface IStudentProfileService
    {
        Task<object> GetStudentProfileAsync(int userId);
    }
}
