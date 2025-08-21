using Microsoft.EntityFrameworkCore;
using SchoolManagmentSystem.Interfaces;
using SchoolManagmentSystem.Models;
using SchoolManagmentSystem.ViewModels;
using SchoolManagmentSystem.DTOs;
using AutoMapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SchoolManagmentSystem.Services
{
    public class ParentService : IParentService
    {
        private readonly SchoolMSContext _context;
        private readonly IMapper _mapper;

        public ParentService(SchoolMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<ParentViewModel>> GetAllAsync()
        {
            var parents = await _context.Parents.Include(p => p.User).ToListAsync();
            return _mapper.Map<List<ParentViewModel>>(parents);
        }

        public async Task<ParentViewModel> GetByIdAsync(int id)
        {
            var parent = await _context.Parents
                .Include(p => p.User)
                .FirstOrDefaultAsync(p => p.ParentId == id);

            return parent != null ? _mapper.Map<ParentViewModel>(parent) : null;
        }

        public async Task AddAsync(ParentViewModel model)
        {
            var parent = _mapper.Map<Parent>(model);
            _context.Parents.Add(parent);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(ParentViewModel model)
        {
            var parent = await _context.Parents.FindAsync(model.ParentId);
            if (parent == null) return;

            parent.UserId = model.UserId;
            parent.FirstName = model.FirstName;
            parent.LastName = model.LastName;
            parent.Email = model.Email;
            parent.PhoneNumber = model.PhoneNumber;
            parent.Address = model.Address;

            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var parent = await _context.Parents.FindAsync(id);
            if (parent == null) return;

            _context.Parents.Remove(parent);
            await _context.SaveChangesAsync();
        }

        public async Task<List<UserDto>> GetUserDropdownAsync()
        {
            var users = await _context.Users.ToListAsync();
            return _mapper.Map<List<UserDto>>(users);
        }
    }
}
