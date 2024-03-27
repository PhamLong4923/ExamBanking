using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Text.Json.Serialization;

namespace ExamBanking.Models
{
    public partial class Bank
    {
        public Bank()
        {
            Accesses = new HashSet<Access>();
            Repos = new HashSet<Repo>();
        }

        [JsonPropertyName("id")]
        public int Bankid { get; set; }
        [JsonPropertyName("name")]
        public string? Bankname { get; set; }
        [JsonPropertyName("status")]
        public byte? Bankstatus { get; set; }
        public decimal? Accid { get; set; }
        public int? Bankmode { get; set; }
        [JsonIgnore]
        public virtual Account? Acc { get; set; }
        public virtual ICollection<Access> Accesses { get; set; }
        public virtual ICollection<Repo> Repos { get; set; }

        public override string? ToString()
        {
            return $"Bank ID: {Bankid}, Name: {Bankname}, Address: {Accid}";
        }
    }
}
