using System.ComponentModel.DataAnnotations;

namespace angular.Models
{
    public class UserDto:BaseModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}