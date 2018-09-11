using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using BPSignalRAngularApp.Models;
using BPSignalRAngularAppService.HttpService;
using BPSignalRAngularAppService.TokenDTService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace BPSignalRAngularApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MeetingController : BaseController
    {
        private ITokenDTService _tokenDTService;
        public IConfiguration _configuration;
        private IHttpService _httpService;
        public MeetingController(ITokenDTService tokenDTService, IConfiguration configuration, IHttpService httpService)
                : base(tokenDTService, configuration)
        {
            _tokenDTService = tokenDTService;
            _configuration = configuration;
            _httpService = httpService;
        }

        // GET: api/Meeting
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            HttpClient client = _httpService.GetHttpClientInstance();
            HttpResponseMessage response = await client.GetAsync(_httpService.GetBaseURL() + "meeting");

            List<MeetingModel> meetingList = new List<MeetingModel>();
            if (response.IsSuccessStatusCode)
            {
                meetingList = await response.Content.ReadAsAsync<List<MeetingModel>>();
                return new OkObjectResult(meetingList);
            }
            return await Task.FromResult(StatusCode((int)response.StatusCode));
            
        }

        // GET: api/Meeting/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Meeting
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Meeting/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
