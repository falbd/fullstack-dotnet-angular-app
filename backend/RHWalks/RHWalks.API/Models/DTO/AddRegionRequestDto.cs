using System.ComponentModel.DataAnnotations;

namespace RHWalks.API.Models.DTO
{
    public class AddRegionRequestDto
    {
        [Required]
        [MinLength(3 , ErrorMessage = "Code has to be a minimum 3 characters")]
        [MaxLength(3, ErrorMessage = "Code has to be a maximum 3 characters")]
        public string code { get; set; }

        [Required]
        [MaxLength(20, ErrorMessage = "Code has to be a maximum 20 characters")]

        public string Name { get; set; }

        public string? RegionImageUrl { get; set; }

    }
}
