using LO.CWCS.Dtos.Uploaders;
using LO.CWCS.WebApi.Attributes;
using LO.CWCS.WebApi.Helpers.ImageUploader;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LO.CWCS.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly IImageUploader _fileUploader;

        public UploadController(IImageUploader fileUploader)
        {
            _fileUploader = fileUploader;
        }

        [HttpPost, DisableRequestSizeLimit]
        public IActionResult Upload([AllowedExtensions()] IFormFile[] files)
        {
            if (files.Length > 0)
            {
                var imagesNames = _fileUploader.Upload(files);

                var customerImages = GetCustomerImages(imagesNames);

                return Ok(customerImages);
            }
            else
            {
                return BadRequest();
            }
        }

        private List<UploaderImageDto> GetCustomerImages(List<string> imagesNames)
        {
            var imagesNamesDtos = new List<UploaderImageDto>();

            foreach (var imageName in imagesNames)
            {
                var customerImage = new UploaderImageDto();
                customerImage.Id = 0;
                customerImage.Name = imageName;

                imagesNamesDtos.Add(customerImage);
            }

            return imagesNamesDtos;
        }
    }
}
