namespace ExamBanking.Utils
{
    public class TicketNameGen
    {
        public static string GenTicketNameFunc(string email, string type)
        {
            DateTime today = DateTime.Today;

            string dateString = today.ToString("yyyyMMddHHmmss");
            string emailString = email.Replace("@", "").Replace(".", "");

            string combinedString = dateString + emailString;

            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            return type + new string(Enumerable.Repeat(chars, 10)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}
