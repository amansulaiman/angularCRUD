using System.ComponentModel.DataAnnotations;

namespace angular.Models
{
    public class PaymentDetail:BaseModel
    {
        [Required]
        public string CardOwner { get; set; }
        [Required]
        public string CardNumber { get; set; }
        [Required]
        public string ExpDate { get; set; }
        [Required]
        public string CVV { get; set; }
    }
}