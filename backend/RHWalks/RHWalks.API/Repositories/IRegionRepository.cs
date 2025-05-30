using RHWalks.API.Models.Domain;

namespace RHWalks.API.Repositories
{
    public interface IRegionRepository
    {
        Task<List<Region>>GetAllAsync();

        Task<Region?> GetByIdAsync(Guid Id);

        Task<Region> CreateAsync(Region region);

        Task<Region?> UpdateAsync(Guid id, Region region);

        Task<Region?> DeleteAsync(Guid id);

    }
}
