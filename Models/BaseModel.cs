using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace angular.Models
{
    public class BaseModel
    {
        [Key]
        public string Id { get; set; }
        public void GenerateID()
        {
            Id = Guid.NewGuid().ToString();
            CreatedAt = new DateTimeOffset(DateTime.Now);
        }
        [Display(Name = "Created At")]
        [ScaffoldColumn(false)]
        public DateTimeOffset CreatedAt { get; set; }
        [Display(Name = "Created By")]
        [ScaffoldColumn(false)]
        public string CreatedUser { get; set; }
    }
}
