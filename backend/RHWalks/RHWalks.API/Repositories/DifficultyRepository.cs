using Microsoft.EntityFrameworkCore;
using RHWalks.API.Data;
using RHWalks.API.Models.Domain;

namespace RHWalks.API.Repositories
{
    public class DifficultyRepository : IDifficultyRepository
    {
        private readonly RHWalksDbContext dbContext;

        public DifficultyRepository(RHWalksDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<IEnumerable<Difficulty>> GetAllAsync()
        {
            return await dbContext.Difficulties.ToListAsync();
        }
    }
}
