using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace BPSignalRAngularAppService.TokenDTService
{
    public class TokenDTService : ITokenDTService
    {
        //Token t = null;
        //public TokenDTService()
        //{
        //    t = new Token();
        //}
        //public string GetToken()
        //{
        //    return t.BearerToken;
        //}

        //public void SetToken(string token)
        //{
        //    t.BearerToken = token;
        //}

        //private static TokenDTService dtService;

        //public static TokenDTService DtService
        //{
        //    get
        //    {
        //        if (dtService == null)
        //        {
        //            dtService = new TokenDTService();
        //        }

        //        return dtService;
        //    }
        //    set { dtService = value; }
        //}


        public TokenDTService(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        public string Token { get; set; }
        public string ServiceAPIURL { get; set; }
        public string GetToken()
        {
            return this.Token;
        }

        public void SetToken(string token)
        {
            this.Token = token;
        }

        public string GetURL()
        {

            if (string.IsNullOrEmpty(this.ServiceAPIURL))
            {
                this.ServiceAPIURL =  Configuration.GetSection("API").GetSection("URL").Value; 
            }

            return this.ServiceAPIURL;
        }

        public void SetURL(string url)
        {
            this.ServiceAPIURL = url;
        }
    }

    //public class Token
    //{
    //    public string BearerToken { get; set; }
    //}
}
