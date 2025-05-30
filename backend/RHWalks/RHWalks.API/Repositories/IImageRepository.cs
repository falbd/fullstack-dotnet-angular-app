using RHWalks.API.Models.Domain;

namespace RHWalks.API.Repositories
{
    public interface IImageRepository
    {
        Task<Image> Upload(Image image);
    }
}
