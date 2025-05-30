using RHWalks.API.Models.Domain;

namespace RHWalks.API.Repositories
{
    public interface IDifficultyRepository
    {
        Task<IEnumerable<Difficulty>> GetAllAsync();
    }
}
