using RHWalks.API.Models.Domain;

namespace RHWalks.API.Repositories
{
    public interface IWalkRepository
    {
        Task<Walk> CreateWalkAsync(Walk walk);
        Task<List<Walk>> GetAllWalkAsync(string? filterOn = null , string? filterQuery = null , string? 
        sortBy  = null , bool? isAscending = true , int pageNumber = 1 , int pageSize = 10);

        Task<Walk?> GetWalkByIdAsync(Guid id);

        Task<Walk?> UpdateWalkAsync(Guid id, Walk walk);

        Task<Walk?> DeleteWalkAsync(Guid id);


    }
}
