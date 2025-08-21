namespace SchoolManagmentSystem.DTOs
{
    public class UserDto
    {

        public int UserId { get; set; }

        public string Username { get; set; }


        public class LoginRequest
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }


        public class RegisterRequest
        {
            public string Username { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public string Role { get; set; }
        }
    }
}

//using System.ComponentModel.DataAnnotations;

//namespace SchoolManagmentSystem.DTOs
//{
//    public class UserDto
//    {
//        public class LoginRequest
//        {
//            [Required(ErrorMessage = "Email is required.")]
//            [EmailAddress(ErrorMessage = "Invalid email format.")]
//            public string Email { get; set; }

//            [Required(ErrorMessage = "Password is required.")]
//            [MinLength(8, ErrorMessage = "Password must be at least 8 characters long.")]
//            public string Password { get; set; }
//        }

//        public class RegisterRequest
//        {
//            [Required(ErrorMessage = "Username is required.")]
//            [MinLength(3, ErrorMessage = "Username must be at least 3 characters long.")]
//            public string Username { get; set; }

//            [Required(ErrorMessage = "Email is required.")]
//            [EmailAddress(ErrorMessage = "Invalid email format.")]
//            public string Email { get; set; }

//            [Required(ErrorMessage = "Password is required.")]
//            [MinLength(8, ErrorMessage = "Password must be at least 8 characters long.")]
//            public string Password { get; set; }

//            public string? Role { get; set; } // Nullable to match controller logic
//        }

//        public class UserResponse
//        {
//            public int UserId { get; set; }
//            public string Username { get; set; }
//            public string Email { get; set; }
//            public string Role { get; set; }
//            public DateTime CreatedAt { get; set; }
//            public DateTime UpdatedAt { get; set; }
//        }
//    }
//}
