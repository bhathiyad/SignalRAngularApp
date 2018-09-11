using System;
using System.Collections.Generic;
using System.Text;

namespace BPSignalRAngularAppService.TokenDTService
{
    public interface ITokenDTService
    {
        string GetToken();
        void SetToken(string token);
        string GetURL();
        void SetURL(string url);
        
    }
}
