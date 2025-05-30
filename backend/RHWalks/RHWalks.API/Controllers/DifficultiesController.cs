using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using RHWalks.API.Models.DTO;
using RHWalks.API.Repositories;

namespace RHWalks.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DifficultiesController : ControllerBase
    {
        private readonly IDifficultyRepository difficultyRepository;
        private readonly IMapper mapper;

        public DifficultiesController(IDifficultyRepository difficultyRepository, IMapper mapper)
        {
            this.difficultyRepository = difficultyRepository;
            this.mapper = mapper;
        }

        // GET: /api/difficulties
        [HttpGet]
        public async Task<IActionResult> GetAllDifficulties()
        {
            var difficultiesDomain = await difficultyRepository.GetAllAsync();

            // Map Domain to DTO using AutoMapper
            var difficultiesDTO = mapper.Map<List<DifficultyDto>>(difficultiesDomain);

            return Ok(difficultiesDTO);
        }
    }
}

