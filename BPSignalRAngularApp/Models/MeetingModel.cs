using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BPSignalRAngularApp.Models
{
    public class MeetingModel
    {
        public int MeetingId { get; set; }
        public DateTime? Date { get; set; }
        public string Subject { get; set; }
        public byte Status { get; set; }
        public CategoryModel CategoryModel { get; set; }
        public SubCategoryModel SubCategoryModel { get; set; }
    }
}
