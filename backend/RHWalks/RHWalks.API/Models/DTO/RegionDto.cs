using System.ComponentModel.DataAnnotations;

namespace RHWalks.API.Models.DTO
{
    public class RegionDto
    {
        public Guid Id { get; set; }
       
        public string code { get; set; }
   
        public string Name { get; set; }
       
        public string? RegionImageUrl { get; set; }
    }
}
