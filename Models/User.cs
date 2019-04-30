using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace angular.Models
{
    public class User
    {
        public User()
        { }
        [Key]
        public string UserID { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        public string FullName { get; set; }
        public DateTimeOffset? DOB { get; set; }
        [DataType(DataType.PhoneNumber)]
        public string PhoneNumber { get; set; }
        public string Role { get; set; }
    }

}
