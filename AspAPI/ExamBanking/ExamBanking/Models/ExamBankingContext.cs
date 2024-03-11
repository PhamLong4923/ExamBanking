using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ExamBanking.Models
{
    public partial class ExamBankingContext : DbContext
    {
        public ExamBankingContext()
        {
        }

        public ExamBankingContext(DbContextOptions<ExamBankingContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Access> Accesses { get; set; } = null!;
        public virtual DbSet<Account> Accounts { get; set; } = null!;
        public virtual DbSet<Answer> Answers { get; set; } = null!;
        public virtual DbSet<Bank> Banks { get; set; } = null!;
        public virtual DbSet<Mode> Modes { get; set; } = null!;
        public virtual DbSet<Payment> Payments { get; set; } = null!;
        public virtual DbSet<Question> Questions { get; set; } = null!;
        public virtual DbSet<Repo> Repos { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<Section> Sections { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("server =exambankingserver.database.windows.net; database = ExamBanking;uid=exambanking;pwd=Abyss040903@;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Access>(entity =>
            {
                entity.ToTable("Access");

                entity.Property(e => e.Accessid).HasColumnName("accessid");

                entity.Property(e => e.Bankid).HasColumnName("bankid");

                entity.Property(e => e.Fromid).HasColumnName("fromid");

                entity.Property(e => e.Message)
                    .HasMaxLength(1)
                    .HasColumnName("message");

                entity.Property(e => e.Repoid).HasColumnName("repoid");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.Property(e => e.Toid).HasColumnName("toid");

                entity.HasOne(d => d.Bank)
                    .WithMany(p => p.Accesses)
                    .HasForeignKey(d => d.Bankid)
                    .HasConstraintName("FK__Access__bankid__6E01572D");

                entity.HasOne(d => d.From)
                    .WithMany(p => p.AccessFroms)
                    .HasForeignKey(d => d.Fromid)
                    .HasConstraintName("FK__Access__fromid__6EF57B66");

                entity.HasOne(d => d.Repo)
                    .WithMany(p => p.Accesses)
                    .HasForeignKey(d => d.Repoid)
                    .HasConstraintName("FK__Access__repoid__6FE99F9F");

                entity.HasOne(d => d.To)
                    .WithMany(p => p.AccessTos)
                    .HasForeignKey(d => d.Toid)
                    .HasConstraintName("FK__Access__toid__70DDC3D8");
            });

            modelBuilder.Entity<Account>(entity =>
            {
                entity.HasKey(e => e.Accid)
                    .HasName("PK__Account__A472ABF2E6816325");

                entity.ToTable("Account");

                entity.Property(e => e.Accid).HasColumnName("accid");

                entity.Property(e => e.Datejoin).HasColumnType("datetime");

                entity.Property(e => e.ResetTokenExpires).HasColumnType("datetime");

                entity.Property(e => e.Roleid).HasColumnName("roleid");

                entity.Property(e => e.Userpass)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("userpass");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Accounts)
                    .HasForeignKey(d => d.Roleid)
                    .HasConstraintName("FK__Account__roleid__71D1E811");
            });

            modelBuilder.Entity<Answer>(entity =>
            {
                entity.HasKey(e => e.Ansid)
                    .HasName("PK__Answer__2626EE58E657B86B");

                entity.ToTable("Answer");

                entity.Property(e => e.Ansid).HasColumnName("ansid");

                entity.Property(e => e.Anscontent).HasColumnName("anscontent");

                entity.Property(e => e.Ansstatus).HasColumnName("ansstatus");

                entity.Property(e => e.Quesid).HasColumnName("quesid");

                entity.HasOne(d => d.Ques)
                    .WithMany(p => p.Answers)
                    .HasForeignKey(d => d.Quesid)
                    .HasConstraintName("FK__Answer__quesid__72C60C4A");
            });

            modelBuilder.Entity<Bank>(entity =>
            {
                entity.ToTable("Bank");

                entity.Property(e => e.Bankid).HasColumnName("bankid");

                entity.Property(e => e.Accid).HasColumnName("accid");

                entity.Property(e => e.Bankname)
                    .HasMaxLength(255)
                    .HasColumnName("bankname");

                entity.Property(e => e.Bankstatus).HasColumnName("bankstatus");

                entity.HasOne(d => d.Acc)
                    .WithMany(p => p.Banks)
                    .HasForeignKey(d => d.Accid)
                    .HasConstraintName("FK__Bank__accid__73BA3083");
            });

            modelBuilder.Entity<Mode>(entity =>
            {
                entity.ToTable("Mode");

                entity.Property(e => e.Modeid).HasColumnName("modeid");

                entity.Property(e => e.Qmode)
                    .HasMaxLength(100)
                    .HasColumnName("qmode");
            });

            modelBuilder.Entity<Payment>(entity =>
            {
                entity.HasKey(e => e.Payid)
                    .HasName("PK__Payment__082D8EEBD03519AE");

                entity.ToTable("Payment");

                entity.Property(e => e.Payid).HasColumnName("payid");

                entity.Property(e => e.Accid).HasColumnName("accid");

                entity.Property(e => e.Money).HasColumnName("money");

                entity.Property(e => e.Paydate)
                    .HasColumnType("date")
                    .HasColumnName("paydate");

                entity.Property(e => e.Paymode).HasColumnName("paymode");

                entity.HasOne(d => d.Acc)
                    .WithMany(p => p.Payments)
                    .HasForeignKey(d => d.Accid)
                    .HasConstraintName("FK__Payment__accid__74AE54BC");
            });

            modelBuilder.Entity<Question>(entity =>
            {
                entity.HasKey(e => e.Quesid)
                    .HasName("PK__Question__8FF5F51DBA7B9DB4");

                entity.ToTable("Question");

                entity.Property(e => e.Quesid).HasColumnName("quesid");

                entity.Property(e => e.Modeid).HasColumnName("modeid");

                entity.Property(e => e.Quescontent).HasColumnName("quescontent");

                entity.Property(e => e.Secid).HasColumnName("secid");

                entity.Property(e => e.Solution).HasColumnName("solution");

                entity.Property(e => e.Type).HasColumnName("type");

                entity.HasOne(d => d.Mode)
                    .WithMany(p => p.Questions)
                    .HasForeignKey(d => d.Modeid)
                    .HasConstraintName("FK__Question__modeid__75A278F5");

                entity.HasOne(d => d.Sec)
                    .WithMany(p => p.Questions)
                    .HasForeignKey(d => d.Secid)
                    .HasConstraintName("FK__Question__secid__76969D2E");
            });

            modelBuilder.Entity<Repo>(entity =>
            {
                entity.ToTable("Repo");

                entity.Property(e => e.Repoid).HasColumnName("repoid");

                entity.Property(e => e.Bankid).HasColumnName("bankid");

                entity.Property(e => e.Reponame)
                    .HasMaxLength(100)
                    .HasColumnName("reponame");

                entity.Property(e => e.Secondeditor).HasColumnName("secondeditor");

                entity.HasOne(d => d.Bank)
                    .WithMany(p => p.Repos)
                    .HasForeignKey(d => d.Bankid)
                    .HasConstraintName("FK__Repositor__banki__778AC167");

                entity.HasOne(d => d.SecondeditorNavigation)
                    .WithMany(p => p.Repos)
                    .HasForeignKey(d => d.Secondeditor)
                    .HasConstraintName("FK__Repositor__secon__787EE5A0");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("Role");

                entity.Property(e => e.Roleid).HasColumnName("roleid");

                entity.Property(e => e.Role1)
                    .HasMaxLength(255)
                    .HasColumnName("role");
            });

            modelBuilder.Entity<Section>(entity =>
            {
                entity.HasKey(e => e.Secid)
                    .HasName("PK__Section__C25197F0FBBE967C");

                entity.ToTable("Section");

                entity.Property(e => e.Secid).HasColumnName("secid");

                entity.Property(e => e.Repoid).HasColumnName("repoid");

                entity.Property(e => e.Secname)
                    .HasMaxLength(100)
                    .HasColumnName("secname");

                entity.HasOne(d => d.Repo)
                    .WithMany(p => p.Sections)
                    .HasForeignKey(d => d.Repoid)
                    .HasConstraintName("FK__Section__repoid__797309D9");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
