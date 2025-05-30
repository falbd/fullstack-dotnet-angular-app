using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RHWalks.API.CustomActionFilters;
using RHWalks.API.Data;
using RHWalks.API.Models.Domain;
using RHWalks.API.Models.DTO;
using RHWalks.API.Repositories;
using System.Runtime.InteropServices.Marshalling;

namespace RHWalks.API.Controllers
{
    // https://localhost:portnumber/api/regions
    [Route("api/[controller]")]
    [ApiController]
    public class RegionsController : ControllerBase
    {
        private readonly RHWalksDbContext dbContext;
        private readonly IRegionRepository regionRepository;
        private readonly IMapper mapper;
        private readonly ILogger<RegionsController> logger;

        public RegionsController(RHWalksDbContext dbContext,
            IRegionRepository regionRepository,
            IMapper mapper,
            ILogger<RegionsController> logger)
        {
            this.dbContext = dbContext;
            this.regionRepository = regionRepository;
            this.mapper = mapper;
            this.logger = logger;
        }

        // GET ALL REGIONS
        // GET: https://localhost:portnumber/api/regions
        [Authorize(Roles = "Reader,Writer")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var regionsDomain = await regionRepository.GetAllAsync();
            return Ok(mapper.Map<List<RegionDto>>(regionsDomain));
        }


        // GET SINGLE REGION (Get Region By ID)
        // GET: https://localhost:portnumber/api/regions/{id}
        [Authorize(Roles = "Reader,Writer")]
        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var regionDomain = await regionRepository.GetByIdAsync(id);

            if (regionDomain == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<RegionDto>(regionDomain));
        }


        // POST To Create New Region
        // POST: https://localhost:portnumber/api/regions
        [Authorize(Roles = "Reader,Writer")]
        [HttpPost]
        [ValidateModel]
        public async Task<IActionResult> Create([FromBody] AddRegionRequestDto addRegionRequestDto)
        {
            var regionModel = mapper.Map<Region>(addRegionRequestDto);
            regionModel = await regionRepository.CreateAsync(regionModel);
            var regionDto = mapper.Map<RegionDto>(regionModel);

            return CreatedAtAction(nameof(GetById), new { id = regionDto.Id }, regionDto);
        }


        // Update region
        // PUT: https://localhost:portnumber/api/regions/{id}
        [Authorize(Roles = "Reader,Writer")]
        [HttpPut]
        [Route("{id:Guid}")]
        [ValidateModel]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateRegionRequestDto updateRegionRequestDto)
        {
            var regionModel = mapper.Map<Region>(updateRegionRequestDto);
            regionModel = await regionRepository.UpdateAsync(id, regionModel);

            if (regionModel == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<RegionDto>(regionModel));
        }


        // Delete Region
        // DELETE: https://localhost:portnumber/api/regions/{id}
        [Authorize(Roles = "Reader,Writer")]
        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var regionModel = await regionRepository.DeleteAsync(id);

            if (regionModel == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<RegionDto>(regionModel));
        }

    }
}
