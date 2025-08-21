using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using SchoolManagmentSystem.Models;
using SchoolManagmentSystem.ViewModels;
using SchoolManagmentSystem.DTOs;
using Newtonsoft.Json;

public class EnrollmentService : IEnrollmentService
{
    private readonly SchoolMSContext _context;
    private readonly IMapper _mapper;

    public EnrollmentService(SchoolMSContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<EnrollmentViewModel>> GetAllAsync()
    {
        var enrollments = await _context.Enrollments
            .Include(e => e.Student)  
            .Include(e => e.Class)     
            .ToListAsync();

        return _mapper.Map<List<EnrollmentViewModel>>(enrollments);
    }

    public async Task<EnrollmentViewModel> GetByIdAsync(int id)
    {
        var enrollment = await _context.Enrollments
            .Include(e => e.Student)
            .Include(e => e.Class)
            .FirstOrDefaultAsync(e => e.EnrollmentId == id);

        return enrollment == null ? null : _mapper.Map<EnrollmentViewModel>(enrollment);
    }

    public async Task AddAsync(EnrollmentViewModel model)
    {
        var enrollment = _mapper.Map<Enrollment>(model);
        _context.Enrollments.Add(enrollment);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(EnrollmentViewModel model)
    {

        var enrollment = await _context.Enrollments.FindAsync(model.EnrollmentId);
        if (enrollment != null)
        {
            _mapper.Map(model, enrollment);
            await _context.SaveChangesAsync();
        }
    }

    public async Task DeleteAsync(int id)
    {
        var enrollment = await _context.Enrollments.FindAsync(id);
        if (enrollment != null)
        {
            _context.Enrollments.Remove(enrollment);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<List<StudentDto>> GetStudentsDropdownAsync()
    {
        var students = await _context.Students.ToListAsync();
        return _mapper.Map<List<StudentDto>>(students);
    }

    public async Task<List<ClassDto>> GetClassesDropdownAsync()
    {
        var classes = await _context.Classes.ToListAsync();
        return _mapper.Map<List<ClassDto>>(classes);
    }
}
