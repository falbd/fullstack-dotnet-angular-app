using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RHWalks.API.CustomActionFilters;
using RHWalks.API.Models.Domain;
using RHWalks.API.Models.DTO;
using RHWalks.API.Repositories;

namespace RHWalks.API.Controllers
{
    // api/walks
    [Route("api/[controller]")]
    [ApiController]
    public class WalksController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IWalkRepository walkRepository;

        public WalksController(IMapper mapper, IWalkRepository walkRepository)
        {
            this.mapper = mapper;
            this.walkRepository = walkRepository;
        }


        // CREATE Walk
        // POST: /api/walks
        [Authorize(Roles = "Reader,Writer")]
        [HttpPost]
        [ValidateModel]
        public async Task<IActionResult> Create([FromBody] AddWalkRequestDto addWalkRequestDto)
        {
            var walkModel = mapper.Map<Walk>(addWalkRequestDto);
            await walkRepository.CreateWalkAsync(walkModel);

            return Ok(mapper.Map<WalkDto>(walkModel));
        }


        // GET Walks
        // GET: /api/walks?filterOn=Name&filterQuery=Track&sortBy=Name&isAscending=true&pageNumber=1&pageSize=10
        [Authorize(Roles = "Reader,Writer")]
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? filterOn, [FromQuery] string? filterQuery,
        [FromQuery] string? sortBy, [FromQuery] bool? isAscending,
        [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 30)
        {
            var walksModel = await walkRepository.GetAllWalkAsync(filterOn, filterQuery, sortBy,
                    isAscending ?? true, pageNumber, pageSize);

            return Ok(mapper.Map<List<WalkDto>>(walksModel));
        }


        // Get Walk By Id
        // GET: /api/Walks/{id}
        [Authorize(Roles = "Reader,Writer")]
        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var walkModel = await walkRepository.GetWalkByIdAsync(id);

            if (walkModel == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<WalkDto>(walkModel));
        }

        // Update Walk By Id
        // PUT: /api/Walks/{id}
        [Authorize(Roles = "Reader,Writer")]
        [HttpPut]
        [Route("{id:Guid}")]
        [ValidateModel]
        public async Task<IActionResult> Update([FromRoute] Guid id, UpdateWalkRequestDto updateWalkRequestDto)
        {
            var walkModel = mapper.Map<Walk>(updateWalkRequestDto);
            walkModel = await walkRepository.UpdateWalkAsync(id, walkModel);

            if (walkModel == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<WalkDto>(walkModel));
        }


        // Delete a Walk By Id
        // DELETE: /api/Walks/{id}
        [Authorize(Roles = "Reader,Writer")]
        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var deletedWalkModel = await walkRepository.DeleteWalkAsync(id);

            if (deletedWalkModel == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<WalkDto>(deletedWalkModel));
        }


    }
}
