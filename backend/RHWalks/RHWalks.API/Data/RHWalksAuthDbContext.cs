using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace RHWalks.API.Data
{
    public class RHWalksAuthDbContext : IdentityDbContext
    {
        public RHWalksAuthDbContext(DbContextOptions<RHWalksAuthDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            var readerRoleId = "60f79a4a-d687-427c-8e3b-9357f3f1eaf7";
            var writerRoleId = "f142ed3b-148d-44ea-a869-47c11ddba086";

            var roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Id = readerRoleId,
                    ConcurrencyStamp = readerRoleId,
                    Name = "Reader",
                    NormalizedName = "Reader".ToUpper()
                },
                new IdentityRole
                {
                    Id = writerRoleId,
                    ConcurrencyStamp = writerRoleId,
                    Name = "Writer",
                    NormalizedName = "Writer".ToUpper()
                }
            }; 

            builder.Entity<IdentityRole>().HasData(roles);


        }
    }
}
