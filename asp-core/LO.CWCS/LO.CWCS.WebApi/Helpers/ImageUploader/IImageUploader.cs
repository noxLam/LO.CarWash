namespace LO.CWCS.WebApi.Helpers.ImageUploader
{
    public interface IImageUploader
    {
        public List<string> Upload(IFormFile[] files);
    }
}
