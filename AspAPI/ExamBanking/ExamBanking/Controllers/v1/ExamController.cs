//using AutoMapper;
//using ExamBanking.DTO;
//using ExamBanking.Models;
//using ExamBanking.Repository;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;

//namespace ExamBanking.Controllers.v1
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class ExamController : ControllerBase
//    {
//        private readonly IMapper _imapper;
//        private readonly RExample _rexample;

//        public ExamController(IMapper mapper, RExample rexample)
//        {
//            _imapper = mapper;
//            _rexample = rexample;
//        }

//        [HttpGet]
//        [ProducesResponseType(typeof(QuestionDTO), 200)]
//        public IActionResult Get()
//        {
//            var questions = _rexample.GetQuestionsWithModeNavigation(); // Lấy danh sách câu hỏi với thông tin QuestionModeNavigation

//            var questionDTOs = _imapper.Map<IEnumerable<QuestionDTO>>(questions); // Ánh xạ danh sách câu hỏi sang danh sách QuestionDTO

//            return Ok(questionDTOs); // Trả về danh sách câu hỏi đã được ánh xạ
//        }
//    }
//}
