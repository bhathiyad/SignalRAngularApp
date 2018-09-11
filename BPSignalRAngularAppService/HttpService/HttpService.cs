using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using BPSignalRAngularAppService.TokenDTService;

namespace BPSignalRAngularAppService.HttpService
{
    public class HttpService : IHttpService
    {
        private ITokenDTService _tokenDTService;
        private HttpClient httpClient;
        public HttpService(ITokenDTService tokenDTService)
        {
            _tokenDTService = tokenDTService;
        }
        
        public HttpClient GetHttpClientInstance()
        {
            string token = _tokenDTService.GetToken();
            httpClient = new HttpClient();

            if (!string.IsNullOrEmpty(token))
            {
                httpClient.DefaultRequestHeaders.Add("Authorization", token); //$"Bearer {token}"
            }

            return httpClient;
        }

        public string GetBaseURL()
        {
            string ServiceAPIURL = _tokenDTService.GetURL();
            return ServiceAPIURL;
        }
    }
}
