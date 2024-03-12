using ExamBanking.DTO.SetionDto;
using ExamBanking.Models;
using ExamBanking.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExamBanking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SectionController : ControllerBase
    {
        private readonly ExamBankingContext _context;
        private readonly RSection _rsection;
        public SectionController(ExamBankingContext context, RSection rsection)
        {
            _context = context;
            _rsection = rsection;
        }
        [HttpGet("listSection")]
        public IActionResult GetSection(int repoid)
        {
            var listSection = _context.Sections.Where(a => a.Repoid == repoid).ToList();
            return Ok(listSection);
        }
        [HttpPost("CreateSection")]
        public IActionResult CreateSection(CreateSectionRequest section)
        {
            _rsection.CreateSection(section);
            return Ok("Create section success");
        }
        [HttpPut("EditSection")]
        public IActionResult EditSection(EditSectionRequest section)
        {
            _rsection.EditSection(section);
            return Ok("Edit section success");
        }
        [HttpDelete("DeleteSection")]
        public IActionResult DeleteSection(DeleteSectionRequest section)
        {
            _rsection.DeleteSection(section);
            return Ok("Delete section success");
        }
    }
}
